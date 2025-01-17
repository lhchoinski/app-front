import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormInput from '@/components/Form/FormInput';
import { IReciboForm, IReciboValores } from '@/pages/Recibos/interfaces';
import FormSelectApi from '@/components/Form/FormSelectApi';
import { DynamicIcons } from '@/components/DynamicIcons';
import FormInputDate from '@/components/Form/FormInputDate';
import FormInputMoneyBR from '@/components/Form/FormInputMoneyBR';
import FormRadioButton from '@/components/Form/FormRadioButton';
import { TabReciboProps } from '@/pages/Recibos/CreateOrUpdate/interface';
import { useFormContext } from 'react-hook-form';
import FormInputText from '@/components/Form/FormInputText';

const TabDescricao  = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col sm:flex-row">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormInputText<IReciboForm>
                    fieldPath="descricao.descricao"
                    label={t('description')}
                    required={true}
                    rows={8}
                    placeholder={t('description')}
                    className="flex-grow mr-2"
                />

                <div className="col-span-2 flex justify-end mt-5">
                    <button type="submit" className="btn btn-primary">
                        <DynamicIcons
                            name="FaReceipt"
                            className="mr-2 w-4 h-5"
                        />
                        {t('button.generate')}
                    </button>
                </div>
            </div>


        </div>
    );
};

export default TabDescricao;
