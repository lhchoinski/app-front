import React from 'react';
import { IFormInputMoney } from './interfaces';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
import { formatMoneyBR } from '@/helpers/FormatDataHelper';
import BaseFormInput from '@/components/Form/Bases/BaseFormInput';

const FormInputMoneyBR = <T extends FieldValues>({
    label,
    placeholder,
    required,
    disabled,
    fieldPath,
    onEventResultCallback,
    loading,
    info,
    ...rest
}: IFormInputMoney<T>) => {
    const { register, setValue } = useFormContext<T>();

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const formattedValue = formatMoneyBR(value);

        if (onEventResultCallback) {
            onEventResultCallback(formattedValue);
        }

        setValue(fieldPath, formattedValue as PathValue<T, Path<T>>, {
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
                placeholder={placeholder}
                {...register(fieldPath, {
                    onChange,
                })}
            />
        </BaseFormInput>
    );
};

export default FormInputMoneyBR;
