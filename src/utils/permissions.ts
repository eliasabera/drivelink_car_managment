export function canManage(user: any) {
  return user?.role === "manager" || user?.role === "owner";
}
