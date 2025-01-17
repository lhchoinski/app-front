import { isValid, parse } from 'date-fns';

export function validationHour(
    hour: string | null | unknown,
    formatStr: string = 'HH:mm',
): boolean {
    return hour ? isValid(parse(hour as string, formatStr, new Date())) : true;
}
