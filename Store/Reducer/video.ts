import { createSlice } from '@reduxjs/toolkit';
import { Video } from '../../Types/video';

interface VideoState {
  loading: boolean,
  error: string,
  videos: Video[],
  message: string
}

export const videoSlice = createSlice({
  name: 'video',
  initialState: {
    loading: false,
    error: '',
    videos: [{
        kind: "",
        etag: "",
        id: {
            kind: "",
            videoId: ""
        },
        snippet: {
            publishedAt: "",
            channelId: "",
            title: "",
            description: "",
            thumbnails: {
                default: {
                    url: "",
                    width: 120,
                    height: 90
                },
                medium: {
                    url: "",
                    width: 320,
                    height: 180
                },
                high: {
                    url: "",
                    width: 480,
                    height: 360
                }
            },
            channelTitle: "",
            liveBroadcastContent: "",
            publishTime: ""
        }
    }],
    message: '',
  },
  reducers: {
    getAllVideo: (state: VideoState, action) => {
      state.videos = action.payload.data,
      state.message = action.payload.message,
      state.loading = false,
      state.error = ''
    },
    loading: (state: VideoState, action) => {
      state.loading = action.payload
    },
    error: (state: VideoState, action) => {
      state.error = action.payload
    }
  },
})

export const { getAllVideo, error, loading } = videoSlice.actions 