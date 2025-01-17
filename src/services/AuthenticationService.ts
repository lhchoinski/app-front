import { IJwtResponse, ILoginRequest } from '../types/IAuthentication';
import { AxiosPromise } from 'axios';

import { removeTokens, setAccessToken, setRefreshToken } from './SessionService';
import { AuthClient } from './ApiService';

export const login = async (data: ILoginRequest): Promise<IJwtResponse> => {
    const response = await AuthClient.post<IJwtResponse>('/login', data);

    const { accessToken, refreshToken } = response.data;
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    return response.data;
};

export const logout = (): void => {
    removeTokens();
    window.location.href = '/auth/login';
};

export const refreshToken = (): AxiosPromise<IJwtResponse> => {
    return AuthClient.post("/refresh-token");
}
