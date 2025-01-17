import { FieldErrors, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { ReactNode } from 'react';

export interface ICoreTab {
    name: string;
    icon: string;
    visible?: boolean;
    content: (tabIndex: number) => ReactNode;
}

export interface ICoreFormTab<T extends FieldValues> {
    name: string;
    icon: string;
    visible?: boolean;
    content: (tabIndex: number) => ReactNode;
    ref?: Path<T>;
    errors?: FieldErrors<T>;
}

export interface ICoreFormTabsProps<T extends FieldValues> {
    formMethods: UseFormReturn<T>;
    tabs: ICoreFormTab<T>[];
    nonFormTabs?: ICoreTab[];
    onSubmit: (data: T, reset: () => void) => void;
    genericError?: string;
    hideSubmitButton?: boolean;
}
