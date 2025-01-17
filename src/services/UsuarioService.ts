import axios, { AxiosPromise } from 'axios';
import { IUser } from '@/types/IUser';
import { CoreClient } from './ApiService';

export const SUserFindAuthenticated = (): AxiosPromise<IUser> => {
    return axios.get('http://localhost:10005/api/auth/logado');
}

export const SUserFindById = (id: number): AxiosPromise<IUser> => {
    return CoreClient.get(`/usuario/${id}`);
}

export const SUserLdapFindByRg = (rg: String): AxiosPromise<IUser> => {
    return CoreClient.get(`/usuario/ldap/${rg}`);
}
