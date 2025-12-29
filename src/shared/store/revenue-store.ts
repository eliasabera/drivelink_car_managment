import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RevenueService, CarRevenue } from "../services/revenue-service";

interface RevenueState {
  // State
  revenues: CarRevenue[];
  carRevenues: Record<string, CarRevenue[]>; // carId -> revenues[]
  recentRevenues: CarRevenue[];
  selectedRevenue: CarRevenue | null;
  totalRevenue: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  getCarRevenue: (carId: string) => Promise<void>;
  getRevenueById: (revenueId: string) => Promise<CarRevenue | null>;
  createRevenue: (
    revenueData: Omit<CarRevenue, "id" | "created_at">
  ) => Promise<void>;
  updateRevenue: (
    revenueId: string,
    updates: Partial<CarRevenue>
  ) => Promise<void>;
  deleteRevenue: (revenueId: string) => Promise<void>;
  getRevenueByDateRange: (
    startDate: string,
    endDate: string
  ) => Promise<CarRevenue[]>;
  getTotalRevenue: (carId: string) => Promise<number>;
  getRecentRevenue: (limit?: number) => Promise<void>;
  getProfitLoss: (
    carId: string,
    startDate?: string,
    endDate?: string
  ) => Promise<{
    totalRevenue: number;
    totalExpenses: number;
    profit: number;
    profitMargin: number;
  }>;
  setSelectedRevenue: (revenue: CarRevenue | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

export const useRevenueStore = create<RevenueState>()(
  persist(
    (set, get) => ({
      // Initial state
      revenues: [],
      carRevenues: {},
      recentRevenues: [],
      selectedRevenue: null,
      totalRevenue: 0,
      isLoading: false,
      error: null,

      // Actions
      getCarRevenue: async (carId: string) => {
        set({ isLoading: true, error: null });
        try {
          const revenues = await RevenueService.getCarRevenue(carId);
          const currentCarRevenues = get().carRevenues;

          set({
            carRevenues: {
              ...currentCarRevenues,
              [carId]: revenues,
            },
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch car revenue",
          });
          throw error;
        }
      },

      getRevenueById: async (revenueId: string) => {
        set({ isLoading: true, error: null });
        try {
          const revenue = await RevenueService.getRevenueById(revenueId);
          set({
            selectedRevenue: revenue,
            isLoading: false,
          });
          return revenue;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch revenue",
          });
          throw error;
        }
      },

      createRevenue: async (
        revenueData: Omit<CarRevenue, "id" | "created_at">
      ) => {
        set({ isLoading: true, error: null });
        try {
          const newRevenue = await RevenueService.createRevenue(revenueData);
          const currentCarRevenues = get().carRevenues;
          const carId = revenueData.car_id;
          const existingRevenues = currentCarRevenues[carId] || [];

          set({
            carRevenues: {
              ...currentCarRevenues,
              [carId]: [newRevenue, ...existingRevenues],
            },
            recentRevenues: [newRevenue, ...get().recentRevenues.slice(0, 9)],
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to create revenue",
          });
          throw error;
        }
      },

      updateRevenue: async (
        revenueId: string,
        updates: Partial<CarRevenue>
      ) => {
        set({ isLoading: true, error: null });
        try {
          const updatedRevenue = await RevenueService.updateRevenue(
            revenueId,
            updates
          );
          const currentCarRevenues = get().carRevenues;
          const carId = updatedRevenue.car_id;
          const existingRevenues = currentCarRevenues[carId] || [];

          // Update in car revenues
          const updatedCarRevenues = existingRevenues.map((revenue) =>
            revenue.id === revenueId ? updatedRevenue : revenue
          );

          // Update in recent revenues
          const updatedRecentRevenues = get().recentRevenues.map((revenue) =>
            revenue.id === revenueId ? updatedRevenue : revenue
          );

          set({
            carRevenues: {
              ...currentCarRevenues,
              [carId]: updatedCarRevenues,
            },
            recentRevenues: updatedRecentRevenues,
            selectedRevenue:
              get().selectedRevenue?.id === revenueId
                ? updatedRevenue
                : get().selectedRevenue,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to update revenue",
          });
          throw error;
        }
      },

      deleteRevenue: async (revenueId: string) => {
        set({ isLoading: true, error: null });
        try {
          await RevenueService.deleteRevenue(revenueId);
          const currentCarRevenues = get().carRevenues;

          // Find which car this revenue belongs to
          let revenueCarId = "";
          for (const [carId, revenues] of Object.entries(currentCarRevenues)) {
            const revenue = revenues.find((r) => r.id === revenueId);
            if (revenue) {
              revenueCarId = carId;
              break;
            }
          }

          if (revenueCarId) {
            const updatedCarRevenues = currentCarRevenues[revenueCarId].filter(
              (revenue) => revenue.id !== revenueId
            );

            set({
              carRevenues: {
                ...currentCarRevenues,
                [revenueCarId]: updatedCarRevenues,
              },
              recentRevenues: get().recentRevenues.filter(
                (revenue) => revenue.id !== revenueId
              ),
              selectedRevenue:
                get().selectedRevenue?.id === revenueId
                  ? null
                  : get().selectedRevenue,
              isLoading: false,
            });
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to delete revenue",
          });
          throw error;
        }
      },

      getRevenueByDateRange: async (startDate: string, endDate: string) => {
        set({ isLoading: true, error: null });
        try {
          const revenues = await RevenueService.getRevenueByDateRange(
            startDate,
            endDate
          );
          set({ isLoading: false });
          return revenues;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch revenue by date range",
          });
          throw error;
        }
      },

      getTotalRevenue: async (carId: string) => {
        set({ isLoading: true, error: null });
        try {
          const total = await RevenueService.getTotalRevenue(carId);
          set({
            totalRevenue: total,
            isLoading: false,
          });
          return total;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to calculate total revenue",
          });
          throw error;
        }
      },

      getRecentRevenue: async (limit: number = 10) => {
        set({ isLoading: true, error: null });
        try {
          const recentRevenues = await RevenueService.getRecentRevenue(limit);
          set({
            recentRevenues,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch recent revenue",
          });
          throw error;
        }
      },

      getProfitLoss: async (
        carId: string,
        startDate?: string,
        endDate?: string
      ) => {
        set({ isLoading: true, error: null });
        try {
          const profitLoss = await RevenueService.getProfitLoss(
            carId,
            startDate,
            endDate
          );
          set({ isLoading: false });
          return profitLoss;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to calculate profit/loss",
          });
          throw error;
        }
      },

      setSelectedRevenue: (revenue: CarRevenue | null) => {
        set({ selectedRevenue: revenue });
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
          revenues: [],
          carRevenues: {},
          recentRevenues: [],
          selectedRevenue: null,
          totalRevenue: 0,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: "revenue-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        revenues: state.revenues,
        carRevenues: state.carRevenues,
        recentRevenues: state.recentRevenues,
      }),
    }
  )
);
