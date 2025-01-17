import { MouseEventHandler } from 'react';

export interface ISimpleButtonProps {
    text: string;
    icon?: string;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    onClick?: MouseEventHandler<any> | undefined;
}
