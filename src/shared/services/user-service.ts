import { supabase } from "./supabase";

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone_number?: string;
  avatar?: string;
  role: string;
  created_at: string;
}

export interface Driver {
  id: string;
  driver_id: string;
  geolocation?: string;
  created_at: string;
}

export interface Manager {
  id: string;
  manager_id: string;
  geo_location?: string;
  created_at: string;
}

export interface Owner {
  id: string;
  owner_id: string;
  created_at: string;
}

export class UserService {
  // Get user by ID with profile and role
  static async getUserById(userId: string): Promise<User | null> {
    try {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError) throw profileError;

      const { data: roleData } = await supabase
        .from("role")
        .select("role")
        .eq("user_id", userId)
        .single();

      return {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        phone_number: profile.phone_number,
        avatar: profile.avatar,
        role: roleData?.role || "driver",
        created_at: profile.created_at,
      };
    } catch (error: any) {
      console.error("Get user by ID error:", error);
      return null;
    }
  }

  // Get all drivers
  static async getDrivers(): Promise<Driver[]> {
    try {
      const { data, error } = await supabase
        .from("driver")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error("Get drivers error:", error);
      throw new Error(error.message || "Failed to fetch drivers");
    }
  }

  // Get all managers
  static async getManagers(): Promise<Manager[]> {
    try {
      const { data, error } = await supabase
        .from("manager")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error("Get managers error:", error);
      throw new Error(error.message || "Failed to fetch managers");
    }
  }

  // Get all owners
  static async getOwners(): Promise<Owner[]> {
    try {
      const { data, error } = await supabase
        .from("owner")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error("Get owners error:", error);
      throw new Error(error.message || "Failed to fetch owners");
    }
  }

  // Get driver with assigned car
  static async getDriverWithCar(driverId: string) {
    try {
      const { data, error } = await supabase
        .from("car_driver")
        .select(
          `
          *,
          car:car(*)
        `
        )
        .eq("driver_id", driverId)
        .is("unassigned_at", null)
        .single();

      if (error) return null;
      return data;
    } catch (error: any) {
      console.error("Get driver with car error:", error);
      return null;
    }
  }

  // Get manager with assigned cars
  static async getManagerWithCars(managerId: string) {
    try {
      const { data, error } = await supabase
        .from("car_manager")
        .select(
          `
          *,
          car:car(*)
        `
        )
        .eq("manager_id", managerId);

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error("Get manager with cars error:", error);
      throw new Error(error.message || "Failed to fetch manager assignments");
    }
  }

  // Get users by role
  static async getUsersByRole(role: string): Promise<User[]> {
    try {
      const { data: roleData, error: roleError } = await supabase
        .from("role")
        .select(
          `
          role,
          user:profiles(*)
        `
        )
        .eq("role", role);

      if (roleError) throw roleError;

      return (roleData || []).map((item) => ({
        id: item.user.id,
        email: item.user.email,
        full_name: item.user.full_name,
        phone_number: item.user.phone_number,
        avatar: item.user.avatar,
        role: item.role,
        created_at: item.user.created_at,
      }));
    } catch (error: any) {
      console.error("Get users by role error:", error);
      throw new Error(error.message || "Failed to fetch users");
    }
  }
}
