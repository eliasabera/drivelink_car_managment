import { supabase } from "./supabase";

export interface CarRevenue {
  id: string;
  car_id: string;
  amount: number;
  source: "ride" | "delivery" | "other";
  revenue_date: string;
  notes?: string;
  trip_id?: string;
  created_at: string;
  created_by: string;
}

export class RevenueService {
  // Get all revenue for a car
  static async getCarRevenue(carId: string): Promise<CarRevenue[]> {
    try {
      const { data, error } = await supabase
        .from("car_revenue")
        .select("*")
        .eq("car_id", carId)
        .order("revenue_date", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error("Get car revenue error:", error);
      throw new Error(error.message || "Failed to fetch revenue");
    }
  }

  // Get revenue by ID
  static async getRevenueById(revenueId: string): Promise<CarRevenue | null> {
    try {
      const { data, error } = await supabase
        .from("car_revenue")
        .select("*")
        .eq("id", revenueId)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Get revenue by ID error:", error);
      return null;
    }
  }

  // Create new revenue
  static async createRevenue(
    revenueData: Omit<CarRevenue, "id" | "created_at">
  ) {
    try {
      const { data, error } = await supabase
        .from("car_revenue")
        .insert([
          {
            ...revenueData,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Create revenue error:", error);
      throw new Error(error.message || "Failed to create revenue");
    }
  }

  // Update revenue
  static async updateRevenue(revenueId: string, updates: Partial<CarRevenue>) {
    try {
      const { data, error } = await supabase
        .from("car_revenue")
        .update(updates)
        .eq("id", revenueId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Update revenue error:", error);
      throw new Error(error.message || "Failed to update revenue");
    }
  }

  // Delete revenue
  static async deleteRevenue(revenueId: string) {
    try {
      const { error } = await supabase
        .from("car_revenue")
        .delete()
        .eq("id", revenueId);

      if (error) throw error;
    } catch (error: any) {
      console.error("Delete revenue error:", error);
      throw new Error(error.message || "Failed to delete revenue");
    }
  }

  // Get revenue by date range
  static async getRevenueByDateRange(
    startDate: string,
    endDate: string
  ): Promise<CarRevenue[]> {
    try {
      const { data, error } = await supabase
        .from("car_revenue")
        .select("*")
        .gte("revenue_date", startDate)
        .lte("revenue_date", endDate)
        .order("revenue_date", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error("Get revenue by date range error:", error);
      throw new Error(error.message || "Failed to fetch revenue");
    }
  }

  // Get total revenue for a car
  static async getTotalRevenue(carId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from("car_revenue")
        .select("amount")
        .eq("car_id", carId);

      if (error) throw error;

      const total = (data || []).reduce((sum, item) => sum + item.amount, 0);
      return total;
    } catch (error: any) {
      console.error("Get total revenue error:", error);
      throw new Error(error.message || "Failed to calculate total revenue");
    }
  }

  // Get recent revenue
  static async getRecentRevenue(limit: number = 10): Promise<CarRevenue[]> {
    try {
      const { data, error } = await supabase
        .from("car_revenue")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error("Get recent revenue error:", error);
      throw new Error(error.message || "Failed to fetch recent revenue");
    }
  }

  // Get profit/loss for a car (revenue - expenses)
  static async getProfitLoss(
    carId: string,
    startDate?: string,
    endDate?: string
  ) {
    try {
      let revenueQuery = supabase
        .from("car_revenue")
        .select("amount")
        .eq("car_id", carId);

      let expenseQuery = supabase
        .from("car_expense")
        .select("amount")
        .eq("car_id", carId);

      if (startDate && endDate) {
        revenueQuery = revenueQuery
          .gte("revenue_date", startDate)
          .lte("revenue_date", endDate);

        expenseQuery = expenseQuery
          .gte("expense_date", startDate)
          .lte("expense_date", endDate);
      }

      const [revenueData, expenseData] = await Promise.all([
        revenueQuery,
        expenseQuery,
      ]);

      const totalRevenue = (revenueData.data || []).reduce(
        (sum, item) => sum + item.amount,
        0
      );
      const totalExpenses = (expenseData.data || []).reduce(
        (sum, item) => sum + item.amount,
        0
      );
      const profit = totalRevenue - totalExpenses;
      const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

      return {
        totalRevenue,
        totalExpenses,
        profit,
        profitMargin,
      };
    } catch (error: any) {
      console.error("Get profit/loss error:", error);
      throw new Error(error.message || "Failed to calculate profit/loss");
    }
  }
}
