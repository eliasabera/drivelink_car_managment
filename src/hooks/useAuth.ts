import { useEffect, useState } from "react";
import { authStore } from "../shared/store/auth-store";

export function useAuth() {
  const [user] = useState(authStore.user);
  useEffect(() => {}, [user]);
  return { user };
}
