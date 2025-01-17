import { Dispatch, SetStateAction } from 'react';
import { IReciboForm } from '@/pages/Recibos/interfaces';

export interface IRecibosCadastrarForm {
    initialValues: IReciboForm;
    setInitialValues: Dispatch<SetStateAction<IReciboForm>>;
}
