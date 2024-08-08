import type { LucideIcon } from "lucide-react-native";
import {
  AlertCircle,
  ArrowRightIcon,
  CalendarIcon,
  CameraIcon,
  Check,
  CheckCircle,
  CheckCircleIcon,
  CheckIcon,
  ChevronDown,
  ChevronLeftIcon,
  ChevronRight,
  ChevronRightCircleIcon,
  ChevronRightIcon,
  ChevronUp,
  CircleCheckIcon,
  CircleDotIcon,
  CircleIcon,
  CircleXIcon,
  ClipboardIcon,
  FileIcon,
  FrownIcon,
  GlobeIcon,
  HomeIcon,
  ListChecksIcon,
  LoaderCircleIcon,
  LogOutIcon,
  MessageCircleMoreIcon,
  MoonIcon,
  PlusCircleIcon,
  RefreshCcwIcon,
  SaveIcon,
  SettingsIcon,
  SunIcon,
  UserRoundSearchIcon,
  UserSearchIcon,
  UsersIcon,
  WandIcon,
  XCircle,
  XIcon,
} from "lucide-react-native";
import { cssInterop } from "nativewind";

function interopIcon(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}

interopIcon(AlertCircle);
interopIcon(CheckCircle);
interopIcon(XCircle);
interopIcon(Check);
interopIcon(ChevronDown);
interopIcon(ChevronRight);
interopIcon(ChevronUp);
interopIcon(GlobeIcon);
interopIcon(SunIcon);
interopIcon(MoonIcon);
interopIcon(LogOutIcon);
interopIcon(LoaderCircleIcon);
interopIcon(FrownIcon);
interopIcon(UserSearchIcon);
interopIcon(UserRoundSearchIcon);
interopIcon(ChevronRightIcon);
interopIcon(CalendarIcon);
interopIcon(ListChecksIcon);
interopIcon(WandIcon);
interopIcon(ChevronLeftIcon);
interopIcon(MessageCircleMoreIcon);
interopIcon(CircleCheckIcon);
interopIcon(CircleXIcon);
interopIcon(RefreshCcwIcon);
interopIcon(XIcon);
interopIcon(CheckIcon);
interopIcon(FileIcon);
interopIcon(CameraIcon);
interopIcon(SaveIcon);
interopIcon(HomeIcon);
interopIcon(UsersIcon);
interopIcon(ClipboardIcon);
interopIcon(SettingsIcon);
interopIcon(ArrowRightIcon);
interopIcon(ChevronRightCircleIcon);
interopIcon(PlusCircleIcon);
interopIcon(CircleIcon);
interopIcon(CircleDotIcon);
interopIcon(CheckCircleIcon);

export {
  AlertCircle,
  CheckCircle,
  XCircle,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  GlobeIcon,
  SunIcon,
  MoonIcon,
  LogOutIcon,
  LoaderCircleIcon,
  FrownIcon,
  UserSearchIcon,
  UserRoundSearchIcon,
  ChevronRightIcon,
  CalendarIcon,
  ListChecksIcon,
  WandIcon,
  ChevronLeftIcon,
  MessageCircleMoreIcon,
  CircleCheckIcon,
  CircleXIcon,
  RefreshCcwIcon,
  XIcon,
  CheckIcon,
  FileIcon,
  CameraIcon,
  SaveIcon,
  HomeIcon,
  UsersIcon,
  ClipboardIcon,
  SettingsIcon,
  ArrowRightIcon,
  ChevronRightCircleIcon,
  PlusCircleIcon,
  CircleIcon,
  CircleDotIcon,
  CheckCircleIcon,
};
