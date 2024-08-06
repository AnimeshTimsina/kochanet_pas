import { ClipboardIcon, HomeIcon, SettingsIcon, UsersIcon } from "lucide-react";

export const routes = [
  {
    name: "Home",
    description: null,
    route: "/assessments",
    icon: HomeIcon,
  },
  {
    name: "Patients",
    description: null,
    route: "/patients",
    icon: UsersIcon,
  },
  {
    name: "History",
    description: null,
    route: "/history",
    icon: ClipboardIcon,
  },
  {
    name: "Settings",
    description: null,
    route: "/settings",
    icon: SettingsIcon,
  },
];
