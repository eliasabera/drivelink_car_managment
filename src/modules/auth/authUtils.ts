import { useAuthStore } from "../../shared/store/auth-store";

// Helper function to validate email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate password strength
export const validatePassword = (
  password: string
): { isValid: boolean; message: string } => {
  if (password.length < 6) {
    return {
      isValid: false,
      message: "Password must be at least 6 characters",
    };
  }
  return { isValid: true, message: "" };
};

// Get user's role-based dashboard path
export const getDashboardPath = (role: string | null): string => {
  switch (role) {
    case "owner":
      return "/(owner)/dashboard";
    case "manager":
      return "/(manager)/dashboard";
    case "driver":
      return "/(driver)/dashboard";
    case "admin":
      return "/(owner)/dashboard"; // Admin uses owner dashboard
    default:
      return "/(auth)/login";
  }
};

// Check if user is authenticated
export const useIsAuthenticated = () => {
  const { user, session } = useAuthStore();
  return !!user && !!session;
};

// Get current user's role
export const useUserRole = () => {
  const { role } = useAuthStore();
  return role;
};

// Get current user's profile
export const useUserProfile = () => {
  const { profile } = useAuthStore();
  return profile;
};

// Format role display name
export const formatRoleName = (role: string): string => {
  const roleNames: Record<string, string> = {
    owner: "Car Owner",
    manager: "Fleet Manager",
    driver: "Driver",
    admin: "Administrator",
  };
  return roleNames[role] || role;
};

// Check if user has specific role
export const hasRole = (
  userRole: string | null,
  requiredRole: string | string[]
): boolean => {
  if (!userRole) return false;

  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }

  return userRole === requiredRole;
};

// Role hierarchy check (admin > owner > manager > driver)
export const hasPermission = (
  userRole: string | null,
  requiredPermissionLevel: string
): boolean => {
  const hierarchy: Record<string, number> = {
    admin: 4,
    owner: 3,
    manager: 2,
    driver: 1,
  };

  if (!userRole || !hierarchy[userRole]) return false;

  return hierarchy[userRole] >= hierarchy[requiredPermissionLevel];
};
