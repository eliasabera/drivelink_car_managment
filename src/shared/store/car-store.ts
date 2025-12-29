import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CarService, Car } from "../services/car-service";

interface CarState {
  // State
  cars: Car[];
  selectedCar: Car | null;
  ownerCars: Car[];
  activeCars: Car[];
  maintenanceCars: Car[];
  availableCars: Car[];
  inactiveCars: Car[];
  isLoading: boolean;
  error: string | null;

  // Actions
  getAllCars: () => Promise<void>;
  getCarById: (carId: string) => Promise<Car | null>;
  getCarsByOwner: (ownerId: string) => Promise<void>;
  createCar: (carData: Omit<Car, "id" | "created_at">) => Promise<void>;
  updateCar: (carId: string, updates: Partial<Car>) => Promise<void>;
  deleteCar: (carId: string) => Promise<void>;
  getCarsByStatus: (status: Car["status"]) => Promise<void>;
  assignDriver: (carId: string, driverId: string) => Promise<void>;
  assignManager: (carId: string, managerId: string) => Promise<void>;
  setSelectedCar: (car: Car | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

export const useCarStore = create<CarState>()(
  persist(
    (set, get) => ({
      // Initial state
      cars: [],
      selectedCar: null,
      ownerCars: [],
      activeCars: [],
      maintenanceCars: [],
      availableCars: [],
      inactiveCars: [],
      isLoading: false,
      error: null,

      // Actions
      getAllCars: async () => {
        set({ isLoading: true, error: null });
        try {
          const cars = await CarService.getAllCars();

          // Categorize cars by status
          const activeCars = cars.filter((car) => car.status === "active");
          const maintenanceCars = cars.filter(
            (car) => car.status === "maintenance"
          );
          const availableCars = cars.filter(
            (car) => car.status === "available"
          );
          const inactiveCars = cars.filter((car) => car.status === "inactive");

          set({
            cars,
            activeCars,
            maintenanceCars,
            availableCars,
            inactiveCars,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch cars",
          });
          throw error;
        }
      },

      getCarById: async (carId: string) => {
        set({ isLoading: true, error: null });
        try {
          const car = await CarService.getCarById(carId);
          set({
            selectedCar: car,
            isLoading: false,
          });
          return car;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch car",
          });
          throw error;
        }
      },

      getCarsByOwner: async (ownerId: string) => {
        set({ isLoading: true, error: null });
        try {
          const ownerCars = await CarService.getCarsByOwner(ownerId);
          set({
            ownerCars,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch owner cars",
          });
          throw error;
        }
      },

      createCar: async (carData: Omit<Car, "id" | "created_at">) => {
        set({ isLoading: true, error: null });
        try {
          const newCar = await CarService.createCar(carData);
          const currentCars = get().cars;
          const currentOwnerCars = get().ownerCars;

          set({
            cars: [newCar, ...currentCars],
            ownerCars: [newCar, ...currentOwnerCars],
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to create car",
          });
          throw error;
        }
      },

      updateCar: async (carId: string, updates: Partial<Car>) => {
        set({ isLoading: true, error: null });
        try {
          const updatedCar = await CarService.updateCar(carId, updates);
          const currentCars = get().cars;
          const currentOwnerCars = get().ownerCars;

          // Update in all relevant arrays
          const updateArray = (array: Car[]) =>
            array.map((car) => (car.id === carId ? updatedCar : car));

          // Categorize by status for the updated car
          const statusArrays = {
            activeCars: get().activeCars,
            maintenanceCars: get().maintenanceCars,
            availableCars: get().availableCars,
            inactiveCars: get().inactiveCars,
          };

          set({
            cars: updateArray(currentCars),
            ownerCars: updateArray(currentOwnerCars),
            selectedCar:
              get().selectedCar?.id === carId ? updatedCar : get().selectedCar,
            activeCars: updateArray(statusArrays.activeCars).filter(
              (car) => car.status === "active"
            ),
            maintenanceCars: updateArray(statusArrays.maintenanceCars).filter(
              (car) => car.status === "maintenance"
            ),
            availableCars: updateArray(statusArrays.availableCars).filter(
              (car) => car.status === "available"
            ),
            inactiveCars: updateArray(statusArrays.inactiveCars).filter(
              (car) => car.status === "inactive"
            ),
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to update car",
          });
          throw error;
        }
      },

      deleteCar: async (carId: string) => {
        set({ isLoading: true, error: null });
        try {
          await CarService.deleteCar(carId);
          const currentCars = get().cars;
          const currentOwnerCars = get().ownerCars;

          // Remove from all arrays
          const removeFromArray = (array: Car[]) =>
            array.filter((car) => car.id !== carId);

          set({
            cars: removeFromArray(currentCars),
            ownerCars: removeFromArray(currentOwnerCars),
            selectedCar:
              get().selectedCar?.id === carId ? null : get().selectedCar,
            activeCars: removeFromArray(get().activeCars),
            maintenanceCars: removeFromArray(get().maintenanceCars),
            availableCars: removeFromArray(get().availableCars),
            inactiveCars: removeFromArray(get().inactiveCars),
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to delete car",
          });
          throw error;
        }
      },

      getCarsByStatus: async (status: Car["status"]) => {
        set({ isLoading: true, error: null });
        try {
          const cars = await CarService.getCarsByStatus(status);

          // Update the specific status array
          const statusMap = {
            active: "activeCars",
            maintenance: "maintenanceCars",
            available: "availableCars",
            inactive: "inactiveCars",
          };

          set({
            [statusMap[status]]: cars,
            isLoading: false,
          } as any);
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch cars by status",
          });
          throw error;
        }
      },

      assignDriver: async (carId: string, driverId: string) => {
        set({ isLoading: true, error: null });
        try {
          await CarService.assignDriver(carId, driverId);
          set({ isLoading: false });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to assign driver",
          });
          throw error;
        }
      },

      assignManager: async (carId: string, managerId: string) => {
        set({ isLoading: true, error: null });
        try {
          await CarService.assignManager(carId, managerId);
          set({ isLoading: false });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to assign manager",
          });
          throw error;
        }
      },

      setSelectedCar: (car: Car | null) => {
        set({ selectedCar: car });
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
          cars: [],
          selectedCar: null,
          ownerCars: [],
          activeCars: [],
          maintenanceCars: [],
          availableCars: [],
          inactiveCars: [],
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: "car-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        cars: state.cars,
        selectedCar: state.selectedCar,
        ownerCars: state.ownerCars,
      }),
    }
  )
);
