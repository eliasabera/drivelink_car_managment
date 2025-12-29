import { supabase } from "./supabase";

export interface Car {
  id: string;
  plate_no: string;
  car_libre: string;
  car_owner: string;
  model?: string;
  year?: number;
  color?: string;
  fuel_type?: string;
  status: "active" | "maintenance" | "available" | "inactive";
  created_at: string;
}

export interface CarWithDetails extends Car {
  owner_name?: string;
  current_driver?: string;
  assigned_manager?: string;
}

export class CarService {
  // Get all cars
  static async getAllCars(): Promise<Car[]> {
    try {
      const { data, error } = await supabase
        .from("car")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error("Get all cars error:", error);
      throw new Error(error.message || "Failed to fetch cars");
    }
  }

  // Get car by ID
  static async getCarById(carId: string): Promise<Car | null> {
    try {
      const { data, error } = await supabase
        .from("car")
        .select("*")
        .eq("id", carId)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Get car by ID error:", error);
      return null;
    }
  }

  // Get cars by owner
  static async getCarsByOwner(ownerId: string): Promise<Car[]> {
    try {
      // First get the owner record
      const { data: ownerData, error: ownerError } = await supabase
        .from("owner")
        .select("id")
        .eq("owner_id", ownerId)
        .single();

      if (ownerError) throw ownerError;

      // Get cars owned by this owner
      const { data, error } = await supabase
        .from("car")
        .select("*")
        .eq("car_owner", ownerData.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error("Get cars by owner error:", error);
      throw new Error(error.message || "Failed to fetch owner cars");
    }
  }

  // Create new car
  static async createCar(carData: Omit<Car, "id" | "created_at">) {
    try {
      const { data, error } = await supabase
        .from("car")
        .insert([
          {
            ...carData,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Create car error:", error);
      throw new Error(error.message || "Failed to create car");
    }
  }

  // Update car
  static async updateCar(carId: string, updates: Partial<Car>) {
    try {
      const { data, error } = await supabase
        .from("car")
        .update(updates)
        .eq("id", carId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Update car error:", error);
      throw new Error(error.message || "Failed to update car");
    }
  }

  // Delete car
  static async deleteCar(carId: string) {
    try {
      const { error } = await supabase.from("car").delete().eq("id", carId);

      if (error) throw error;
    } catch (error: any) {
      console.error("Delete car error:", error);
      throw new Error(error.message || "Failed to delete car");
    }
  }

  // Get cars by status
  static async getCarsByStatus(status: Car["status"]): Promise<Car[]> {
    try {
      const { data, error } = await supabase
        .from("car")
        .select("*")
        .eq("status", status)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error("Get cars by status error:", error);
      throw new Error(error.message || "Failed to fetch cars");
    }
  }

  // Assign driver to car
  static async assignDriver(carId: string, driverId: string) {
    try {
      // Get driver record ID
      const { data: driverData, error: driverError } = await supabase
        .from("driver")
        .select("id")
        .eq("driver_id", driverId)
        .single();

      if (driverError) throw driverError;

      // First, unassign any current driver
      await supabase
        .from("car_driver")
        .update({ unassigned_at: new Date().toISOString() })
        .eq("car_id", carId)
        .is("unassigned_at", null);

      // Assign new driver
      const { data, error } = await supabase
        .from("car_driver")
        .insert([
          {
            car_id: carId,
            driver_id: driverData.id,
            assigned_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Assign driver error:", error);
      throw new Error(error.message || "Failed to assign driver");
    }
  }

  // Assign manager to car
  static async assignManager(carId: string, managerId: string) {
    try {
      // Get manager record ID
      const { data: managerData, error: managerError } = await supabase
        .from("manager")
        .select("id")
        .eq("manager_id", managerId)
        .single();

      if (managerError) throw managerError;

      const { data, error } = await supabase
        .from("car_manager")
        .insert([
          {
            car_id: carId,
            manager_id: managerData.id,
            assigned_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Assign manager error:", error);
      throw new Error(error.message || "Failed to assign manager");
    }
  }
}
