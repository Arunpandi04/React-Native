import { AppDispatch } from '../store';
import { post, getAllPost, getPostById, error, loading, deletePost } from '../Reducer/post'
import { Post } from '../../Types/post';
import axiosInstance from '../../Utils/axiosInstance';

export const postAsync = (data: Post) =>  async(dispatch: AppDispatch) => {
    dispatch(loading(true));
    await axiosInstance.post('/api/post', data).then(res => {
      dispatch(loading(false));
      dispatch(post({data: res.data.data, message: res.data?.message}));
    }).catch(err => {
      dispatch(loading(false));
      dispatch(error(err?.response?.data?.message || 'internal server error'));
    })
  };


export const getAllPostAsync = () =>  async(dispatch: AppDispatch) => {
    dispatch(loading(true));
    await axiosInstance.get('/api/post').then(res => {
      dispatch(loading(false));
      dispatch(getAllPost({data: res.data.data, message: res.data?.message}));
    }).catch(err => {
      dispatch(loading(false));
      dispatch(error(err?.response?.data?.message || 'internal server error'));
    })
  };


  export const getPostByIdAsync = (id: string) =>  async(dispatch: AppDispatch) => {
    dispatch(loading(true));
    await axiosInstance.get(`/api/post/${id}`).then(res => {
      dispatch(loading(false));
      dispatch(getPostById({data: res.data.data, message: res.data?.message}));
    }).catch(err => {
      dispatch(loading(false));
      dispatch(error(err?.response?.data?.message || 'internal server error'));
    })
  };


  export const putPostAsync = (data: Post) =>  async(dispatch: AppDispatch) => {
    dispatch(loading(true));
      await axiosInstance.put(`/api/post/${data.id}`,data).then(res => {
      dispatch(loading(false));
      dispatch(post({data: res.data.data, message: res.data?.message}));
    }).catch(err => {
      dispatch(loading(false));
      dispatch(error(err?.response?.data?.message || 'internal server error'));
    })
  };


  export const deletePostAsync = (id: number) =>  async(dispatch: AppDispatch) => {
    dispatch(loading(true));
    console.log("id====>",id)
      await axiosInstance.delete(`/api/post/${id}`).then(res => {
      dispatch(loading(false));
      dispatch(deletePost({message: res.data?.message}));
    }).catch(err => {
      dispatch(loading(false));
      dispatch(error(err?.response?.data?.message || 'internal server error'));
    })
  };