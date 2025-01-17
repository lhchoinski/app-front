export interface IUser {
    id: string | null;
    nome: string,
    password: string,
    login: string,
    email: string,
    role: string
}

export interface IAuthenticatedUser {
    nome: string,
    email: string,


}


