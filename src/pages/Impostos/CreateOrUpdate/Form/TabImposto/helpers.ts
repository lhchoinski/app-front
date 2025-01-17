import { ISelect2Options } from '@/types/ISelect2';


export const impostoOptions = (): ISelect2Options<number, number>[] => {
    return [
        {
            label: 1,
            value: 1
        },
        {
            label: 2,
            value: 2
        }
    ];
};
