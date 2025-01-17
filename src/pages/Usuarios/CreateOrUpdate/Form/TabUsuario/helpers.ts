import { ISelect2Options } from '@/types/ISelect2';

export const roleOptions = (): ISelect2Options<string, string>[] => {
    return [
        {
            label: 'ADMIN',
            value: 'ADMIN'
        },
        {
            label: 'USER',
            value: 'USER'
        }
    ]
}
