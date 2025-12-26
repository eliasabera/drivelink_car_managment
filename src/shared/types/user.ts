export interface User {
  id: string;
  email?: string;
  name?: string;
  role?: "owner" | "manager" | "driver" | "guest";
}
