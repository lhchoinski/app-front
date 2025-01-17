export const formatCep = (value: string | undefined) => {
    if (!value) return '';

    value = value.replace(/\D/g, '');

    if (value.length <= 5) {
        return value;
    } else if (value.length > 5 && value.length <= 8) {
        return value.replace(/(\d{5})(\d{0,3})/, '$1-$2');
    } else {
        return value.slice(0, 8).replace(/(\d{5})(\d{3})/, '$1-$2');
    }
};
