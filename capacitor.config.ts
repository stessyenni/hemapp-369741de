
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hemapp.mobile',
  appName: 'Hemapp',
  webDir: 'dist',
  server: {
    url: 'https://1fe08b17-3c5e-4761-87e7-793ffddf2e2d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;
