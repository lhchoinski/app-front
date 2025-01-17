import React from 'react';
import { Box, Text, Tooltip } from '@mantine/core';
import { LuInfo } from 'react-icons/lu';
import { IFormRadioButtonProps } from './interfaces';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
import { getErrorMessage } from '@/helpers/HookFormHelper';

const FormRadioButton = <
    T extends FieldValues,
    TypeValue extends string | number | readonly string[] | undefined | boolean,
>({
      fieldPath,
      label,
      options,
      required = false,
      disabled = false,
      info,
      onChangeCallback,
  }: IFormRadioButtonProps<T, TypeValue>) => {
    const {
        formState: { errors },
        register,
        setValue,
        watch,
    } = useFormContext<T>();

    const selectedValue = watch(fieldPath);

    const handleChange = (value: TypeValue | null) => {
        setValue(fieldPath, value as PathValue<T, Path<T>>, {
            shouldValidate: true,
        });

        if (onChangeCallback) {
            // @ts-ignore
            onChangeCallback(value);
        }
    };

    const getValue = (value: TypeValue | null): string => {
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }

        if (typeof value === 'boolean') {
            return value ? 'true' : 'false';
        }

        return value as string;
    };

    return (
        <div
            className={
                errors && getErrorMessage(errors, fieldPath) !== undefined
                    ? 'has-error'
                    : ''
            }
        >
            <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Text
                    className="text-sm font-semibold h-7 leading-6"
                    component="label"
                    htmlFor={fieldPath}
                >
                    {label}
                </Text>

                {required && (
                    <Text c="red" style={{ cursor: 'default' }}>
                        *
                    </Text>
                )}

                {info && (
                    <Tooltip label={info} withArrow>
                        <Text
                            style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <LuInfo className="text-primary" />
                        </Text>
                    </Tooltip>
                )}
            </Box>

            <div className="mt-2">
                {options.map((option, index) => (
                    <label
                        key={index}
                        className="inline-flex items-center mr-4"
                    >
                        <input
                            type="radio"
                            {...register(fieldPath)}
                            value={getValue(option.value)}
                            checked={
                                getValue(selectedValue) ===
                                getValue(option.value)
                            }
                            onChange={() => handleChange(option.value)}
                            className={`form-radio ${
                                errors[fieldPath] ? 'border border-red-500' : ''
                            } ${option.className || ''}`}
                            name={label}
                            disabled={disabled}
                        />
                        <span className="ml-2">{option.label}</span>
                    </label>
                ))}
            </div>

            {errors && getErrorMessage(errors, fieldPath) && (
                <div className="text-danger mt-1">
                    {getErrorMessage(errors, fieldPath)}
                </div>
            )}
        </div>
    );
};

export default FormRadioButton;
