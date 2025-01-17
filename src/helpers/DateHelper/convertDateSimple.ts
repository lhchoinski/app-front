import { convertDateFormat } from '@/helpers/DateHelper/convertDateFormat';
import { format, parseISO } from 'date-fns';

export const convertDateDbToBr = (date: string) => {
    return convertDateFormat(date, 'yyyy-MM-dd', 'dd/MM/yyyy');
};

export const convertDateBrToDb = (date: string) => {
    return convertDateFormat(date, 'dd/MM/yyyy', 'yyyy-MM-dd');
};

export const convertDateTimeDbToBr = (date: string) => {
    return convertDateFormat(
        date,
        'yyyy-MM-dd HH:mm:ss',
        'dd/MM/yyyy HH:mm:ss',
    );
};

export const convertDateTimeBrToDb = (date: string) => {
    return convertDateFormat(
        date,
        'dd/MM/yyyy HH:mm:ss',
        'yyyy-MM-dd HH:mm:ss',
    );
};

export const convertDateTimeZoneDbToBr = (dateString: string) => {
    if (!dateString) {
        return 'Data inválida';
    }
    try {
        const sanitizedDateString = dateString.replace('T', ' ').split('.')[0];

        const date = new Date(sanitizedDateString);

        if (isNaN(date.getTime())) {
            throw new Error('Data inválida');
        }

        return format(date, 'dd/MM/yyyy HH:mm:ss');
    } catch (error) {
        console.error('Erro ao converter data:', error);
        return 'Data inválida';
    }
};
