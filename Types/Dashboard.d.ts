import { DashboardRoute }  from './Navigator'
import type { NavigationScreenProps } from '@react-navigation/native-stack';

export interface NavStateParams {
firstName: string,
lastName: string
}

export interface DashboardProps extends NavigationScreenProps<NavStateParams> {
    route: DashboardRoute
}