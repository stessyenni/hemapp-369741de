
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BellIcon, MenuIcon, SearchIcon, SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AppHeaderProps {
  onMenuClick?: () => void;
}

const AppHeader = ({ onMenuClick }: AppHeaderProps) => {
  const navigate = useNavigate();
  const [notifications] = useState(3);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="md:hidden" onClick={onMenuClick}>
            <MenuIcon className="h-5 w-5" />
          </Button>
          
          {/* Logo Area - You can replace this with your logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg royal-gradient flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent">
              HemApp
            </span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex flex-1 max-w-sm">
            <div className="relative w-full">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search health data..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <Button variant="ghost" size="sm" className="relative">
            <BellIcon className="h-5 w-5" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                {notifications}
              </Badge>
            )}
          </Button>

          <Button variant="ghost" size="sm" onClick={() => navigate("/settings")}>
            <SettingsIcon className="h-5 w-5" />
          </Button>

          <Avatar className="h-8 w-8 cursor-pointer" onClick={() => navigate("/profile")}>
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-blue-100 text-blue-600">U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
