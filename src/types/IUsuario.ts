export interface IUsuarioResponse {
    id: string | null | undefined ,
    nome: string,
    login: string,
    email: string,
    password: string,
    role: string,
    status: boolean | null | undefined,
}

export interface IUsuarioRequest {
    id: string,
    nome: string,
    login: string,
    password: string,
    email: string,
    role: string,
    status: boolean,
}

export interface IUsuarioForm {
    usuario: {
        id?: string | null ,
        nome: string,
        login: string,
        password: string,
        confirmPassword: string,
        email: string,
        role: string,
        status?: boolean | null | undefined,
    }
}
