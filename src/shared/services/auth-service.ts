import { supabase } from "./supabase";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone_number?: string;
  role: "driver" | "manager" | "owner";
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone_number?: string;
  avatar?: string;
  updated_at: string;
}

export interface AuthResponse {
  user: any;
  session: any;
  profile: UserProfile;
  role: string;
}

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

      if (authError) throw authError;
      if (!authData.user) throw new Error("No user returned from auth");

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (profileError) throw profileError;

      // Get user role
      const { data: roleData, error: roleError } = await supabase
        .from("role")
        .select("role")
        .eq("user_id", authData.user.id)
        .single();

      if (roleError) throw roleError;

      return {
        user: authData.user,
        session: authData.session,
        profile,
        role: roleData.role,
      };
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error.message || "Login failed");
    }
  }

  static async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.full_name,
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("User creation failed");

      // Create profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: authData.user.id,
            email: userData.email,
            full_name: userData.full_name,
            phone_number: userData.phone_number,
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (profileError) throw profileError;

      // Create role entry
      const { error: roleError } = await supabase.from("role").insert([
        {
          user_id: authData.user.id,
          role: userData.role,
        },
      ]);

      if (roleError) throw roleError;

      // Create role-specific entry if needed
      if (userData.role === "owner") {
        await supabase.from("owner").insert([{ owner_id: authData.user.id }]);
      } else if (userData.role === "manager") {
        await supabase
          .from("manager")
          .insert([{ manager_id: authData.user.id }]);
      } else if (userData.role === "driver") {
        await supabase.from("driver").insert([{ driver_id: authData.user.id }]);
      }

      return {
        user: authData.user,
        session: authData.session,
        profile,
        role: userData.role,
      };
    } catch (error: any) {
      console.error("Registration error:", error);
      throw new Error(error.message || "Registration failed");
    }
  }

  static async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  static async getCurrentUser(): Promise<AuthResponse | null> {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;
      if (!user) return null;

      // Get profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;

      // Get role
      const { data: roleData, error: roleError } = await supabase
        .from("role")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (roleError) throw roleError;

      return {
        user,
        session: null, // Will be handled by supabase
        profile,
        role: roleData.role,
      };
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  }

  static async updateProfile(userId: string, updates: Partial<UserProfile>) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Update profile error:", error);
      throw new Error(error.message || "Profile update failed");
    }
  }
}
