import { ITabFonte } from '@/pages/Fontes/CreateOrUpdate/Form/TabFonte/interfaces';
import React from 'react';
import FormInput from '@/components/Form/FormInput';
import { IFonteForm } from '@/types/IFonte';
import { useTranslation } from 'react-i18next';

const TabFonte = ({ viewMode }: ITabFonte) => {
    const { t } = useTranslation();

    return (
        <>
            <div className={'flex flex-col sm:flex-row'}>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput<IFonteForm>
                        fieldPath="fonte.fonte"
                        required={true}
                        placeholder={t('code')}
                        label={t('code')}
                        disabled={viewMode}
                    />

                    <FormInput<IFonteForm>
                        fieldPath="fonte.descricao"
                        required={true}
                        placeholder={t('description')}
                        label={t('description')}
                        disabled={viewMode}
                    />
                </div>
            </div>
        </>
    );
};

export default TabFonte;
