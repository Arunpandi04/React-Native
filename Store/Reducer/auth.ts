import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../Types/user'
interface AuthState {
  loading: boolean,
  error: string,
  user: User | object,
  isAuthenticate: boolean
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: '',
    user: {
      userId: 0,
      gender: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: 0,
      password: '',
      createdAt: '',
      updatedAt: '',
      _id: 0,
      __v: 0
    },
    isAuthenticate: false
  },
  reducers: {
    signIn: (state: AuthState, action) => {
        state.user = action.payload
        state.loading = false,
        state.isAuthenticate = true,
        state.error = ''
    },
    getUserById: (state: AuthState, action) => {
      state.user = action.payload
      state.loading = false
  },
    signUp: (state: AuthState, action) => {
      state.user = action.payload
      state.loading = false,
        state.isAuthenticate = true,
        state.error = ''
    },
    loading: (state: AuthState, action) => {
      state.loading = action.payload
    },
    error: (state: AuthState, action) => {
      state.error = action.payload,
        state.user = {},
        state.isAuthenticate = false
    },
    logout: (state: AuthState) => {
      state.error = '',
        state.user = {},
        state.isAuthenticate = false,
        state.loading = false
    }
  },
})

export const { signIn, signUp, loading, error, logout, getUserById } = authSlice.actions 