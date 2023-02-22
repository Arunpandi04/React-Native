import type { NativeStackNavigationProp, RouteProp } from '@react-navigation/native-stack';
import { Video } from './video'
export type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Dashboard: undefined;
    Logout: undefined,
    Video: undefined
    YouTube: {
      video: Video
    }
  };

  export type DashboardRoute = RouteProp<RootStackParamList, 'Dashboard'>

  export type YouTubeRoute = RouteProp<RootStackParamList, 'YouTube'>

  export interface IStackNavigation {
    authenticate: boolean
  }