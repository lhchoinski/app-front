import { format, parse } from 'date-fns';

export const convertDateFormat = (
    date: string,
    formatInput: string,
    formatOutput: string,
) => {
    return date
        ? format(parse(date, formatInput, new Date()), formatOutput)
        : null;
};
