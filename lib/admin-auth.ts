export const ADMIN_EMAIL = "admin@santorinilive.com";
export const ADMIN_PASSWORD = "admin123";
export const ADMIN_SESSION_COOKIE = "santorini_admin_session";
export const ADMIN_SESSION_VALUE = "mock-admin-session-v1";

export function isValidAdminCredentials(email: string, password: string) {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}
