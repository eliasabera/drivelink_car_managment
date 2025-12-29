import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AuthService,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  UserProfile,
} from "../services/auth-service";

interface AuthState {
  user: any | null;
  session: any | null;
  profile: UserProfile | null;
  role: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  initializeAuth: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      profile: null,
      role: null,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const authResponse = await AuthService.login(credentials);
          set({
            user: authResponse.user,
            session: authResponse.session,
            profile: authResponse.profile,
            role: authResponse.role,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Login failed",
          });
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          const authResponse = await AuthService.register(data);
          set({
            user: authResponse.user,
            session: authResponse.session,
            profile: authResponse.profile,
            role: authResponse.role,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Registration failed",
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await AuthService.logout();
          set({
            user: null,
            session: null,
            profile: null,
            role: null,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Logout failed",
          });
          throw error;
        }
      },

      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),
      clearError: () => set({ error: null }),

      initializeAuth: async () => {
        set({ isLoading: true });
        try {
          const authResponse = await AuthService.getCurrentUser();
          if (authResponse) {
            set({
              user: authResponse.user,
              session: authResponse.session,
              profile: authResponse.profile,
              role: authResponse.role,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              user: null,
              session: null,
              profile: null,
              role: null,
              isLoading: false,
              error: null,
            });
          }
        } catch (error) {
          set({
            user: null,
            session: null,
            profile: null,
            role: null,
            isLoading: false,
            error: null,
          });
        }
      },

      updateProfile: async (updates: Partial<UserProfile>) => {
        const { profile } = get();
        if (!profile) throw new Error("No user profile found");

        set({ isLoading: true, error: null });
        try {
          const updatedProfile = await AuthService.updateProfile(
            profile.id,
            updates
          );
          set({
            profile: updatedProfile,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Profile update failed",
          });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        profile: state.profile,
        role: state.role,
      }),
    }
  )
);
