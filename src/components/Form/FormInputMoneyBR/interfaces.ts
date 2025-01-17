import { FieldValues, Path } from 'react-hook-form';
import { Dispatch, InputHTMLAttributes, SetStateAction } from 'react';

export interface IFormInputMoney<T extends FieldValues>
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    placeholder: string;
    required?: boolean;
    disabled?: boolean;
    fieldPath: Path<T>;
    onEventResultCallback?: (value: string | null) => void;
    loading?: boolean;
    setLoading?: Dispatch<SetStateAction<boolean>>;
    info?: string;
}
