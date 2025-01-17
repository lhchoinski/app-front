import { extractNumbers } from '@/helpers/DataHelper';

export const validatePhone = (phone: string | undefined | null): boolean => {
    if (!phone) return false;

    const phoneNumbers = extractNumbers(phone);

    return !(!phoneNumbers || (phoneNumbers.length !== 10 && phoneNumbers.length !== 11));
};
