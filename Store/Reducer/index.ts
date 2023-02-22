import { combineReducers } from '@reduxjs/toolkit'
import {authSlice} from './auth';
import { postSlice } from './post';
import { commentSlice } from './comment'
import { videoSlice } from './video'

  const reducer = combineReducers({
    auth: authSlice.reducer,
    post: postSlice.reducer,
    comment: commentSlice.reducer,
    video: videoSlice.reducer
   });

  export default reducer