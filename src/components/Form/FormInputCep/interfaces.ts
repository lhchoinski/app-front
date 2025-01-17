import { FieldValues, Path } from 'react-hook-form';
import { Dispatch, InputHTMLAttributes, SetStateAction } from 'react';
import { IFindCep } from '@/types/IIntegrations';

export interface IFormInputCep<T extends FieldValues>
    extends InputHTMLAttributes<HTMLInputElement> {
    required?: boolean;
    disabled?: boolean;
    fieldPath: Path<T>;
    onEventResultCallback?: (cepData: IFindCep) => void;
    loading?: boolean;
    setLoading?: Dispatch<SetStateAction<boolean>>;
    info?: string;
}
