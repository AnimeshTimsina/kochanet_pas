import type {
  DefaultSession,
  NextAuthConfig,
  Session as NextAuthSession,
} from "next-auth";
import type { JWT, JWTDecodeParams, JWTEncodeParams } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { skipCSRFCheck } from "@auth/core";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { decode, encode } from "next-auth/jwt";
// import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";

import { AUTH_SESSION_KEY_NAME } from "@kochanet_pas/const";
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

const customEncode = async (params: JWTEncodeParams<JWT>) => {
  const jwt = await encode(params);

  return jwt;
};

const customDecode = async (params: JWTDecodeParams) => {
  const decoded = await decode(params);

  return decoded;
};

export const CREDENTIALS_PROVIDER = CredentialsProvider({
  name: "Credentials Sign in",
  credentials: {
    email: { label: "Email", type: "email", placeholder: "name@example.com" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!credentials) {
      throw new Error("No credentials provided");
    }

    const { email, password } = credentials as {
      email: string;
      password: string;
    };
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (email === "test@example.com" && password === "1234") {
      return {
        id: "asdas",
        email,
        name: "Test User",
      };
    } else {
      throw new Error("No user found with the provided email");
    }

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

export const getAuthConfig = (_req?: NextRequest) => {
  return {
    adapter,
    // In development, we need to skip checks to allow Expo to work
    ...(!isSecureContext
      ? {
          skipCSRFCheck: skipCSRFCheck,
          trustHost: true,
        }
      : {}),
    secret: env.AUTH_SECRET,
    session: {
      strategy: "jwt",
    },
    providers: [Discord, CREDENTIALS_PROVIDER],

    pages: {
      signIn: "/auth/signin",
      signOut: "/auth/signout",
      error: "/auth/error",
      // verifyRequest: '/auth/verify-request',
      newUser: "/auth/new-user",
    },

    jwt: {
      decode: customDecode,
      encode: customEncode,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
      session: (opts) => {
        // if (!("user" in opts))
        //   throw new Error("unreachable with session strategy");
        // console.log("NA-OPTS", opts);
        return {
          ...opts.session,
          user: {
            ...opts.session.user,
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            id: opts.user?.id,
          },
        };
      },
      jwt: ({ token, user }) => {
        // console.log("NA_JWT", { token, user });
        // eslint-disable-next-line @typescript-eslint/prefer-optional-chain, @typescript-eslint/no-unnecessary-condition
        if (user && user.id) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
        }
        return token;
      },
    },
  } satisfies NextAuthConfig;
};

export const validateToken = async (
  token: string,
): Promise<NextAuthSession | null> => {
  const sessionToken = token.slice("Bearer ".length);

  try {
    const decodeForMe = await decode<JWT & { id: string }>({
      token: sessionToken,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      secret: env.AUTH_SECRET!,
      salt: AUTH_SESSION_KEY_NAME,
    });

    return decodeForMe
      ? {
          user: {
            id: decodeForMe.id,
            email: decodeForMe.email,
            name: decodeForMe.name,
          },
          expires: decodeForMe.exp
            ? new Date(decodeForMe.exp * 1000).toISOString()
            : "",
        }
      : null;
  } catch (err) {
    console.error("VALIDATE ERROR", err);
    throw err;
  }
};

export const invalidateSessionToken = async (token: string) => {
  await adapter.deleteSession?.(token);
};
