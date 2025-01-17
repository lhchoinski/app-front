import React from 'react';
import { IFormInputPhone } from './interfaces';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
import { extractNumbers } from '@/helpers/DataHelper';
import BaseFormInput from '@/components/Form/Bases/BaseFormInput';
import { useTranslation } from 'react-i18next';
import { formatPhone } from '@/helpers/FormatDataHelper/formatPhone';

const FormInputPhone = <T extends FieldValues>({
                                                   required,
                                                   disabled,
                                                   fieldPath,
                                                   onEventResultCallback,
                                                   loading,
                                                   info,
                                                   ...rest
                                               }: IFormInputPhone<T>) => {
    const { t } = useTranslation();
    const { register, setValue } = useFormContext<T>();

    const label = t('contact');

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value?.slice(0, 15);
        const onlyNumbers = extractNumbers(value)?.slice(0, 11);

        if (onlyNumbers && onEventResultCallback) {
            onEventResultCallback(onlyNumbers);
        }

        setValue(fieldPath, formatPhone(value) as PathValue<T, Path<T>>, {
            shouldValidate: true,
        });
    };

    return (
        <BaseFormInput<T>
            label={label}
            fieldPath={fieldPath}
            required={required}
            loading={loading}
            info={info}
        >
            <input
                {...rest}
                className={`form-input placeholder:text-white-dark ${disabled || loading ? ' disabled:bg-[#eee]' : ''}`}
                id={label}
                type="text"
                disabled={disabled || loading}
                placeholder={label}
                {...register(fieldPath, {
                    onChange,
                })}
            />
        </BaseFormInput>
    );
};

export default FormInputPhone;
