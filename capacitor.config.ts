import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.devaw.ptodolist',
  appName: 'Taskifier',
  webDir: 'dist/ToDoUI',
  server: {
    androidScheme: 'https'
  }
};

export default config;
