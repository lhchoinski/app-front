import { FieldValues, FormProvider } from 'react-hook-form';
import React from 'react';

import { useTranslation } from 'react-i18next';
import { IFormProps } from './interfaces';
import SubmitButton from '../Buttons/Submit';

const FormComponent = <T extends FieldValues>({
                                             onSubmit,
                                             genericError,
                                             children,
                                             hideSubmitButton = false,
                                             formMethods,
                                         }: IFormProps<T>): JSX.Element => {
    const { t } = useTranslation();

    const {
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = formMethods;

    return (
        <FormProvider {...formMethods}>
            <form
                onSubmit={handleSubmit(data => onSubmit(data, reset))}
                className="space-y-5"
            >
                {children}

                <div className="mt-5">
                    {genericError && (
                        <div className="flex items-center p-3.5 rounded text-warning bg-warning-light dark:bg-warning-dark-light">
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">
                                    {t('attention')}!
                                </strong>
                                {genericError}
                            </span>
                        </div>
                    )}

                    {!hideSubmitButton ? (
                        <div className="flex justify-end">
                            <SubmitButton loading={isSubmitting} />
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </form>
        </FormProvider>
    );
};

export default FormComponent;
