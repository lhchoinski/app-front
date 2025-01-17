import { FieldValues, Path } from 'react-hook-form';
import { Dispatch, InputHTMLAttributes, SetStateAction } from 'react';

export interface IFormInputPhone<T extends FieldValues>
    extends InputHTMLAttributes<HTMLInputElement> {
    required?: boolean;
    disabled?: boolean;
    fieldPath: Path<T>;
    onEventResultCallback?: (value: string) => void;
    loading?: boolean;
    setLoading?: Dispatch<SetStateAction<boolean>>;
    info?: string;
}
