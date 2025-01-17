import {
    Controller,
    FieldValues,
    Path,
    PathValue,
    useFormContext,
} from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { ISelect2Options } from '@/types/ISelect2';
import BaseFormInput from '@/components/Form/BaseFormInput';
import { findSelect2 } from '@/services/GenericService';
import { IFormSelectMultipleApi } from '@/components/Form/FormSelectMultipleApi/interfaces';
import { useTranslation } from 'react-i18next';

const FormSelectMultipleApi = <T extends FieldValues, TypeValue, TypeLabel>({
    fieldPath,
    label,
    route,
    required = false,
    placeholder,
    info,
    apiSearch = false,
    searchable = true,
    clearable = false,
    disabled = false,
    loading = false,
    closeMenuOnSelect = true,
    onChangeCallback,
}: IFormSelectMultipleApi<T, TypeValue, TypeLabel>) => {
    const { control, setValue } = useFormContext<T>();
    const { t } = useTranslation();

    const [selectOptions, setSelectOptions] = useState<
        ISelect2Options<TypeValue, TypeLabel>[]
    >([]);

    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);

    const fetchOptions = async () => {
        try {
            const options = await findSelect2<TypeValue, TypeLabel>(
                route,
                searchTerm,
            );
            setSelectOptions(options);

            const selected = options.find(option => option.selected === true);
            if (selected) {
                setValue(fieldPath, selected as PathValue<T, Path<T>>, {
                    shouldValidate: true,
                });
            }
        } catch (error) {
            console.error('Failed to fetch options:', error);
        } finally {
            setRefresh(false);
        }
    };

    useEffect(() => {
        if (refresh) {
            void fetchOptions();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    useEffect(() => {
        if (route) {
            setRefresh(true);
        }
    }, [route]);

    const [searchTimeOut, setSearchTimeOut] = useState<ReturnType<
        typeof setTimeout
    > | null>(null);

    const handleInputChange = (inputValue: string) => {
        if (apiSearch) {
            setSearchTerm(inputValue);

            if (searchTimeOut) {
                clearTimeout(searchTimeOut);
            }

            setSearchTimeOut(
                setTimeout(() => {
                    setRefresh(true);
                }, 1000),
            );
        }
    };

    const handleChange = (
        option: MultiValue<ISelect2Options<TypeValue, TypeLabel>>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange: (...event: any[]) => void,
    ) => {
        const selectedValues = option.map(opt => opt.value);

        onChange(selectedValues);

        if (onChangeCallback) {
            onChangeCallback(option);
        }
    };

    return (
        <BaseFormInput<T>
            label={label}
            fieldPath={fieldPath}
            required={required}
            loading={loading || refresh}
            info={info}
        >
            <div className="custom-select">
                <Controller
                    name={fieldPath}
                    control={control}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <Select
                                aria-labelledby={`${fieldPath}-label`}
                                options={selectOptions}
                                placeholder={placeholder}
                                onChange={selectedOption =>
                                    handleChange(selectedOption, onChange)
                                }
                                isMulti={true}
                                onInputChange={handleInputChange}
                                isSearchable={searchable}
                                isClearable={clearable}
                                value={selectOptions.filter(option =>
                                    value?.includes(option.value),
                                )}
                                isDisabled={disabled || loading}
                                closeMenuOnSelect={closeMenuOnSelect}
                                menuPosition="fixed"
                                noOptionsMessage={({ inputValue }) =>
                                    !inputValue
                                        ? t('select.noOptions')
                                        : t('select.noResult')
                                }
                                styles={{
                                    menuPortal: provided => ({
                                        ...provided,
                                        zIndex: 9999,
                                    }),
                                    menu: provided => ({
                                        ...provided,
                                        fontSize: '0.875rem',
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        fontSize: '13px',
                                        backgroundColor: state.isSelected
                                            ? '#f0f0f0'
                                            : state.isFocused
                                              ? '#e6e6e6'
                                              : '#fff',
                                        color: state.isSelected
                                            ? '#333'
                                            : '#000',
                                        cursor: 'pointer',
                                        ':active': {
                                            backgroundColor: '#ddd',
                                        },
                                    }),
                                    multiValue: provided => ({
                                        ...provided,
                                        backgroundColor: 'rgba(67,97,238)',
                                        borderColor: 'rgba(67,97,238)',
                                        borderRadius: '6px',
                                        shadowColor: 'rgba(67,97,238,0.6)',
                                    }),
                                    multiValueLabel: provided => ({
                                        ...provided,
                                        color: '#f4f4f4',
                                    }),
                                    multiValueRemove: provided => ({
                                        ...provided,
                                        color: '#000000',
                                        ':hover': {
                                            backgroundColor: 'rgb(16,63,253)',
                                            color: '#fff',
                                            borderRadius: '6px',
                                        },
                                    }),
                                }}
                            />
                        );
                    }}
                />
            </div>
        </BaseFormInput>
    );
};

export default FormSelectMultipleApi;
