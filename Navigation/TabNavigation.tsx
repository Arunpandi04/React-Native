import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import AppStack from './AuthStack'
import { VideoStack } from './AppStack';
import { Image } from 'react-native';
import assets from '../asset';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return(
        <Tab.Navigator
        screenOptions={{
          tabBarStyle: {height: 80},
        }}
      >
        <Tab.Screen
          name="Home"
          component={AppStack}  // Replaced Screen 1
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                style={{ tintColor: color }}
                source={assets.tabIcon.home}/>
           ), 
           tabBarLabel: 'Home'}}
        />
        <Tab.Screen
          name="YouTubeVideo"
          component={VideoStack}  // Replaced Screen 2
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                style={{ tintColor: color }}
                source={assets.tabIcon.video}/>
           ), 
           tabBarLabel: 'YouTubeVideo'}}
        />
      </Tab.Navigator>
    )
}

export default TabNavigation;