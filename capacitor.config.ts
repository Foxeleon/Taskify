import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.devaw.ptodolist',
  appName: 'productivity_to-do_list',
  webDir: 'dist/ToDoUI',
  server: {
    androidScheme: 'https'
  }
};

export default config;
