import { extractNumbers } from '@/helpers/DataHelper';

export const formatCnpj = (value: string) => {
    const cnpj = extractNumbers(value);
    if (!cnpj) return null;

    return cnpj
        .toString()
        .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, '$1.$2.$3/$4-$5')
        .substring(0, 18);
};
