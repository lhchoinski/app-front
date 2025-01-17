import { IUser } from './IUser';

export interface ILoginRequest {
    login: string;
    password: string;
}

export interface IJwtResponse {
    accessToken: string;
    refreshToken: string;
    usuario: IUser;
}
