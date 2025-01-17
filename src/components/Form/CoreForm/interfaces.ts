import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ReactNode } from 'react';

export interface ICoreFormProps<T extends FieldValues> {
    onSubmit: (data: T, reset: () => void) => void;
    genericError?: string;
    children: ReactNode;
    hideSubmitButton?: boolean;
    formMethods: UseFormReturn<T>;
}
