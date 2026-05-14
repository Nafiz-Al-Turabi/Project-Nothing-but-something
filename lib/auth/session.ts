export const AUTH_TOKEN_COOKIE = "auth_token";

const LEGACY_AUTH_USER_TYPE_COOKIE = "auth_user_type";

const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function getCookieAttributes() {
  const secureAttribute =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; secure"
      : "";

  return `path=/; max-age=${AUTH_COOKIE_MAX_AGE}; samesite=lax${secureAttribute}`;
}

export function getClientCookie(name: string) {
  if (typeof document === "undefined") {
    return null;
  }

  const cookiePrefix = `${name}=`;
  const targetCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(cookiePrefix));

  if (!targetCookie) {
    return null;
  }

  return decodeURIComponent(targetCookie.slice(cookiePrefix.length));
}

export function setClientAuthSession(token: string) {
  if (typeof document === "undefined") {
    return;
  }

  const cookieAttributes = getCookieAttributes();

  document.cookie = `${AUTH_TOKEN_COOKIE}=${encodeURIComponent(token)}; ${cookieAttributes}`;
  document.cookie = `${LEGACY_AUTH_USER_TYPE_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

export function getPostLoginRedirectPath(userType?: string) {
  return userType === "admin" ? "/dashboard" : "/";
}
