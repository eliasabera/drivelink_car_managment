import { supabase } from "./supabase";

export interface CarExpense {
  id: string;
  car_id: string;
  amount: number;
  expense_date: string;
  category: "fuel" | "maintenance" | "insurance" | "repair" | "other";
  description?: string;
  receipt_url?: string;
  created_at: string;
  created_by: string;
}

export class ExpenseService {
  // Get all expenses for a car
  static async getCarExpenses(carId: string): Promise<CarExpense[]> {
    try {
      const { data, error } = await supabase
        .from("car_expense")
        .select("*")
        .eq("car_id", carId)
        .order("expense_date", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error("Get car expenses error:", error);
      throw new Error(error.message || "Failed to fetch expenses");
    }
  }

  // Get expense by ID
  static async getExpenseById(expenseId: string): Promise<CarExpense | null> {
    try {
      const { data, error } = await supabase
        .from("car_expense")
        .select("*")
        .eq("id", expenseId)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Get expense by ID error:", error);
      return null;
    }
  }

  // Create new expense
  static async createExpense(
    expenseData: Omit<CarExpense, "id" | "created_at">
  ) {
    try {
      const { data, error } = await supabase
        .from("car_expense")
        .insert([
          {
            ...expenseData,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Create expense error:", error);
      throw new Error(error.message || "Failed to create expense");
    }
  }

  // Update expense
  static async updateExpense(expenseId: string, updates: Partial<CarExpense>) {
    try {
      const { data, error } = await supabase
        .from("car_expense")
        .update(updates)
        .eq("id", expenseId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Update expense error:", error);
      throw new Error(error.message || "Failed to update expense");
    }
  }

  // Delete expense
  static async deleteExpense(expenseId: string) {
    try {
      const { error } = await supabase
        .from("car_expense")
        .delete()
        .eq("id", expenseId);

      if (error) throw error;
    } catch (error: any) {
      console.error("Delete expense error:", error);
      throw new Error(error.message || "Failed to delete expense");
    }
  }

  // Get expenses by date range
  static async getExpensesByDateRange(
    startDate: string,
    endDate: string
  ): Promise<CarExpense[]> {
    try {
      const { data, error } = await supabase
        .from("car_expense")
        .select("*")
        .gte("expense_date", startDate)
        .lte("expense_date", endDate)
        .order("expense_date", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error("Get expenses by date range error:", error);
      throw new Error(error.message || "Failed to fetch expenses");
    }
  }

  // Get total expenses for a car
  static async getTotalExpenses(carId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from("car_expense")
        .select("amount")
        .eq("car_id", carId);

      if (error) throw error;

      const total = (data || []).reduce((sum, item) => sum + item.amount, 0);
      return total;
    } catch (error: any) {
      console.error("Get total expenses error:", error);
      throw new Error(error.message || "Failed to calculate total expenses");
    }
  }

  // Get recent expenses
  static async getRecentExpenses(limit: number = 10): Promise<CarExpense[]> {
    try {
      const { data, error } = await supabase
        .from("car_expense")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error("Get recent expenses error:", error);
      throw new Error(error.message || "Failed to fetch recent expenses");
    }
  }
}
