import axios, { AxiosRequestConfig, AxiosError } from 'axios';

// actions
import { setLoading } from 'state/app/appSlice';

export type IConfig = AxiosRequestConfig & {
  showSpinner?: boolean;
  headers?: {
    Authorization?: string;
  };
};

type IAxiosResponse = AxiosError & {
  config: {
    showSpinner?: boolean;
  };
};

const requestConfig: IConfig = {
  baseURL: process.env.REACT_APP_ENDPOINT_URL,
  showSpinner: false,
};

export const axiosInstance = axios.create(requestConfig);

export default function initRequest(store: any) {
  let requestCount = 0;

  function decreaseRequestCount() {
    requestCount -= 1;
    if (requestCount === 0) {
      store.dispatch(setLoading(false));
    }
  }

  axiosInstance.interceptors.request.use(
    (config: IConfig) => {
      if (config.showSpinner) {
        requestCount += 1;
        store.dispatch(setLoading(true));
      }

      // add x-auth-token
      const token: string =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkb3h1YW50aW5oLmZldEBnbWFpbC5jb20iLCJqdGkiOiIxZmZkZmQ0OS0zNzQwLTQ1NTktYTQzOS1kMTA1NGE5NzQ2MDIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImRmZDdjYmQ3LTFjMDEtNGM2NS04ZjIzLTY1MDcxYWM4NGJjNSIsIkNsYWltQWNjb3VudElkIjoiMSIsInNjb3BlIjoiSU5TVVJBTkNFIElkZW50aXkiLCJQZXJtaXNzaW9ucyI6IjE3Njk1MzYgMTc3MzU2OCAxNzcxNTIwIDE3NzA0OTYgMTc2OTk4NCAxNzY5NzI4IDE3Njk2MDAgNjU1MzcgNjU1MzggNjU1NDAgMTc3NzY2NCA2NTU0NCA2NTU2OCA2NTYwMCA2NTY2NCAxNzY5NDczIDE3Njk0NzQgMTc2OTQ3NiAxNzY5NDgwIDE3Njk0ODggMTc2OTUwNCA2NTU1MiAxNzg1ODU2IDEzMTA3MyAxMzEwNzQgMTMxMDc2IDI2MjE0NSAyNjIxNDYgMjYyMTQ4IDI2MjE1MiAyNjIxNjAgMjYyMTc2IDMyNzY4MSAzMjc2ODIgMzI3Njg0IDMyNzY4OCAzMjc2OTYgMzI3NzEyIDMyNzc0NCAzMjc4MDggMTMxMDgwIDM5MzIxNyAzOTMyMTggNjU3OTIgNDU4NzUzIDUyNDI4OSA1MjQyOTAgMjYyMjA4IDUyNDI5MiA1ODk4MjUgNjU1MzYxIDY2MDQ4IDEzMTA4OCAxNzY5NDczIDE3Njk0NzQgMTc2OTQ3NiAxNzY5NDgwIDE3Njk0ODggMTc2OTUwNCAxNzY5NTM2IDE3Njk2MDAgMTc2OTcyOCAxNzY5OTg0IDE3NzA0OTYgMTc3MTUyMCAxNzczNTY4IDE3Nzc2NjQgMTc4NTg1NiIsImV4cCI6MTY0MjQzNzMxNCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIn0.o8quE8p-irA7nhGV2kxB6GGCtssdy-2vVRWwCxXdR8U';
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: IAxiosResponse) => {
      if (error.config.showSpinner) {
        decreaseRequestCount();
      }
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (res: any) => {
      if (res.config.showSpinner) {
        decreaseRequestCount();
      }
      return res;
    },
    (error: IAxiosResponse) => {
      if ((error && error.config.showSpinner) || error.code === 'ECONNABORTED') {
        decreaseRequestCount();
      }

      // handle request timeout
      if (error.code === 'ECONNABORTED') {
        store.dispatch(setLoading(false));
      }

      // access token expired
      // if(error.response.status === 401 && error.config._retry) {
      //   error.config._retry = true;
      //   try {
      //     const result = await instance.post("/auth/refreshtoken", {
      //       refreshToken: 'xxx'
      //     });
      //     window.localStorage.setItem("accessToken", result.data.accessToken);
      //     instance.defaults.headers.common["x-access-token"] =  result.data.accessToken;

      //     return instance(error.config);
      //   } catch (err) {
      //     if (err.response && err.response.data) {
      //       return Promise.reject(err.response.data);
      //     }
      //     return Promise.reject(err);
      //   }
      // }

      // handle errors
      switch (error.response?.status) {
        case 400: {
          break;
        }
        case 500: {
          break;
        }
        default:
          break;
      }
      return Promise.reject(error);
    },
  );
}
