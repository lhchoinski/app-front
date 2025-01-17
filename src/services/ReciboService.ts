import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { CoreClient } from '@/services/ApiService';

export const gerarRecibo = <T>(
    route: string,
    data?: object,
    config?: AxiosRequestConfig<unknown>,
): AxiosPromise<T> => {
    const requestConfig: AxiosRequestConfig = {
        ...config,
        responseType: 'blob',
    };

    return CoreClient.post(`/${route}`, data, requestConfig);
};
