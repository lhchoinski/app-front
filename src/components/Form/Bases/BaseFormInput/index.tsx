import React from 'react';
import { Box, Text, Tooltip } from '@mantine/core';
import { FieldValues, useFormContext } from 'react-hook-form';
import { getErrorMessage } from '@/helpers/HookFormHelper';
import SimpleLoader from '@/assets/simpleLoader';
import { DynamicIcons } from '@/components/DynamicIcons';
import { IBaseFormInputProps } from '@/components/Form/Bases/BaseFormInput/interfaces';

const BaseFormInput = <T extends FieldValues>({
                                                  label,
                                                  fieldPath,
                                                  required,
                                                  loading = false,
                                                  info,
                                                  children,
                                              }: IBaseFormInputProps<T>) => {
    const {
        formState: { errors },
    } = useFormContext<T>();

    return (
        <div>
            <div
                className={
                    errors && getErrorMessage(errors, fieldPath) !== undefined
                        ? 'has-error'
                        : ''
                }
            >
                {label ? (
                    <Box
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
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
                            <Tooltip label={info} withArrow className="mb-1">
                                <Text
                                    style={{
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <DynamicIcons
                                        name="LuInfo"
                                        className="text-primary"
                                    />
                                </Text>
                            </Tooltip>
                        )}
                    </Box>
                ) : (
                    ''
                )}

                <div className="relative text-white-dark">
                    {children}
                    {loading && (
                        <span className="absolute end-4 top-1/2 -translate-y-1/2">
                            <SimpleLoader size={4} />
                        </span>
                    )}
                </div>
            </div>

            {errors && getErrorMessage(errors, fieldPath) && (
                <div className="text-danger mt-1">
                    {getErrorMessage(errors, fieldPath)}
                </div>
            )}
        </div>
    );
};

export default BaseFormInput;
