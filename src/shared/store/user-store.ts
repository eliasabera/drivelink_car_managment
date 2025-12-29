import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  UserService,
  User,
  Driver,
  Manager,
  Owner,
} from "../services/user-service";

interface UserState {
  // State
  users: User[];
  drivers: Driver[];
  managers: Manager[];
  owners: Owner[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  getAllUsers: () => Promise<void>;
  getDrivers: () => Promise<void>;
  getManagers: () => Promise<void>;
  getOwners: () => Promise<void>;
  getUserById: (userId: string) => Promise<User | null>;
  getUsersByRole: (role: string) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state
      users: [],
      drivers: [],
      managers: [],
      owners: [],
      selectedUser: null,
      isLoading: false,
      error: null,

      // Actions
      getAllUsers: async () => {
        set({ isLoading: true, error: null });
        try {
          const users = await UserService.getUsersByRole("driver");
          const managers = await UserService.getUsersByRole("manager");
          const owners = await UserService.getUsersByRole("owner");

          const allUsers = [...users, ...managers, ...owners];
          set({
            users: allUsers,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch users",
          });
          throw error;
        }
      },

      getDrivers: async () => {
        set({ isLoading: true, error: null });
        try {
          const drivers = await UserService.getDrivers();
          set({
            drivers,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch drivers",
          });
          throw error;
        }
      },

      getManagers: async () => {
        set({ isLoading: true, error: null });
        try {
          const managers = await UserService.getManagers();
          set({
            managers,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch managers",
          });
          throw error;
        }
      },

      getOwners: async () => {
        set({ isLoading: true, error: null });
        try {
          const owners = await UserService.getOwners();
          set({
            owners,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch owners",
          });
          throw error;
        }
      },

      getUserById: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          const user = await UserService.getUserById(userId);
          set({
            selectedUser: user,
            isLoading: false,
          });
          return user;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to fetch user",
          });
          throw error;
        }
      },

      getUsersByRole: async (role: string) => {
        set({ isLoading: true, error: null });
        try {
          const users = await UserService.getUsersByRole(role);

          if (role === "driver") {
            set({ drivers: users, isLoading: false });
          } else if (role === "manager") {
            set({ managers: users, isLoading: false });
          } else if (role === "owner") {
            set({ owners: users, isLoading: false });
          }

          return users;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || `Failed to fetch ${role}s`,
          });
          throw error;
        }
      },

      setSelectedUser: (user: User | null) => {
        set({ selectedUser: user });
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
          users: [],
          drivers: [],
          managers: [],
          owners: [],
          selectedUser: null,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        users: state.users,
        drivers: state.drivers,
        managers: state.managers,
        owners: state.owners,
        selectedUser: state.selectedUser,
      }),
    }
  )
);
