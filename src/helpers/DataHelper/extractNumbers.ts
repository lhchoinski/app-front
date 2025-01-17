export const extractNumbers = (
    value: string | null | undefined,
): string | null => {
    return value ? value.replace(/[^0-9]/g, '') : null;
};

export const extractNumbersMoneyBR = (
    value: string | null | undefined,
): number | null => {
    return value
        ? parseFloat(value.replace(/[R$.\s]/g, '').replace(',', '.'))
        : null;
};
