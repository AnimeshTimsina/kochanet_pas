import type {
  DefaultSession,
  NextAuthConfig,
  Session as NextAuthSession,
} from "next-auth";
import { skipCSRFCheck } from "@auth/core";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import bcrypt from "bcryptjs";
import _ from "lodash";
import CredentialsProvider from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";

import { db } from "@kochanet_pas/db";

import { env } from "../env";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const adapter = PrismaAdapter(db);

export const isSecureContext = env.NODE_ENV !== "development";

export const CREDENTIALS_PROVIDER = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email", placeholder: "name@example.com" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    if (_.isNil(credentials)) {
      throw new Error("No credentials provided");
    }

    // const { email, password } = credentials as {
    //   email: string;
    //   password: string;
    // };

    // // Fetch the user from the database using Prisma
    // const user = await db.user.findUnique({
    //   where: { email: email },
    // });
    // set delay of 200ms
    await new Promise((resolve) => setTimeout(resolve, 200));
    return {
      id: "asdas",
      email: "asd@asda.com",
      name: "Hello User",
    };

    // if (!user) {
    //   // return null;
    //   throw new Error("No user found with the provided email");
    // }

    // // Compare the provided password with the stored hashed password
    // const isValidPassword = await bcrypt.compare(password, user.password);

    // if (!isValidPassword) {
    //   // return null;
    //   throw new Error("Invalid password");
    // }

    // return {
    //   id: user.id,
    //   email: user.email,
    //   name: user.name,
    // };
  },
});

export const authConfig = {
  adapter,
  // In development, we need to skip checks to allow Expo to work
  ...(!isSecureContext
    ? {
        skipCSRFCheck: skipCSRFCheck,
        trustHost: true,
      }
    : {}),
  secret: env.AUTH_SECRET,
  providers: [Discord, CREDENTIALS_PROVIDER],

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    // verifyRequest: '/auth/verify-request',
    newUser: "/auth/new-user",
  },
  callbacks: {
    session: (opts) => {
      if (!("user" in opts))
        throw new Error("unreachable with session strategy");

      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user.id) {
        token.id = user.id;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

export const validateToken = async (
  token: string,
): Promise<NextAuthSession | null> => {
  const sessionToken = token.slice("Bearer ".length);
  const session = await adapter.getSessionAndUser?.(sessionToken);
  return session
    ? {
        user: {
          ...session.user,
        },
        expires: session.session.expires.toISOString(),
      }
    : null;
};

export const invalidateSessionToken = async (token: string) => {
  await adapter.deleteSession?.(token);
};
