import type { StyleProp, ViewStyle } from "react-native";
// import _RBSheet, {
//   RBSheetProps,
//   RBSheetHandle,
// } from "../../components/react-native-raw-bottom-sheet"
import type { ActionSheetRef } from "react-native-actions-sheet";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useColorScheme, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import {
  PanGestureHandler,
  TouchableOpacity,
} from "react-native-gesture-handler";
import _ from "lodash";

import { COLORS } from "~/lib/constants";

export interface IDrawer {
  component: React.ReactNode;
  config?: {
    height?: number;
    onOpen?: () => void;
    onClose?: () => void;
    style?: StyleProp<ViewStyle>;
  };
  style?: StyleProp<ViewStyle>;
  onClose?: () => void;
  onOpen?: () => void;
}

interface IReturn {
  open: (e: IDrawer) => void;
  reMount: () => void;
  closeAll: () => void;
  close: () => void;
  isOpen: boolean;
  actionSheetRef: React.RefObject<ActionSheetRef>;
}

const drawerContext = createContext<IReturn | null>(null);
const { Provider } = drawerContext;

// interface IDrawerState {
//   show: IDrawer | null
//   setShow: (e: IDrawer | null) => void
// }

// const useDrawerState = create<IDrawerState>()((set) => ({
//   show: null,
//   setShow: (e) => set({ show: e }),
// }))

const HorizontalBarIndicator = ({
  onSwipeDown,
}: {
  onSwipeDown: () => void;
}) => {
  const scheme = useColorScheme();
  const color = scheme === "dark" ? "#fff" : COLORS.DISABLED;

  return (
    <PanGestureHandler
      onGestureEvent={(event) => {
        if (event.nativeEvent.state) {
          onSwipeDown();
        }
      }}
    >
      <View
        style={{
          width: "100%",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginTop: 20,
            height: 5,
            width: 50,
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: color,
            alignSelf: "center",
            borderRadius: 5,
            // marginTop: 5,
          }}
        />
      </View>
    </PanGestureHandler>
  );
};

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scheme = useColorScheme();
  const [show, setShow] = useState<IDrawer | null>(null);

  const close = () => {
    // actionSheetRef?.current?.hide()
    setShow(null);
  };
  const open = (e: IDrawer) => {
    setShow(e);
  };

  useEffect(() => {
    if (show) {
      actionSheetRef.current?.show();
    } else {
      actionSheetRef.current?.hide();
    }
  }, [show]);

  return (
    <Provider
      value={{
        open,
        close,
        isOpen: !!show,
        reMount: () => actionSheetRef.current?.show(),
        closeAll: () => {
          actionSheetRef.current?.hide();
          close();
        },
        actionSheetRef,
      }}
    >
      {children}

      {/* {!!show && ( */}
      <ActionSheet
        ref={actionSheetRef}
        headerAlwaysVisible
        // gestureEnabled
        containerStyle={_.extend(show?.style ?? {}, {
          height: show?.config?.height,
          //      justifyContent: "center",
          // alignItems: "center",
          backgroundColor:
            scheme === "dark" ? COLORS.POPUP_DARK_BG : COLORS.DRAWER_LIGHT_BG,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20,
        })}
        onOpen={show?.onOpen}
        onClose={() => {
          if (show?.onClose) show.onClose();
          close();
        }}
        enableGesturesInScrollView={false}
        CustomHeaderComponent={
          <TouchableOpacity
            onPress={close}
            containerStyle={{
              width: "100%",
            }}
          >
            <HorizontalBarIndicator onSwipeDown={close} />
          </TouchableOpacity>
        }
        // CustomHeaderComponent={{

        // }}
      >
        {show?.component}
      </ActionSheet>
      {/* )} */}
    </Provider>
  );
};

const useDrawer: () => IReturn = () => {
  const context = useContext(drawerContext);
  if (!context)
    throw new Error("useDrawer must be used within a DrawerProvider");
  return context;
};

export default useDrawer;
