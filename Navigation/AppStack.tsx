import { Stack } from './StackNavigation'
import LoginScreen from '../Screens/LoginScreen';
import SignUpScreen from '../Screens/SignupScreen';
import YouTubeComponent from '../Components/YouTube';
import YouTubeScreen from '../Screens/VideoScreen';
import Logout from '../Screens/Logout';

export const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Signup" component={SignUpScreen} options={{
                headerShown: false,
            }} />
        </Stack.Navigator>
    );
};

export const VideoStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Video" component={YouTubeScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="YouTube" component={YouTubeComponent} options={{
                headerShown: false,
            }} />
             <Stack.Screen name="Logout" component={Logout} options={{
                headerShown: false,
            }}/>
        </Stack.Navigator>
    );
};