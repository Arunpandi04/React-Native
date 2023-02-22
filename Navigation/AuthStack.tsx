import { Stack } from './StackNavigation'
import DashboardScreen from '../Screens/Dashboard';
import Logout from '../Screens/Logout';

const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={DashboardScreen} options={{
                headerShown: false,
            }}/>
            <Stack.Screen name="Logout" component={Logout} options={{
                headerShown: false,
            }}/>
        </Stack.Navigator>
    )
};
export default AppStack;
