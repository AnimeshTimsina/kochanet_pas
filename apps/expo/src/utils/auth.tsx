import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import * as Browser from "expo-web-browser";

import { api } from "./api";
import { getBaseUrl } from "./base-url";
import { deleteToken, setToken } from "./session-store";

export const signIn = async () => {
  const signInUrl = `${getBaseUrl()}/api/auth/signin`;
  const redirectTo = Linking.createURL("/login");
  const result = await Browser.openAuthSessionAsync(
    `${signInUrl}?expo-redirect=${encodeURIComponent(redirectTo)}`,
    redirectTo,
  );

  if (result.type !== "success") return false;
  const url = Linking.parse(result.url);
  const sessionToken = String(url.queryParams?.session_token);
  if (!sessionToken) return false;

  setToken(sessionToken);
  Browser.dismissBrowser();
  return true;
};

export const useUser = () => {
  const { data: session } = api.auth.getSession.useQuery();
  return session?.user ?? null;
};

export const useSignIn = () => {
  const utils = api.useUtils();

  return async () => {
    const success = await signIn();
    if (success) {
      await utils.invalidate();
    }
  };
};

export const useSignOut = () => {
  const router = useRouter();

  return async () => {
    const redirectTo = Linking.createURL("/");

    const signOutURL = `${getBaseUrl()}/api/auth/signout?expoRedirect=${encodeURIComponent(redirectTo)}`;
    const { type } = await Browser.openAuthSessionAsync(
      `${signOutURL}?`,
      redirectTo,
      {},
    );
    if (type === "success") {
      Browser.dismissBrowser();
      await deleteToken();

      router.replace("/");
    } else {
      return;
    }
  };
};
