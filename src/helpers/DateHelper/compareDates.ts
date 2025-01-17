import { parse, format, compareAsc } from 'date-fns';

/**
 * Compara duas datas e retorna se data1 é maior, menor ou igual a data2.
 * Se data2 não for passada, usa a data atual.
 *
 * @param date1 - A primeira data a ser comparada.
 * @param date2 - A segunda data a ser comparada (opcional, usa a data atual se não fornecida).
 * @param formatStr - O formato das datas (padrão: 'dd/MM/yyyy').
 * @returns -1 se data1 for menor, 0 se for igual, 1 se for maior que data2.
 */
export function compareDates(
    date1: string,
    date2: string = format(new Date(), 'dd/MM/yyyy'),
    formatStr: string = 'dd/MM/yyyy',
): number {
    const parsedDate1 = parse(date1, formatStr, new Date());
    const parsedDate2 = parse(date2, formatStr, new Date());

    return compareAsc(parsedDate1, parsedDate2);
}
