import { AppDispatch } from '../store';
import { signUp, signIn, loading, error, getUserById } from '../Reducer/auth'
import { setAsyncStorage } from '../../Utils/storageUtils'
import axiosInstance from '../../Utils/axiosInstance';
import { Input as Login } from '../../Types/Login';
import { Input } from '../../Types/Signup';

export const signUpAsync = (data: Input) =>  async(dispatch: AppDispatch) => {
    dispatch(loading(true));
    await axiosInstance.post('/api/create-user', data).then(async(res) => {
      await setAsyncStorage('accessToken', res.data?.accessToken)
      await setAsyncStorage('refreshToken', res.data?.refreshToken)
      await setAsyncStorage('isAuth', 'true')
      await setAsyncStorage('userId', JSON.stringify(res.data.user._id));
      dispatch(loading(false));
      dispatch(signUp(res.data.user));
    }).catch(err => {
      dispatch(loading(false));
      setAsyncStorage('isAuth', 'false')
      dispatch(error(err?.response?.data?.message || 'internal server error'));
    })
  };


export const signInAsync = (data: Login) =>  async(dispatch: AppDispatch) => {
    dispatch(loading(true));
    console.log("signInAsync")
    await axiosInstance.post('/api/login', data).then(async(res) => {
      console.log("login")
      await setAsyncStorage('accessToken', res.data?.accessToken)
      await setAsyncStorage('refreshToken', res.data?.refreshToken)
      await setAsyncStorage('isAuth', 'true')
      await setAsyncStorage('userId', JSON.stringify(res.data.user._id));
      dispatch(loading(false));
      dispatch(signIn(res.data.user));
    }).catch(err => {
     setAsyncStorage('isAuth', 'false')
      dispatch(loading(false));
      dispatch(error(err?.response?.data?.message || 'internal server error'));
    })
  };



  export const getUserAsync = (id: number) =>  async(dispatch: AppDispatch) => {
    dispatch(loading(true));
    await axiosInstance.get(`/api/get-user/${id}`).then(async(res) => {
      dispatch(loading(false));
      dispatch(getUserById(res.data.user));
    }).catch(err => {
      dispatch(loading(false));
      dispatch(error(err?.response?.data?.message || 'internal server error'));
    })
  };