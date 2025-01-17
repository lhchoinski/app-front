export const formatTime = (hora: string): string => {
    const cleaned = hora.replace(/\D/g, '');

    let masked = cleaned;

    if (cleaned.length > 2 && cleaned.length <= 4) {
        masked = cleaned.replace(/(\d{2})(\d{1,2})/, '$1:$2');
    } else if (cleaned.length > 4) {
        masked = cleaned.replace(/(\d{2})(\d{2})(\d{0,2})/, '$1:$2');
    }

    return masked.slice(0, 5); // Limita para hh:mm
};
