import axios from 'axios';
import { navigate } from '../Navigation/RootNavigation';

import { getAsyncStorage, setAsyncStorage } from '../Utils/storageUtils';
const Base_URL = "https://node-api-h5bq.onrender.com";

// axios instance for making requests 
const axiosInstance = axios.create({
    baseURL: Base_URL,
    headers: {'Content-Type': 'application/json'}
  })

axiosInstance.interceptors.request.use(
    async(config) => {
        const token = await getAsyncStorage('accessToken');
        if (token) {
            config.headers["authorization"] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && err.response.data.message === "Unauthorized Access Token inValid" && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const refreshToken = await getAsyncStorage('refreshToken')
                      // Set new Access Token was expired
                    const rs = await axiosInstance.post('/api/refresh-token', {
                        token: refreshToken
                    });
                    const { token } = rs.data;
                    await setAsyncStorage("accessToken", token);
                    return axiosInstance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
                 // Refresh Token was expired
            } else if (err.response.status === 401 && err.response.data.message === "Unauthorized Refresh Token inValid") {
                await setAsyncStorage("accessToken", '');
                await setAsyncStorage("refreshToken", '');
                await setAsyncStorage("isAuth", '');
                await setAsyncStorage('userId', '');
                navigate('Logout');
            }
        }
        return Promise.reject(err);
    }
);

export default axiosInstance;