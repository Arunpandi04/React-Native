import { AppDispatch } from '../store';
import { comment, getAllcomment, getcommentById, error, loading, deleteComment } from '../Reducer/comment'
import { Comment } from '../../Types/comment';
import axiosInstance from '../../Utils/axiosInstance';

export const commentAsync = (data: Comment) =>  async(dispatch: AppDispatch) => {
    dispatch(loading(true));
    await axiosInstance.post('/api/comment', data).then(res => {
      dispatch(loading(false));
      dispatch(comment({data: res.data.data, message: res.data?.message}));
    }).catch(err => {
      dispatch(loading(false));
      dispatch(error(err?.response?.data?.message || 'internal server error'));
    })
  };


export const getAllcommentAsync = () =>  async(dispatch: AppDispatch) => {
    dispatch(loading(true));
    await axiosInstance.get('/api/comment').then(res => {
      dispatch(loading(false));
      dispatch(getAllcomment({data: res.data.data, message: res.data?.message}));
    }).catch(err => {
      dispatch(loading(false));
      dispatch(error(err?.response?.data?.message || 'internal server error'));
    })
  };


  export const getcommentByIdAsync = (id: string) =>  async(dispatch: AppDispatch) => {
    dispatch(loading(true));
    await axiosInstance.get(`/api/comment/${id}`).then(res => {
      dispatch(loading(false));
      dispatch(getcommentById({data: res.data.data, message: res.data?.message}));
    }).catch(err => {
      dispatch(loading(false));
      dispatch(error(err?.response?.data?.message || 'internal server error'));
    })
  };


  export const putCommentAsync = (data: Comment) =>  async(dispatch: AppDispatch) => {
    dispatch(loading(true));
    await axiosInstance.put(`/api/comment/${data.id}`).then(res => {
      dispatch(loading(false));
      dispatch(comment({data: res.data.data, message: res.data?.message}));
    }).catch(err => {
      dispatch(loading(false));
      dispatch(error(err?.response?.data?.message || 'internal server error'));
    })
  };


  export const deleteCommentAsync = (id: number) =>  async(dispatch: AppDispatch) => {
    dispatch(loading(true));
    console.log("id====>",id)
      await axiosInstance.delete(`/api/comment/${id}`).then(res => {
      dispatch(loading(false));
      dispatch(deleteComment({message: res.data?.message}));
    }).catch(err => {
      dispatch(loading(false));
      dispatch(error(err?.response?.data?.message || 'internal server error'));
    })
  };