import NextAuth from "next-auth";

import { getAuthConfig } from "./config";

export type { Session } from "next-auth";

const { handlers, auth, signIn, signOut } = NextAuth(getAuthConfig);

export { handlers, auth, signIn, signOut };

export {
  invalidateSessionToken,
  validateToken,
  isSecureContext,
  CREDENTIALS_PROVIDER,
} from "./config";
