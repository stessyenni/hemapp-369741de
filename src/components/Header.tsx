
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, Moon, Sun } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import Logo from './Logo';
import Navigation from './Navigation';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light'
  );

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 px-6 transition-all duration-300',
        scrolled ? 'py-3 backdrop-blur-md bg-background/80' : 'py-5 bg-transparent',
        scrolled && 'shadow-sm'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <FadeIn delay={0.1} duration={0.6} direction="down">
          <Link to="/">
            <Logo />
          </Link>
        </FadeIn>

        <Navigation />

        <div className="flex items-center">
          <FadeIn delay={0.6} duration={0.6} direction="down">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </FadeIn>

          <FadeIn delay={0.7} duration={0.6} direction="down">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </FadeIn>

          <Button
            variant="ghost"
            size="icon"
            className="ml-2 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border animate-fade-in">
          <nav className="flex flex-col space-y-4 p-6">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-health-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/diet"
              className="text-sm font-medium transition-colors hover:text-health-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Diet
            </Link>
            <Link
              to="/goals"
              className="text-sm font-medium transition-colors hover:text-health-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Goals
            </Link>
            <Link
              to="/facilities"
              className="text-sm font-medium transition-colors hover:text-health-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Facilities
            </Link>
            <Link
              to="/chatbot"
              className="text-sm font-medium transition-colors hover:text-health-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Chatbot
            </Link>
            <Link
              to="/settings"
              className="text-sm font-medium transition-colors hover:text-health-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Settings
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
