import { isValid, parse } from 'date-fns';

export const validationDate = (
    date: string | null | unknown,
    formatStr: string = 'dd/MM/yyyy',
): boolean => {
    return date ? isValid(parse(date as string, formatStr, new Date())) : true;
};

export const isValidDateFormatToYup = (value: string | undefined) => {
    if (value === undefined || value.trim() === '') {
        return true;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(value)) {
        return false;
    }

    const parsedDate = parse(value, 'yyyy-MM-dd', new Date());

    return isValid(parsedDate);
};
