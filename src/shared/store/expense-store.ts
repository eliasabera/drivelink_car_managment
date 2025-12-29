import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExpenseService, CarExpense } from "../services/expense-service";

interface ExpenseState {
  // State
  expenses: CarExpense[];
  carExpenses: Record<string, CarExpense[]>; // carId -> expenses[]
  recentExpenses: CarExpense[];
  selectedExpense: CarExpense | null;
  totalExpenses: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  getCarExpenses: (carId: string) => Promise<void>;
  getExpenseById: (expenseId: string) => Promise<CarExpense | null>;
  createExpense: (
    expenseData: Omit<CarExpense, "id" | "created_at">
  ) => Promise<void>;
  updateExpense: (
    expenseId: string,
    updates: Partial<CarExpense>
  ) => Promise<void>;
  deleteExpense: (expenseId: string) => Promise<void>;
  getExpensesByDateRange: (
    startDate: string,
    endDate: string
  ) => Promise<CarExpense[]>;
  getTotalExpenses: (carId: string) => Promise<number>;
  getRecentExpenses: (limit?: number) => Promise<void>;
  setSelectedExpense: (expense: CarExpense | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set, get) => ({
      // Initial state
      expenses: [],
      carExpenses: {},
      recentExpenses: [],
      selectedExpense: null,
      totalExpenses: 0,
      isLoading: false,
      error: null,

      // Actions
      getCarExpenses: async (carId: string) => {
        set({ isLoading: true, error: null });
        try {
          const expenses = await ExpenseService.getCarExpenses(carId);
          const currentCarExpenses = get().carExpenses;

          set({
            carExpenses: {
              ...currentCarExpenses,
              [carId]: expenses,
            },
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch car expenses",
          });
          throw error;
        }
      },

      getExpenseById: async (expenseId: string) => {
        set({ isLoading: true, error: null });
        try {
          const expense = await ExpenseService.getExpenseById(expenseId);
          set({
            selectedExpense: expense,
            isLoading: false,
          });
          return expense;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch expense",
          });
          throw error;
        }
      },

      createExpense: async (
        expenseData: Omit<CarExpense, "id" | "created_at">
      ) => {
        set({ isLoading: true, error: null });
        try {
          const newExpense = await ExpenseService.createExpense(expenseData);
          const currentCarExpenses = get().carExpenses;
          const carId = expenseData.car_id;
          const existingExpenses = currentCarExpenses[carId] || [];

          set({
            carExpenses: {
              ...currentCarExpenses,
              [carId]: [newExpense, ...existingExpenses],
            },
            recentExpenses: [newExpense, ...get().recentExpenses.slice(0, 9)],
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to create expense",
          });
          throw error;
        }
      },

      updateExpense: async (
        expenseId: string,
        updates: Partial<CarExpense>
      ) => {
        set({ isLoading: true, error: null });
        try {
          const updatedExpense = await ExpenseService.updateExpense(
            expenseId,
            updates
          );
          const currentCarExpenses = get().carExpenses;
          const carId = updatedExpense.car_id;
          const existingExpenses = currentCarExpenses[carId] || [];

          // Update in car expenses
          const updatedCarExpenses = existingExpenses.map((expense) =>
            expense.id === expenseId ? updatedExpense : expense
          );

          // Update in recent expenses
          const updatedRecentExpenses = get().recentExpenses.map((expense) =>
            expense.id === expenseId ? updatedExpense : expense
          );

          set({
            carExpenses: {
              ...currentCarExpenses,
              [carId]: updatedCarExpenses,
            },
            recentExpenses: updatedRecentExpenses,
            selectedExpense:
              get().selectedExpense?.id === expenseId
                ? updatedExpense
                : get().selectedExpense,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to update expense",
          });
          throw error;
        }
      },

      deleteExpense: async (expenseId: string) => {
        set({ isLoading: true, error: null });
        try {
          await ExpenseService.deleteExpense(expenseId);
          const currentCarExpenses = get().carExpenses;

          // Find which car this expense belongs to
          let expenseCarId = "";
          for (const [carId, expenses] of Object.entries(currentCarExpenses)) {
            const expense = expenses.find((e) => e.id === expenseId);
            if (expense) {
              expenseCarId = carId;
              break;
            }
          }

          if (expenseCarId) {
            const updatedCarExpenses = currentCarExpenses[expenseCarId].filter(
              (expense) => expense.id !== expenseId
            );

            set({
              carExpenses: {
                ...currentCarExpenses,
                [expenseCarId]: updatedCarExpenses,
              },
              recentExpenses: get().recentExpenses.filter(
                (expense) => expense.id !== expenseId
              ),
              selectedExpense:
                get().selectedExpense?.id === expenseId
                  ? null
                  : get().selectedExpense,
              isLoading: false,
            });
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to delete expense",
          });
          throw error;
        }
      },

      getExpensesByDateRange: async (startDate: string, endDate: string) => {
        set({ isLoading: true, error: null });
        try {
          const expenses = await ExpenseService.getExpensesByDateRange(
            startDate,
            endDate
          );
          set({ isLoading: false });
          return expenses;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch expenses by date range",
          });
          throw error;
        }
      },

      getTotalExpenses: async (carId: string) => {
        set({ isLoading: true, error: null });
        try {
          const total = await ExpenseService.getTotalExpenses(carId);
          set({
            totalExpenses: total,
            isLoading: false,
          });
          return total;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to calculate total expenses",
          });
          throw error;
        }
      },

      getRecentExpenses: async (limit: number = 10) => {
        set({ isLoading: true, error: null });
        try {
          const recentExpenses = await ExpenseService.getRecentExpenses(limit);
          set({
            recentExpenses,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch recent expenses",
          });
          throw error;
        }
      },

      setSelectedExpense: (expense: CarExpense | null) => {
        set({ selectedExpense: expense });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      reset: () => {
        set({
          expenses: [],
          carExpenses: {},
          recentExpenses: [],
          selectedExpense: null,
          totalExpenses: 0,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: "expense-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        expenses: state.expenses,
        carExpenses: state.carExpenses,
        recentExpenses: state.recentExpenses,
      }),
    }
  )
);
