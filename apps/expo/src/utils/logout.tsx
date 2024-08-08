import React from "react";
import { View } from "react-native";

import { Button } from "~/components/ui/button";
import useDrawer from "~/components/ui/popup";
import { Text } from "~/components/ui/text";
import { useSignOut } from "./auth";

const LogoutPrompt: React.FC<{ close: () => void }> = (props) => {
  const logOut = useSignOut();
  return (
    <View className="pt-6">
      <Text className="text-center text-xl">
        Are you sure you want to log out?
      </Text>
      <View className="mt-6 flex flex-row items-center justify-center gap-4">
        <Button variant={"outline"} onPress={props.close}>
          <Text>Cancel</Text>
        </Button>
        <Button
          variant={"default"}
          onPress={async () => {
            await logOut();
            props.close();
          }}
        >
          <Text>Log out</Text>
        </Button>
      </View>
    </View>
  );
};

const useLogoutPrompt = () => {
  const { open, close } = useDrawer();

  return {
    open: () =>
      open({
        component: <LogoutPrompt close={close} />,
        config: {
          height: 170,
        },
      }),
  };
};

const LogoutButton = () => {
  const { open } = useLogoutPrompt();
  return (
    <Button variant={"black"} size="sm" onPress={open}>
      <Text>Logout</Text>
    </Button>
  );
};

export default LogoutButton;
