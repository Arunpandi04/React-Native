/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import { store } from './Store/store';
import { AuthProvider } from './Store/Context/AuthContext';
import { StackNavigation } from './Navigation/StackNavigation';
import { navigationRef } from './Navigation/RootNavigation'
import SplashScreen from 'react-native-splash-screen'
import NetInfo from "@react-native-community/netinfo";
import WarningPopup from './Components/WarningPopup';

function App(): JSX.Element {
  const [auth, setAuth] = useState<boolean>(false);
  const [connected,setConnected] = useState<boolean>(false);

 
  useEffect(()=>{
    NetInfo.addEventListener(state => {
      setConnected(!state.isConnected)
    });
  },[connected])

  useEffect(()=>{
    SplashScreen.hide();
  },[])
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <AuthProvider value={auth} handleAuth={(value: boolean) => {setAuth(value)}}>
         { connected && <WarningPopup visible={connected} />}
          <StackNavigation authenticate={auth} />
        </AuthProvider>
      </NavigationContainer>
    </Provider>
  )
}

export default App;
