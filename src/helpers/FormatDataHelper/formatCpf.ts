export const formatCpf = (cpf: string) => {
    if (!cpf) return null;

    const cleaned = cpf.replace(/\D/g, '');

    let masked = cleaned;

    if (cleaned.length > 3 && cleaned.length <= 6) {
        masked = cleaned.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else if (cleaned.length > 6 && cleaned.length <= 9) {
        masked = cleaned.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (cleaned.length > 9) {
        masked = cleaned.replace(
            /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
            '$1.$2.$3-$4',
        );
    }

    return masked.slice(0, 14);
};
