
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.hemapp.mobile',
  appName: 'Hemapp',
  webDir: 'dist',
  server: {
    url: 'https://hemapp-mobile.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;
