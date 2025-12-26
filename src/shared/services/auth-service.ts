export async function login(email: string, password: string) {
  // placeholder: wire to supabase.auth.signIn in real app
  return { user: { email } };
}

export async function register(email: string, password: string) {
  return { user: { email } };
}
