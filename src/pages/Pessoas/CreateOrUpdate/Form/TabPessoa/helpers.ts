import { ISelect2Options } from '@/types/ISelect2';
import i18n from '@/i18n';


export const nacionalidadeOptions = (): ISelect2Options<string, string>[] => {
    const { t } = i18n;

    return [
        {
            label: t('brazilian'),
            value: t('brazilian')
        },
        {
            label: t('foreigner'),
            value: t('foreigner')
        }
    ]
}
