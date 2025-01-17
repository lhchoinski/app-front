import React, { ChangeEvent } from 'react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { format, parse, isValid } from 'date-fns';
import SimpleLoader from '@/assets/simpleLoader';
import BaseFormInput from '@/components/Form/Bases/BaseFormInput';
import { IFormInputDateProps } from './interfaces';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import flatpickr from 'flatpickr';
import { formatDateBr } from '@/helpers/FormatDataHelper';

const FormInputDate = <T extends FieldValues>({
                                                  fieldPath,
                                                  label,
                                                  placeholder,
                                                  required = false,
                                                  disabled = false,
                                                  minDate,
                                                  maxDate,
                                                  onChangeCallback,
                                                  loading = false,
                                                  info,
                                                  finalFormatDate = 'yyyy-MM-dd',

                                              }: IFormInputDateProps<T>) => {
    const { control } = useFormContext<T>();

    const getOptions: flatpickr.Options.Options = {
        dateFormat: 'd/m/Y',
        position: 'auto',
        locale: Portuguese,
        allowInput: true,
        minDate,
        maxDate,
    };

    const handleManualInput = (
        e: ChangeEvent<HTMLInputElement>,
        onControllerChange: (value: string | null) => void,
    ) => {
        const inputValue = e.target.value;
        const maskedValue = formatDateBr(inputValue);
        e.target.value = maskedValue;

        if (maskedValue.length === 10) {
            const parsedDate = parse(maskedValue, 'dd/MM/yyyy', new Date());

            if (isValid(parsedDate)) {
                const formattedDate = format(parsedDate, finalFormatDate);
                onControllerChange(formattedDate);

                if (onChangeCallback) {
                    onChangeCallback(formattedDate);
                }
            } else {
                onControllerChange(null);
                if (onChangeCallback) {
                    onChangeCallback(null);
                }
            }
        } else if (maskedValue.length === 0) {
            onControllerChange(null);
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
            <Controller
                name={fieldPath}
                control={control}
                render={({
                             field: { onChange: onControllerChange, value },
                         }) => {
                    const handleInputChange = (selectedDates: Date[]) => {
                        const date = selectedDates[0];
                        if (!date) {
                            onControllerChange(null);
                            if (onChangeCallback) onChangeCallback(null);
                            return;
                        }

                        const formattedDate = format(date, finalFormatDate);
                        onControllerChange(formattedDate);

                        if (onChangeCallback) {
                            onChangeCallback(formattedDate);
                        }
                    };

                    const formattedValue = value
                        ? format(
                            parse(
                                value as string,
                                finalFormatDate,
                                new Date(),
                            ),
                            'dd/MM/yyyy',
                        )
                        : '';

                    return (
                        <Flatpickr
                            options={getOptions}
                            className={`form-input placeholder:text-white-dark ${disabled || loading ? ' disabled:bg-[#eee]' : ''}`}
                            disabled={disabled || loading}
                            placeholder={placeholder}
                            onChange={handleInputChange}
                            value={formattedValue}
                            onInput={e =>
                                handleManualInput(
                                    e as ChangeEvent<HTMLInputElement>,
                                    onControllerChange,
                                )
                            }
                        />
                    );
                }}
            />

            {loading && (
                <span className="absolute end-4 top-1/2 -translate-y-1/2">
                    <SimpleLoader size={4} />
                </span>
            )}
        </BaseFormInput>
    );
};

export default FormInputDate;
