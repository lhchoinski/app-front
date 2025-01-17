import React from 'react';
import { IFormInputProps } from './interfaces';
import { FieldValues, useFormContext } from 'react-hook-form';
import BaseFormInput from '@/components/Form/Bases/BaseFormInput';
import { DynamicIcons } from '@/components/DynamicIcons';

const FormInput = <T extends FieldValues>({
                                              label,
                                              type = 'text',
                                              required,
                                              placeholder,
                                              maxLength,
                                              disabled,
                                              onChange,
                                              fieldPath,
                                              loading = false,
                                              info,
                                              icon,
                                              ...rest
                                          }: IFormInputProps<T>) => {
    const { register } = useFormContext<T>();

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
                className={`
                    form-input placeholder:text-white-dark
                    ${disabled || loading ? ' disabled:bg-[#eee]' : ''}
                    ${icon ? 'ps-10' : ''}
                `}
                id={label}
                type={type}
                maxLength={maxLength}
                disabled={disabled || loading}
                placeholder={placeholder}
                {...register(fieldPath, {
                    onChange: onChange ? e => onChange(e) : undefined,
                })}
            />

            {icon ? (
                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                    <DynamicIcons name={icon} />
                </span>
            ) : (
                ''
            )}
        </BaseFormInput>
    );
};

export default FormInput;
