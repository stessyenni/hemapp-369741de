
import React, { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { useAuth } from '@/contexts/AuthContext';

interface MobileAuthWrapperProps {
  children: React.ReactNode;
}

const MobileAuthWrapper: React.FC<MobileAuthWrapperProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(Capacitor.isNativePlatform());
    
    // Log platform info for debugging
    console.log('Platform info:', {
      platform: Capacitor.getPlatform(),
      isNative: Capacitor.isNativePlatform(),
      userAgent: navigator.userAgent
    });
  }, []);

  useEffect(() => {
    // Log auth state for mobile debugging
    if (isMobile) {
      console.log('Mobile auth state:', { user: !!user, loading });
    }
  }, [user, loading, isMobile]);

  return <>{children}</>;
};

export default MobileAuthWrapper;
