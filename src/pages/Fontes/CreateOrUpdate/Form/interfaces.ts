import { Dispatch, SetStateAction } from 'react';
import { IFonteForm } from '@/types/IFonte';

export interface IFontesCadastrarForm {
    viewMode: boolean;
    initialValues: IFonteForm;
    setInitialValues: Dispatch<SetStateAction<IFonteForm>>;
}
