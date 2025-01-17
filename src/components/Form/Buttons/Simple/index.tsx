import React from 'react';
import { ISimpleButtonProps } from './interfaces';
import { DynamicIcons } from '@/components/DynamicIcons';

const SimpleButton = ({
                          text,
                          icon,
                          disabled,
                          loading,
                          className = 'btn btn-primary',
                          onClick,
                      }: ISimpleButtonProps) => {
    return (
        <button
            type="button"
            className={className}
            disabled={loading || disabled}
            onClick={onClick}
        >
            {loading ? (
                <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle" />
            ) : (
                ''
            )}

            {icon ? <DynamicIcons name={icon} className="mr-2 w-4 h-5" /> : ''}

            {text}
        </button>
    );
};

export default SimpleButton;
