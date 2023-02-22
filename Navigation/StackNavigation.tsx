import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types/Navigator';
import { AuthStack } from './AppStack';
import TabNavigation from './TabNavigation';
import { getAsyncStorage } from '../Utils/storageUtils'
import { useEffect, useState } from 'react';
import { IStackNavigation } from '../Types/Navigator';

export const Stack = createNativeStackNavigator<RootStackParamList>();
export const StackNavigation = (props: IStackNavigation) => {
    const [auth, setAuth] = useState(false)
    const getToken = async () => {
        const val = await getAsyncStorage('isAuth') === 'true' ? true : false;
        setAuth(val)
    }
    useEffect(() => {
        getToken()
    }, [])
    return (
        <>
            {props?.authenticate || auth ? <TabNavigation /> : <AuthStack />}
        </>

    )
}