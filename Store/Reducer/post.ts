import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../Types/post'
interface PostState {
  loading: boolean,
  error: string,
  post: Post,
  posts: Post[],
  message: string
}

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    loading: false,
    error: '',
    posts: [],
    message: '',
    post: {
      title: '',
      body: '',
      user_id: 0,
      id: 0
    },
  },
  reducers: {
    post: (state: PostState, action) => {
      state.post = action.payload.data
      state.loading = false,
      state.error = ''
      state.message = action.payload.message
    },
    getAllPost: (state: PostState, action) => {
      state.posts = action.payload.data,
      state.message = action.payload.message,
      state.loading = false,
      state.error = ''
    },
    getPostById: (state: PostState, action) => {
      state.post = action.payload.data,
      state.message = action.payload.message
      state.loading = false,
        state.error = ''
    },
    loading: (state: PostState, action) => {
      state.loading = action.payload
    },
    error: (state: PostState, action) => {
      state.error = action.payload,
        state.post = {
          title: '',
          body: '',
          user_id: 0,
          id: 0
        }
    },
    deletePost: (state: PostState, action) => {
        state.post = {
          title: '',
          body: '',
          user_id: 0,
          id: 0
        },
      state.message = action.payload.message
    },
  },
})

export const { post, getAllPost, getPostById, error, loading, deletePost } = postSlice.actions 