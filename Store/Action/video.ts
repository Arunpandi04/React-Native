import { AppDispatch } from '../store';
import { getAllVideo, error, loading } from '../Reducer/video'
import axiosInstance from '../../Utils/axiosInstance';



export const getAllVidoAsync = () =>  async(dispatch: AppDispatch) => {
    dispatch(loading(true));
    await axiosInstance.get(`/api/youtube`).then(res => {
      dispatch(loading(false));
      dispatch(getAllVideo({data: res.data.data, message: res.data?.message}));
    }).catch(err => {
      dispatch(loading(false));
      dispatch(error(err?.response?.data?.message || 'internal server error'));
    })
  };