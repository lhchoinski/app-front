import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { IGenericRequest } from '@/types/IGeneric';
import { CoreClient } from './ApiService';
import {
    IPaginationResponse,
    IPaginationSimpleRequest,
} from '@/types/components/IPagination';
import { ISelect2Options } from '@/types/ISelect2';

export const findPaginationGet = <T>(
    route: string,
    req: IPaginationSimpleRequest,
): AxiosPromise<IPaginationResponse<T>> => {
    return CoreClient.get(`/${route}`, {
        params: req,
    });
};

export const findPaginationPost = <T>(
    route: string,
    req: IPaginationSimpleRequest,
): AxiosPromise<IPaginationResponse<T>> => {
    return CoreClient.post(`/${route}`, req);
};

export const findById = <T>(
    route: string,
    id: number | string,
): AxiosPromise<T> => {
    return CoreClient.get(`/${route}/${id}`);
};

export const save = <T extends IGenericRequest, R>(
    route: string,
    data: T,
): AxiosPromise<R> => {
    if (data.id) {
        return CoreClient.put(`/${route}/${data.id}`, data);
    }

    return CoreClient.post(`/${route}`, data);
};

export const deleteData = (
    route: string,
    id: number | string,
): AxiosPromise<void> => {
    return CoreClient.delete(`/${route}/${id}`);
};

export const enableData = (
    route: string,
    id: number | string,
): AxiosPromise<void> => {
    return CoreClient.put(`/${route}/${id}/ativar`);
};

export const disableData = (
    route: string,
    id: number | string,
): AxiosPromise<void> => {
    return CoreClient.put(`/${route}/${id}/desativar`);
};

export const findSelect2 = async <T, L>(
    route: string,
    search?: string | null,
): Promise<ISelect2Options<T, L>[]> => {
    const response = await CoreClient.get(`/${route}/select2`, {
        params: {
            search: search,
        },
    });

    return response.data;
};

export const getRequest = <T>(
    route: string,
    config?: AxiosRequestConfig<unknown>,
): AxiosPromise<T> => {
    return CoreClient.get(`/${route}`, config);
};

export const postRequest = <T>(
    route: string,
    data?: object,
    config?: AxiosRequestConfig<unknown>,
): AxiosPromise<T> => {
    return CoreClient.post(`/${route}`, data, config);
};

export const putRequest = <T>(
    route: string,
    id: string | number,
    data?: T,
    config?: AxiosRequestConfig<unknown>,
): AxiosPromise<T> => {
    return CoreClient.put(`/${route}/${id}`, data, config);
};

export const deleteRequest = <T>(
    route: string,
    config?: AxiosRequestConfig<unknown>,
): AxiosPromise<T> => {
    return CoreClient.delete(`/${route}`, config);
};

export const downloadFile = async (route: string, finalFileName: string) => {
    const response = await CoreClient({
        url: route,
        method: 'GET',
        responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement('a');
    link.href = url;

    link.setAttribute('download', finalFileName);

    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
};

export const getPdfFile = <T>(
    route: string,
    config?: AxiosRequestConfig<unknown>,
): AxiosPromise<T> => {
    const requestConfig: AxiosRequestConfig = {
        ...config,
        responseType: 'blob',
    };

    return CoreClient.get(`/${route}`, requestConfig);
};
