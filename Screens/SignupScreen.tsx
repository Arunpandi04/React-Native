import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types/Navigator';
import { Input } from '../Types/Signup';
import { signUpAsync } from '../Store/Action/auth';
import { useAppSelector, useAppDispatch } from '../Store/hooks';
import { AuthContext } from '../Store/Context/AuthContext';
import { authProp } from '../Types/authContext';
import Loading from '../Components/Loader';
import { Dropdown } from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';

function SignUpScreen(): JSX.Element {
  const [input, setInput] = useState<Input>({
    firstName: "",
    lastName: "",
    confirmpassword: "",
    password: "",
    email: "",
    phone: "",
    gender: ""
  });
  const [error, setError] = useState<Input>({
    firstName: "",
    lastName: "",
    confirmpassword: "",
    password: "",
    email: "",
    phone: "",
    gender: ""
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showCmPwd, setShowcmPwd] = useState(false);
  const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const selector = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { handleAuth } = React.useContext(AuthContext) as authProp;

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
    if (input?.password !== input?.confirmpassword) {
      setError({ ...error, ["confirmpassword"]: 'Password Mismatch' });
      return false;
    }
    dispatch(signUpAsync(input));
    setInput({
      firstName: "",
      lastName: "",
      confirmpassword: "",
      password: "",
      email: "",
      phone: "",
      gender: ""
    })

  }
  const onChange = (text: string, key: string) => {
    setInput({ ...input, [key]: text })
    if (error[key as keyof Input].length) {
      setError({ ...error, [key]: "" })
    }
  }


  if (selector.loading) {
    return <Loading />
  }

  if (selector.isAuthenticate) {
    handleAuth(true);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        style={{ flex: 1 }}
        colors={["#f0ffff", "#f0ffff", "#ccffff", "#9AFEFF"]}
        start={{ x: 0.1, y: 0.1 }}
      >
        {selector.loading && <Loading />}
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.heading}>
                SignUp
              </Text>
              <View>
                <Text style={styles.text}>
                  Email
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => onChange(text, "email")}
                  value={input?.email}
                  placeholder="Email"
                />
                {error?.email && <Text style={{ color: "red" }}> {error?.email} </Text>}
              </View>
              <View>
                <Text style={styles.text}>
                  First Name
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => onChange(text, "firstName")}
                  value={input?.firstName}
                  placeholder="First Name"
                />
                {error?.firstName && <Text style={{ color: "red" }}> {error?.firstName} </Text>}
              </View>
              <View>
                <Text style={styles.text}>
                  Last Name
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => onChange(text, "lastName")}
                  value={input?.lastName}
                  placeholder="Last Name"
                />
                {error?.lastName && <Text style={{ color: "red" }}> {error?.lastName} </Text>}
              </View>
              <View>
                <Text style={styles.text}>
                  PhoneNumber
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => onChange(text, "phone")}
                  value={input?.phone}
                  placeholder="phonenumber"
                  keyboardType="numeric"
                />
                {error?.phone && <Text style={{ color: "red" }}> {error?.phone} </Text>}
              </View>
              <View>
                <Text style={styles.text}>
                  Gender
                </Text>
                <Dropdown
                  statusBarIsTranslucent={true}
                  placeholder="Select Gender"
                  style={[styles.dropdown]}
                  data={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'felame' },

                  ]}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  value={input.gender}
                  onChange={(item) => {
                    setInput({ ...input, ['gender']: item.value });
                  }}
                />
                {error?.gender && <Text style={{ color: "red" }}> {error?.gender} </Text>}
              </View>
              <View>
                <Text style={styles.text}>
                  Password
                </Text>
                <View style={styles.password}>
                  <TextInput
                    style={styles.input}
                    onChangeText={text => onChange(text, "password")}
                    value={input?.password}
                    placeholder="Password"
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
              </View>
              <View>
                <Text style={styles.text}>
                  Confrm Pasword
                </Text>
                <View style={styles.password}>
                  <TextInput
                    style={styles.input}
                    onChangeText={text => onChange(text, "confirmpassword")}
                    value={input?.confirmpassword}
                    placeholder="Confrm Pasword"
                    secureTextEntry={!showCmPwd}
                  />
                  <View style={styles.eyeicon}>
                    {showCmPwd ? <TouchableOpacity onPress={() => setShowcmPwd(false)}>
                      <Ionicons name="eye" size={20} />
                    </TouchableOpacity> : <TouchableOpacity onPress={() => setShowcmPwd(true)}>
                      <Ionicons name="eye-off" size={20} />
                    </TouchableOpacity>}
                  </View>
                </View>
                {error?.confirmpassword && <Text style={{ color: "red" }}> {error?.confirmpassword} </Text>}
              </View>
              <View style={styles.button}>
                <Button
                  onPress={onSubmit}
                  title="Submit"
                />
              </View>
            </View>
            <Text>Already have Account <Text style={{ color: 'blue' }} onPress={() => navigate.navigate('Login')}> Login</Text></Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

export default SignUpScreen;


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingTop: 10
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
  text: {
    color: 'black',
    fontSize: 10,
  },
  dropdown: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
  }
});