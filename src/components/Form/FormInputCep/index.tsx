import React from 'react';
import { IFormInputCep } from './interfaces';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
import { formatCep } from '@/helpers/FormatDataHelper';
import BaseFormInput from '@/components/Form/Bases/BaseFormInput';
import { useTranslation } from 'react-i18next';

const FormInputCep = <T extends FieldValues>({
    required,
    disabled,
    fieldPath,
    onEventResultCallback,
    loading,
    setLoading,
    info,
    ...rest
}: IFormInputCep<T>) => {
    const { register, setValue } = useFormContext<T>();

    const { t } = useTranslation();

    const label = t('cep');

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setValue(fieldPath, formatCep(value) as PathValue<T, Path<T>>, {
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

export default FormInputCep;
