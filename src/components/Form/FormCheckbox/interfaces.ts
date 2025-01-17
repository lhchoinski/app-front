import React from 'react';
import { FieldValues, Path } from 'react-hook-form';

export interface IFormCheckboxProps<T extends FieldValues> {
    fieldPath: Path<T>;
    label: string;
    info?: string;
    required?: boolean;
    disabled?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
