import React, { useEffect, useState } from 'react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import Select, { SingleValue } from 'react-select';
import { useTranslation } from 'react-i18next';
import BaseFormInput from '@/components/Form/BaseFormInput';
import { ISelect2Options } from '@/types/ISelect2';
import { findSelect2 } from '@/services/GenericService';
import { IFormSelectApi } from '@/components/Form/FormSelectApi/interfaces';
import { getSelectedValue } from '@/components/Form/FormSelectBasic/helpers';

const FormSelectApi = <T extends FieldValues, TypeValue, TypeLabel>({
    fieldPath,
    label,
    route,
    required = false,
    placeholder,
    info,
    apiSearch = false,
    apiSearchDelay = 1000,
    searchable = true,
    clearable = false,
    disabled = false,
    loading = false,
    closeMenuOnSelect = true,
    onChangeCallback,
    comparisonFunction,
}: IFormSelectApi<T, TypeValue, TypeLabel>) => {
    const { control, setValue } = useFormContext<T>();
    const { t } = useTranslation();

    const [selectOptions, setSelectOptions] = useState<
        ISelect2Options<TypeValue, TypeLabel>[]
    >([]);
    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<SingleValue<
        ISelect2Options<TypeValue, TypeLabel>
    > | null>(null);

    const fetchOptions = async () => {
        try {
            const options = await findSelect2<TypeValue, TypeLabel>(
                route,
                searchTerm,
            );
            setSelectOptions(options);

            if (!selectedOption && options.length > 0) {
                const selected = options.find(
                    option => option.selected === true,
                );
                if (selected) {
                    setSelectedOption(selected);
                    setValue(fieldPath, selected as any, {
                        shouldValidate: true,
                    });
                }
            }
        } catch (error) {
            console.error('Failed to fetch options:', error);
        } finally {
            setRefresh(false);
        }
    };

    const [searchTimeout, setSearchTimeout] = useState<ReturnType<
        typeof setTimeout
    > | null>(null);

    useEffect(() => {
        if (refresh) {
            void fetchOptions();
        }

        // eslint-disable-next-line
    }, [refresh]);

    useEffect(() => {
        if (route) {
            setRefresh(true);
        }
    }, [route]);

    const handleInputChange = (inputValue: string) => {
        if (apiSearch) {
            setSearchTerm(inputValue);

            if (apiSearchDelay > 0) {
                if (searchTimeout) {
                    clearTimeout(searchTimeout);
                }

                setSearchTimeout(
                    setTimeout(() => {
                        setRefresh(true);
                    }, apiSearchDelay),
                );
            } else {
                setRefresh(true);
            }
        }
    };

    const handleChange = (
        option: SingleValue<ISelect2Options<TypeValue, TypeLabel>>,
        onChange: (...event: any[]) => void,
    ) => {
        setSelectedOption(option);
        onChange(option ? option.value : null);

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
                        const val = value as TypeValue | null;
                        const selectedValue = getSelectedValue<
                            TypeValue,
                            TypeLabel
                        >(val, selectOptions, comparisonFunction);

                        return (
                            <Select
                                aria-labelledby={`${fieldPath}-label`}
                                options={selectOptions}
                                placeholder={placeholder}
                                onChange={selectedOption =>
                                    handleChange(selectedOption, onChange)
                                }
                                onInputChange={handleInputChange}
                                isSearchable={searchable}
                                isClearable={clearable}
                                value={selectedValue || selectedOption}
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
                                        borderRadius: '6px',
                                    }),
                                    multiValueLabel: provided => ({
                                        ...provided,
                                        color: '#f4f4f4',
                                    }),
                                    multiValueRemove: provided => ({
                                        ...provided,
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

export default FormSelectApi;
