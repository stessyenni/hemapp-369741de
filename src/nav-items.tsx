
import { Index } from "@/pages/Index";
import { Auth } from "@/pages/Auth";
import { Dashboard } from "@/pages/Dashboard";
import { Diet } from "@/pages/Diet";
import { Goals } from "@/pages/Goals";
import { Chat } from "@/pages/Chat";
import { Maps } from "@/pages/Maps";
import { Settings } from "@/pages/Settings";
import Profile from "@/pages/Profile";

export const navItems = [
  {
    title: "Home",
    to: "/",
    page: <Index />,
    protected: false,
  },
  {
    title: "Auth",
    to: "/auth",
    page: <Auth />,
    protected: false,
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    page: <Dashboard />,
    protected: true,
  },
  {
    title: "Diet",
    to: "/diet",
    page: <Diet />,
    protected: true,
  },
  {
    title: "Goals",
    to: "/goals",
    page: <Goals />,
    protected: true,
  },
  {
    title: "Chat",
    to: "/chat",
    page: <Chat />,
    protected: true,
  },
  {
    title: "Maps",
    to: "/maps",
    page: <Maps />,
    protected: true,
  },
  {
    title: "Settings",
    to: "/settings",
    page: <Settings />,
    protected: true,
  },
  {
    title: "Profile",
    to: "/profile",
    page: <Profile />,
    protected: true,
  },
];

<lov-add-dependency>@radix-ui/react-avatar@latest</lov-add-dependency>
<lov-add-dependency>@radix-ui/react-progress@latest</lov-add-dependency>
