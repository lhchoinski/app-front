import { IUsuarioForm, IUsuarioRequest, IUsuarioResponse } from '@/types/IUsuario';

export const defaultValues = (id: string | null): IUsuarioForm => {
    return {
        usuario: {
            id: id,
            nome: '',
            login: '',
            email: '',
            role: '',
            password: '',
            confirmPassword: '',
            status: null
        }
    };
};

export const usuarioResponseToForm = (data: IUsuarioResponse): IUsuarioForm => {
    return {
        usuario: {
            id: data.id,
            nome: data.nome,
            login: data.login,
            email: data.email,
            role: data.role,
            password: data.password,
            confirmPassword: '',
            status: data.status
        }
    };
};

export const usuarioFormToRequest = (data: IUsuarioForm): IUsuarioRequest => {
    return {
        id: data.usuario.id as string,
        nome: data.usuario.nome,
        login: data.usuario.login,
        email: data.usuario.email,
        role: data.usuario.role,
        password: data.usuario.password,
        status: data.usuario.status as boolean
    };
};
