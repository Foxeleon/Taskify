import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.devaw.ptodolist',
  appName: 'Taskify',
  webDir: 'dist/Taskify',
  server: {
    androidScheme: 'https'
  }
};

export default config;
