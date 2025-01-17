import * as Yup from 'yup';
import { validateCnpj, validateCpf, validatePhone } from '@/helpers/ValidationHelper';
import { yupLang } from '@/i18n/locales/pt/yup';
import { isValidDateFormatToYup } from '@/helpers/DateHelper/validationDate';
import { extractNumbersMoneyBR } from '@/helpers/DataHelper/extractNumbers';

Yup.setLocale(yupLang.default);

Yup.addMethod(Yup.string, 'cpf', function () {
    return this.test('cpf', yupLang.cpf.invalid, function (value) {
        const { path, createError } = this;

        if (value && !validateCpf(value)) {
            return createError({ path, message: yupLang.cpf.invalid });
        }

        return true;
    });
});

Yup.addMethod(Yup.string, 'cnpj', function () {
    return this.test('cnpj', yupLang.cnpj.invalid, function (value) {
        const { path, createError } = this;

        if (value && !validateCnpj(value)) {
            return createError({ path, message: yupLang.cnpj.invalid });
        }

        return true;
    });
});

Yup.addMethod(Yup.string, 'customDate', function () {
    return this.test(
        'customDate',
        yupLang.customDate.invalid,
        function (value) {
            const { path, createError } = this;

            if (value && !isValidDateFormatToYup(value)) {
                return createError({
                    path,
                    message: yupLang.customDate.invalid,
                });
            }

            return true;
        },
    );
});

Yup.addMethod(Yup.string, 'phone', function () {
    return this.test('phone', yupLang.phone.invalid, function (value) {
        const { path, createError } = this;

        if (value && !validatePhone(value)) {
            return createError({ path, message: yupLang.phone.invalid });
        }

        return true;
    });
});

Yup.addMethod(
    Yup.mixed,
    'file',
    function (
        options: {
            allowedExtensions?: string[];
            maxSize?: number;
        } = {},
    ) {
        return this.test('file', yupLang.file.invalidType, function (file) {
            const { path, createError } = this;
            const { allowedExtensions, maxSize } = options;

            if (!file || !(file instanceof File)) {
                return createError({
                    path,
                    message: yupLang.file.invalidFile,
                });
            }

            if (allowedExtensions) {
                const fileExtension = file.name.split('.').pop()?.toLowerCase();
                if (
                    fileExtension &&
                    !allowedExtensions.includes(fileExtension)
                ) {
                    return createError({
                        path,
                        message: yupLang.file.invalidType.replace(
                            '${allowedExtensions}',
                            allowedExtensions.join(', '),
                        ),
                    });
                }
            }

            if (maxSize && file) {
                const fileSizeInMB = file.size / (1024 * 1024); // Converte to MB
                if (fileSizeInMB > maxSize) {
                    return createError({
                        path,
                        message: yupLang.file.maxSize.replace(
                            '${maxSize}',
                            maxSize.toString(),
                        ),
                    });
                }
            }

            return true;
        });
    },
);

Yup.addMethod(Yup.string, 'moneyBR', function (allowZero = false) {
    return this.test('moneyBR', yupLang.moneyBr.invalid, function (value) {
        const { path, createError } = this;

        const moneyBRRegex = /^R?\$?\s?(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/;

        if (!value) return true;

        if (!moneyBRRegex.test(value)) {
            return createError({ path, message: yupLang.moneyBr.invalid });
        }

        const numericValue = extractNumbersMoneyBR(value);

        if (!allowZero && numericValue === 0) {
            return createError({ path, message: yupLang.moneyBr.notZero });
        }

        return true;
    });
});

export {};
