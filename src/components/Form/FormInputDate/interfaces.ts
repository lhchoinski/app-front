import { FieldValues, Path } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

export interface IFormInputDateProps<T extends FieldValues>
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    maxLength?: number;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    onChangeCallback?: (value: string | null) => void;
    fieldPath: Path<T>;
    loading?: boolean;
    info?: string;
    finalFormatDate?: string;
}
