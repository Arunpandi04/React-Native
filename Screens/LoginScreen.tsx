import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  TouchableOpacity
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types/Navigator';
import { Input } from '../Types/Login';
import { signInAsync } from '../Store/Action/auth';
import { useAppSelector, useAppDispatch } from '../Store/hooks';
import { AuthContext } from '../Store/Context/AuthContext';
import { authProp } from '../Types/authContext';
import Loading from "../Components/Loader";
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HideKeyboard from '../Components/HideKeyboard';

function LoginScreen(): JSX.Element {
  const [showPwd, setShowPwd] = useState(false);
  const [input, setInput] = useState<Input>({
    password: "",
    email: "",
  });
  const [error, setError] = useState<Input>({
    password: "",
    email: "",
  });

  const { handleAuth } = React.useContext(AuthContext) as authProp;
  const selector = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const validation = (input: Input) => {
    Object.keys(input).forEach((key: string) => {
      if (input && key && !input[key as keyof Input]?.length) {
        error[key as keyof Input] = `${key} is missing`
      }
    });
    return error;
  }
  const onSubmit = () => {
    const error = validation(input);
    const filterError = Object.values(error).filter(e => e !== '')
    if (filterError.length) {
      setError({ ...error });
      return false;
    }
    dispatch(signInAsync(input));
    setInput({
      password: "",
      email: "",
    })
  }
  const onChange = (text: string, key: string) => {
    setInput({ ...input, [key]: text })
    if (error[key as keyof Input].length) {
      setError({ ...error, [key]: "" })
    }
  }

  // if (selector.loading) {
  //   return <Loading />
  // }
  

  if (selector.isAuthenticate) {
    handleAuth(true);
  }
  return (
    <>
   <LinearGradient
          colors={["#f0ffff", "#f0ffff", "#ccffff", "#9AFEFF"]}
          start={{x:0.1, y:0.1}}
    >
    {selector.loading && <Loading />}
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.heading}>
            Login
          </Text>
          <View>
            <Text>
              Email
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={text => onChange(text, 'email')}
              value={input?.email}
              placeholder="Email"
            />
            {error?.email && <Text style={{ color: "red" }}> {error?.email} </Text>}
          </View>
          <View>
            <Text>
              Password
            </Text>
            <View style={styles.password}>
              <TextInput
              style={styles.input}
              onChangeText={text => onChange(text, 'password')}
              value={input?.password}
              placeholder="password"
              secureTextEntry={!showPwd}
            />
              <View style={styles.eyeicon}>
                {showPwd ? <TouchableOpacity onPress={() => setShowPwd(false)}>
                  <Ionicons name="eye" size={20} />
                </TouchableOpacity> : <TouchableOpacity onPress={() => setShowPwd(true)}>
                  <Ionicons name="eye-off" size={20} />
                </TouchableOpacity>}
              </View>
            </View>
            
            {error?.password && <Text style={{ color: "red" }}> {error?.password} </Text>}
            <View style={styles.button}>
              <Button
                onPress={onSubmit}
                title="Submit"
              />
            </View>
          </View>
        </View>
        <Text>Don't have Account <Text style={{ color: 'blue' }} onPress={() => {
          navigate.navigate('Signup')
        }}><Text>Signup</Text></Text></Text>
      </SafeAreaView>
      </HideKeyboard>

      </LinearGradient>
    </>
  );
}


export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputContainer: {
    width: '80%',
    padding: 15,
  },
  button: {
    flexDirection: 'row',
    justifyContent: "flex-end",
  },
  heading: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '700',
  },
  password: {
    position: 'relative'
  },
  eyeicon: {
    position: 'absolute',
    top: 20,
    translateX: -50,
    translateY: -50,
    right: 20
  },
});