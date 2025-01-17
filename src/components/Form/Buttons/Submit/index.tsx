import React from 'react';
import { useTranslation } from 'react-i18next';
import { ISubmitProps } from './interfaces';
import { DynamicIcons } from '../../../DynamicIcons';

const SubmitButton = ({
                          loading,
                          className,
                          disabled,
                          text,
                          icon = 'IoSaveOutline',
                      }: ISubmitProps) => {
    const { t } = useTranslation();

    return (
        <button
            type="submit"
            className={`btn btn-primary ${className}`}
            disabled={loading || disabled}
        >
            {loading ? (
                <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle" />
            ) : (
                ''
            )}

            <DynamicIcons name={icon} className="mr-2 w-4 h-5" />
            {text ? text : t('button.save')}
        </button>
    );
};

export default SubmitButton;
