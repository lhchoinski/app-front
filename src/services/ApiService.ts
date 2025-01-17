import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
    getAccessToken,
    getRefreshToken,
    removeTokens,
    setAccessToken,
    setRefreshToken,
} from './SessionService';

const AuthClient: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_AUTH_URI}`,
});

const CoreClient: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_URI}`,
});

const requestInterceptor: any = (
    config: AxiosRequestConfig,
): AxiosRequestConfig => {
    const accessToken = getAccessToken();
    if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
};

const responseInterceptor = async (
    response: AxiosResponse,
): Promise<AxiosResponse> => {
    return response;
};

// Error Interceptor
const errorInterceptor = async (error: any): Promise<any> => {
    const originalRequest = error.config;

    if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
    ) {
        originalRequest._retry = true;
        try {
            const refreshToken = getRefreshToken();

            if (refreshToken) {
                const response = await AuthClient.post('/refresh-token', {
                    refreshToken: refreshToken,
                });

                const { accessToken, refreshToken: newRefreshToken } =
                    response.data;

                setAccessToken(accessToken);
                setRefreshToken(newRefreshToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return axios(originalRequest);
            } else {
                removeTokens();
                window.location.href = '/auth/login';
            }
        } catch (_error) {
            removeTokens();
            window.location.href = '/auth/login';
            return Promise.reject(_error);
        }
    }

    return Promise.reject(error);
};

// CoreClient.interceptors.request.use(requestInterceptor, Promise.reject);
// CoreClient.interceptors.response.use(responseInterceptor, errorInterceptor);

// AuthClient.interceptors.request.use(requestInterceptor, Promise.reject);

export { AuthClient, CoreClient };
