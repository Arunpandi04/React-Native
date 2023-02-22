import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../Types/comment'
interface CommentState {
  loading: boolean,
  error: string,
  comment: Comment,
  comments: Comment[],
  message: string
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    loading: false,
    error: '',
    comments: [],
    comment: {
      name: '',
      body: '',
      post_id: 0,
      id: 0,
      email: ''
    },
    message: ''
  },
  reducers: {
    comment: (state: CommentState, action) => {
      state.comment = action.payload.data,
      state.message = action.payload.message,
      state.loading = false,
        state.error = ''
    },
    getAllcomment: (state: CommentState, action) => {
      state.comments = action.payload.data,
      state.message = action.payload.message,
      state.loading = false,
      state.error = ''
    },
    getcommentById: (state: CommentState, action) => {
      state.comment = action.payload.data,
      state.message = action.payload.message,
      state.loading = false,
      state.error = ''
    },
    loading: (state: CommentState, action) => {
      state.loading = action.payload
    },
    error: (state: CommentState, action) => {
      state.error = action.payload,
        state.comment = {
          name: '',
          body: '',
          post_id: 0,
          id: 0,
          email: ''
        }
    },
    deleteComment: (state: CommentState, action) => {
      state.comment = {
        name: '',
        body: '',
        post_id: 0,
        id: 0,
        email: ''
      },
    state.message = action.payload.message
  },
  },
})

export const { comment, getAllcomment, getcommentById, error, loading, deleteComment } = commentSlice.actions 