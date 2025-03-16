
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Globe, 
  Shield, 
  Moon,
  Eye
} from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Header />
      
      <main className="pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 rounded-full bg-health-primary/10 flex items-center justify-center mr-3">
                <SettingsIcon className="h-5 w-5 text-health-primary" />
              </div>
              <h1 className="text-2xl font-bold">Settings</h1>
            </div>
          </FadeIn>
          
          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-lg font-medium mb-4 flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-health-primary" />
                  Notifications
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications" className="flex-1">Email Notifications</Label>
                    <Switch id="email-notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications" className="flex-1">Push Notifications</Label>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reminder-notifications" className="flex-1">Daily Reminders</Label>
                    <Switch id="reminder-notifications" />
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-lg font-medium mb-4 flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-health-primary" />
                  Language & Region
                </h2>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="language">Language</Label>
                    <select 
                      id="language" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select 
                      id="timezone" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="UTC">UTC (Coordinated Universal Time)</option>
                      <option value="EST">EST (Eastern Standard Time)</option>
                      <option value="PST">PST (Pacific Standard Time)</option>
                      <option value="CET">CET (Central European Time)</option>
                    </select>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-lg font-medium mb-4 flex items-center">
                  <Eye className="mr-2 h-5 w-5 text-health-primary" />
                  Appearance
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode" className="flex-1">Dark Mode</Label>
                    <Switch id="dark-mode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reduced-motion" className="flex-1">Reduced Motion</Label>
                    <Switch id="reduced-motion" />
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-lg font-medium mb-4 flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-health-primary" />
                  Privacy
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="data-sharing" className="flex-1">Data Sharing</Label>
                    <Switch id="data-sharing" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="analytics" className="flex-1">Analytics</Label>
                    <Switch id="analytics" defaultChecked />
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.5}>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
