import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import React, { useMemo } from 'react';
import Select, { SingleValue } from 'react-select';
import BaseFormInput from '@/components/Form/Bases/BaseFormInput';
import { useTranslation } from 'react-i18next';
import { ISelect2Options } from '@/types/ISelect2';
import { IFormSelectBasic } from '@/components/Form/FormSelectBasic/interfaces';
import { getSelectedValue } from '@/components/Form/FormSelectBasic/helpers';

const FormSelectBasic = <T extends FieldValues, TypeValue, TypeLabel>({
                                                                          fieldPath,
                                                                          label,
                                                                          options,
                                                                          required = false,
                                                                          placeholder,
                                                                          info,
                                                                          searchable = true,
                                                                          clearable = false,
                                                                          disabled = false,
                                                                          loading = false,
                                                                          closeMenuOnSelect = true,
                                                                          onChangeCallback,
                                                                          comparisonFunction,
                                                                      }: IFormSelectBasic<T, TypeValue, TypeLabel>) => {
    const { control } = useFormContext<T>();
    const { t } = useTranslation();

    const memorizedOptions = useMemo(() => options, [options]);

    const handleChange = (
        option: SingleValue<ISelect2Options<TypeValue, TypeLabel>>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange: (...event: any[]) => void,
    ) => {
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
            loading={loading}
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
                        >(val, memorizedOptions, comparisonFunction);

                        return (
                            <Select
                                aria-labelledby={`${fieldPath}-label`}
                                options={memorizedOptions}
                                placeholder={placeholder}
                                onChange={selectedOption =>
                                    handleChange(selectedOption, onChange)
                                }
                                isSearchable={searchable}
                                isClearable={clearable}
                                value={selectedValue}
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

export default FormSelectBasic;
