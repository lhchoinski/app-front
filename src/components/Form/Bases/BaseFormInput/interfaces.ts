import { FieldValues, Path } from 'react-hook-form';
import React from 'react';

export interface IBaseFormInputProps<T extends FieldValues> {
    label?: string;
    fieldPath: Path<T>;
    required?: boolean;
    loading?: boolean;
    info?: string;
    children: React.ReactNode;
}
