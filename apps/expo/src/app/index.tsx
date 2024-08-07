import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { ArrowRightIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useSignIn, useUser } from "~/utils/auth";
import { getToken } from "~/utils/session-store";

export default function Index() {
  const user = useUser();
  const signIn = useSignIn();

  const router = useRouter();
  useEffect(() => {
    const token = getToken();

    if (token && user?.id) {
      router.replace("/home");
    }
  }, [user?.id, router]);

  return (
    <SafeAreaView>
      <View className="h-full w-full items-center justify-center p-4 px-3 py-3">
        <View className="flex flex-col items-center justify-center gap-6">
          <View className="flex flex-row items-center">
            <Text className="text-center text-4xl font-extrabold tracking-tight md:text-[5xl]">
              Kochanet
            </Text>
            <Text className="text-4xl font-extrabold tracking-tight text-primary md:text-[5xl]">
              PAS
            </Text>
          </View>
          <Button variant={"default"} size="default" onPress={signIn}>
            <Text className="font-fextrabold">Sign in</Text>
            <ArrowRightIcon color={"#ffffff"} size={18} />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
