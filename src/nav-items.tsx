
import { HomeIcon, UserIcon, TargetIcon, MessageSquareIcon, MapIcon, SettingsIcon } from "lucide-react";
import Index from "./pages/Index.tsx";
import Auth from "./pages/Auth.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Diet from "./pages/Diet.tsx";
import Goals from "./pages/Goals.tsx";
import Chat from "./pages/Chat.tsx";
import Maps from "./pages/Maps.tsx";
import Settings from "./pages/Settings.tsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
    protected: false,
  },
  {
    title: "Auth",
    to: "/auth",
    icon: <UserIcon className="h-4 w-4" />,
    page: <Auth />,
    protected: false,
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Dashboard />,
    protected: true,
  },
  {
    title: "Diet Monitoring",
    to: "/diet",
    icon: <TargetIcon className="h-4 w-4" />,
    page: <Diet />,
    protected: true,
  },
  {
    title: "Goals",
    to: "/goals",
    icon: <TargetIcon className="h-4 w-4" />,
    page: <Goals />,
    protected: true,
  },
  {
    title: "AI Chat",
    to: "/chat",
    icon: <MessageSquareIcon className="h-4 w-4" />,
    page: <Chat />,
    protected: true,
  },
  {
    title: "Health Facilities",
    to: "/maps",
    icon: <MapIcon className="h-4 w-4" />,
    page: <Maps />,
    protected: true,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: <SettingsIcon className="h-4 w-4" />,
    page: <Settings />,
    protected: true,
  },
];
