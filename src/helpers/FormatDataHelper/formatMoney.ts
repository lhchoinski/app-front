export const formatMoneyBR = (value: string | number | null): string => {
    const numericValue =
        typeof value === 'string'
            ? Number(value.replace(/\D/g, '')) / 100
            : value;

    // @ts-ignore
    return numericValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
};
