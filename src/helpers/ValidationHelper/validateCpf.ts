export const validateCpf = (
    cpf: string | null | undefined,
    onlyCompleted = false,
) => {
    if (cpf === null || cpf === undefined) {
        return true;
    }

    const cleaned = cpf.replace(/\D/g, '');

    if (cleaned.length < 11) {
        return onlyCompleted;
    }

    if (/^(\d)\1+$/.test(cleaned)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleaned.charAt(i)) * (10 - i);
    }

    let firstVerifier = (sum * 10) % 11;
    if (firstVerifier === 10 || firstVerifier === 11) firstVerifier = 0;
    if (firstVerifier !== parseInt(cleaned.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleaned.charAt(i)) * (11 - i);
    }

    let secondVerifier = (sum * 10) % 11;
    if (secondVerifier === 10 || secondVerifier === 11) secondVerifier = 0;

    return secondVerifier === parseInt(cleaned.charAt(10));
};
