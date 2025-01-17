import React from 'react';
import { Box, Text, Tooltip } from '@mantine/core';
import { LuInfo } from 'react-icons/lu';
import { IFormCheckboxProps } from './interfaces';
import { FieldValues, useFormContext } from 'react-hook-form';
import { getErrorMessage } from '@/helpers/FormHelper';

const FormCheckbox = <T extends FieldValues>({
    fieldPath,
    label,
    disabled,
    info,
    required = false,
    onChange,
}: IFormCheckboxProps<T>) => {
    const {
        formState: { errors },
        register,
    } = useFormContext<T>();
    return (
        <div
            className={
                errors && getErrorMessage(errors, fieldPath) !== undefined
                    ? 'has-error'
                    : ''
            }
        >
            <div className="flex items-center mt-2">
                <input
                    type="checkbox"
                    disabled={disabled}
                    id={fieldPath}
                    {...register(fieldPath, {
                        onChange: onChange ? e => onChange(e) : undefined,
                    })}
                    className="form-checkbox"
                />
                <label htmlFor={fieldPath} className="ml-2 font-semibold">
                    <Box
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        {label}

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
                </label>
            </div>

            {errors && getErrorMessage(errors, fieldPath) && (
                <div className="text-danger mt-1">
                    {getErrorMessage(errors, fieldPath)}
                </div>
            )}
        </div>
    );
};

export default FormCheckbox;
