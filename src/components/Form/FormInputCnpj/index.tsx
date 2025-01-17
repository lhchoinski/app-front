import React from 'react';
import { IFormInputCnpj } from './interfaces';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
import { extractNumbers } from '@/helpers/DataHelper';
import { formatCnpj } from '@/helpers/FormatDataHelper';
import BaseFormInput from '@/components/Form/Bases/BaseFormInput';
import { useTranslation } from 'react-i18next';

const FormInputCnpj = <T extends FieldValues>({
    required,
    disabled,
    fieldPath,
    onEventResultCallback,
    loading,
    info,
    ...rest
}: IFormInputCnpj<T>) => {
    const { register, setValue } = useFormContext<T>();

    const { t } = useTranslation();

    const label = t('cnpj');

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const onlyNumbers = extractNumbers(value);

        if (onlyNumbers && onlyNumbers.length === 11 && onEventResultCallback) {
            onEventResultCallback(onlyNumbers);
        }

        setValue(fieldPath, formatCnpj(value) as PathValue<T, Path<T>>, {
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
                maxLength={20}
                disabled={disabled || loading}
                placeholder={label}
                {...register(fieldPath, {
                    onChange,
                })}
            />
        </BaseFormInput>
    );
};

export default FormInputCnpj;
