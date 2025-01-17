import React, {
    DetailedHTMLProps,
    HTMLAttributes,
    useCallback,
    useState,
} from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Text, Tooltip } from '@mantine/core';
import { LuFile, LuInfo } from 'react-icons/lu';
import { IFormInputFileProps } from './interfaces';
import {
    Controller,
    useFormContext,
    FieldValues,
    PathValue,
    Path,
} from 'react-hook-form';
import { acceptedMimeTypes } from '@/components/Form/FormInputFile/helpers';

const FormInputFile = <T extends FieldValues>({
                                                  fieldPath,
                                                  label,
                                                  disabled = false,
                                                  info,
                                                  required = false,
                                                  accept = [],
                                                  multiple = false,
                                                  onDrop,
                                              }: IFormInputFileProps<T>) => {
    const {
        control,
        setValue,
        formState: { errors },
    } = useFormContext<T>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onDropAccepted = useCallback(
        (acceptedFiles: File[]) => {
            setValue(
                fieldPath,
                multiple
                    ? (acceptedFiles as PathValue<T, Path<T>>)
                    : (acceptedFiles[0] as PathValue<T, Path<T>>),
            );
            setErrorMessage(null);

            if (onDrop) {
                onDrop(acceptedFiles);
            }
        },
        [setValue, fieldPath, multiple, onDrop],
    );

    const onDropRejected = useCallback(() => {
        setErrorMessage(
            `Tipo de arquivo inválido. Tipos aceitos: ${accept.join(', ')}`,
        );
    }, [accept]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop: onDropAccepted,
        onDropRejected,
        accept: acceptedMimeTypes(accept),
        multiple,
        disabled,
    });

    const renderFilePreview = (file: File) => {
        const fileType = file.name.split('.').pop()?.toLowerCase();
        let icon;

        switch (fileType) {
            case 'pdf':
                icon = <LuFile className="text-red-500" />;
                break;
            case 'jpg':
            case 'png':
                icon = <LuFile className="text-blue-500" />;
                break;
            case 'docx':
                icon = <LuFile className="text-green-500" />;
                break;
            default:
                icon = <LuFile />;
        }

        return (
            <div key={file.name} className="flex items-center gap-2">
                {icon}
                <Text>{file.name}</Text>
            </div>
        );
    };

    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: errors[fieldPath] ? '#ff1744' : '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out',
    };

    const focusedStyle = { borderColor: '#2196f3' };
    const acceptStyle = { borderColor: '#3967f6' };
    const rejectStyle = { borderColor: '#ff1744' };

    const style: DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > = {
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
    };

    return (
        <Controller
            name={fieldPath}
            control={control}
            render={({ field }) => (
                <div>
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
                                    <LuInfo className="text-primary" />
                                </Text>
                            </Tooltip>
                        )}
                    </Box>

                    <div
                        {...getRootProps({
                            className: `dropzone ${isDragActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`,
                        })}
                        style={style}
                    >
                        <input {...getInputProps()} />
                        <p>
                            {multiple
                                ? 'Carregar Arquivos'
                                : 'Carregar Arquivo'}
                        </p>
                    </div>

                    <div className="mt-2">
                        {field.value && (
                            <div>
                                {multiple
                                    ? (field.value as File[]).map(file =>
                                        renderFilePreview(file),
                                    )
                                    : renderFilePreview(field.value as File)}
                            </div>
                        )}
                    </div>

                    {errorMessage && (
                        <div className="text-danger mt-1">{errorMessage}</div>
                    )}

                    {errors[fieldPath] && (
                        <div className="text-danger mt-1">{`${errors[fieldPath]?.message}`}</div>
                    )}
                </div>
            )}
        />
    );
};

export default FormInputFile;
