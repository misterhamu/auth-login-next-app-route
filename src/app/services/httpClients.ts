// @ts-nocheck
import axios, { AxiosError, AxiosResponse } from 'axios';

const baseUrl = process.env.baseUrl;

let isRefreshing: boolean = false;
let refreshPromise: Promise<void> | null = null;

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

// interceptors request
instance.interceptors.request.use((config) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('authenToken');

    config.headers['Authorization'] = 'Bearer ' + token;
    const refreshToken = localStorage.getItem('refreshToken');

    if (token) {
      const parsedToken = jwt.parseJwt(token);
      const expiredTime: Date = new Date(parsedToken.exp * 1000);

      let currentTime: Date = new Date();
      if (currentTime > expiredTime) {
        if (!isRefreshing) {
          isRefreshing = true;
          RefreshToken({
            type: 'refresh_token',
            value: refreshToken || '',
          })
            .then((res) => {
              localStorage.setItem('authenToken', res.id_token);
              isRefreshing = false;
              resolve(config);
            })
            .catch((error) => {
              isRefreshing = false;
              console.error(error);
              resolve(config);
            });
        } else {
          resolve(config);
        }
      }
    }

    resolve(config);
  });
});

// interceptors response
instance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    return Promise.reject(error.response);
  }
);

export default instance;
