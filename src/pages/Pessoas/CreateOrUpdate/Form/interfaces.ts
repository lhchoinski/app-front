import { Dispatch, SetStateAction } from 'react';
import { IPessoaForm } from '@/types/IPessoa';

export interface IPessoasCadastrarForm {
    viewMode: boolean;
    initialValues: IPessoaForm;
    setInitialValues: Dispatch<SetStateAction<IPessoaForm>>;
}
