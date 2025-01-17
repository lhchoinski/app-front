export const formatPhone = (phone: string) => {
    if (!phone) return null;

    const cleaned = phone.replace(/\D/g, '');

    let masked = cleaned;

    if (cleaned.length > 0 && cleaned.length <= 2) {
        masked = cleaned;
    } else if (cleaned.length > 2 && cleaned.length <= 6) {
        masked = cleaned.replace(/(\d{2})(\d{1,5})/, '($1) $2');
    } else if (cleaned.length > 6) {
        masked = cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }

    return masked.slice(0, 15);
};
