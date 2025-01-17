import { FieldValues, Path } from 'react-hook-form';
import React, { InputHTMLAttributes } from 'react';

export interface IFormInputTextProps<T extends FieldValues>
    extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    required?: boolean;
    placeholder?: string;
    maxLength?: number;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fieldPath: Path<T>;
    loading?: boolean;
    info?: string;
    rows?: number;
    icon?: string;
}
