export const formatRg = (rg: string) => {
    if (!rg) return null;

    const cleaned = rg.replace(/\D/g, '');

    if (cleaned.length == 0) {
        return '';
    }

    if (cleaned.length <= 6) {
        // Formato: 000.000-0 (até 6 dígitos para o número e 1 para o dígito verificador)
        return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}-${cleaned.slice(6, 7)}`;
    }

    if (cleaned.length <= 8) {
        // Formato: 0.000.000-0 (até 8 dígitos para o número e 1 para o dígito verificador)
        return `${cleaned.slice(0, 1)}.${cleaned.slice(1, 4)}.${cleaned.slice(4, 7)}-${cleaned.slice(7, 8)}`;
    }

    // Formato: 00.000.000-0 (até 9 dígitos para o número e 1 para o dígito verificador)
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}-${cleaned.slice(8, 9)}`;
};
