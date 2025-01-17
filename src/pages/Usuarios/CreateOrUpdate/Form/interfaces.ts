import { Dispatch, SetStateAction } from 'react';
import { IUsuarioForm } from '@/types/IUsuario';

export interface IUsuariosCadastrarForm {
    viewMode: boolean;
    initialValues: IUsuarioForm;
    setInitialValues: Dispatch<SetStateAction<IUsuarioForm>>;
}
