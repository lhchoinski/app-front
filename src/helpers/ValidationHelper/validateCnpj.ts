import { extractNumbers } from '@/helpers/DataHelper';

export const validateCnpj = (cnpj: string | undefined | null): boolean => {
    if (!cnpj) return false;

    const cnpjNumbers = extractNumbers(cnpj);

    return !(!cnpjNumbers || cnpjNumbers.toString().length !== 14);
};
