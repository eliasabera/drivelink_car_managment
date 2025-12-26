import { authStore } from "../shared/store/auth-store";

export function useRole() {
  // simple helper: read role from authStore.user
  return (authStore.user && authStore.user.role) || "guest";
}
