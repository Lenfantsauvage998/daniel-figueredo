import { SignJWT, jwtVerify } from "jose";
import { compare, hash } from "bcryptjs";

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "fallback-secret-change-me"
);

export async function hashPassword(password: string) {
  return hash(password, 12);
}

export async function verifyPassword(password: string, hashed: string) {
  return compare(password, hashed);
}

export async function createToken(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, { clockTolerance: 60 });
    return payload as { userId: string; email: string; role: string };
  } catch {
    return null;
  }
}

export function getAuthCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )auth-token=([^;]*)/);
  return match ? match[1] : null;
}
