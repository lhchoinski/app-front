import { Dispatch, SetStateAction } from 'react';
import { IImpostoForm } from '@/types/IImposto';

export interface IImpostoCadastrarForm {
    viewMode: boolean;
    initialValues: IImpostoForm;
    setInitialValues: Dispatch<SetStateAction<IImpostoForm>>;
}
