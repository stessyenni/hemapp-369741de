
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Apple, Target, MapPin, Bot, Settings } from 'lucide-react';

const mainNavItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: <LayoutDashboard className="w-4 h-4 mr-2" />
  },
  {
    title: 'Diet',
    href: '/diet',
    icon: <Apple className="w-4 h-4 mr-2" />
  },
  {
    title: 'Goals',
    href: '/goals',
    icon: <Target className="w-4 h-4 mr-2" />
  },
  {
    title: 'Facilities',
    href: '/facilities',
    icon: <MapPin className="w-4 h-4 mr-2" />
  }
];

const Navigation = () => {
  const location = useLocation();
  
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {mainNavItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <Link to={item.href}>
              <NavigationMenuLink 
                className={cn(
                  navigationMenuTriggerStyle(),
                  location.pathname === item.href && "bg-accent text-accent-foreground",
                  "flex items-center"
                )}
              >
                {item.icon}
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center">
            <Bot className="w-4 h-4 mr-2" />
            More
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <Link to="/chatbot" className="flex items-start p-3 hover:bg-muted rounded-md">
                <Bot className="w-5 h-5 mr-3 text-health-primary" />
                <div>
                  <div className="text-sm font-medium">Chatbot</div>
                  <p className="text-xs text-muted-foreground">Get health advice from our AI assistant</p>
                </div>
              </Link>
              <Link to="/settings" className="flex items-start p-3 hover:bg-muted rounded-md">
                <Settings className="w-5 h-5 mr-3 text-health-primary" />
                <div>
                  <div className="text-sm font-medium">Settings</div>
                  <p className="text-xs text-muted-foreground">Configure your application preferences</p>
                </div>
              </Link>
              <Link to="/api-setup-guide" className="flex items-start p-3 hover:bg-muted rounded-md lg:col-span-2">
                <div className="w-5 h-5 mr-3 flex items-center justify-center text-health-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Backend Setup</div>
                  <p className="text-xs text-muted-foreground">Learn how to connect to the Django backend</p>
                </div>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
