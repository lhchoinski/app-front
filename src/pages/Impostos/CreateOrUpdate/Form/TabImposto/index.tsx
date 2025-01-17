import FormInput from '@/components/Form/FormInput';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ITabImposto } from '@/pages/Impostos/CreateOrUpdate/Form/TabImposto/interfaces';
import { IImpostoForm, IImpostoResponse, IValorFaixa } from '@/types/IImposto';
import FormInputMoneyBR from '@/components/Form/FormInputMoneyBR';

const TabImposto = ({ viewMode }: ITabImposto) => {
    const { t } = useTranslation();
    const { control, getValues } = useFormContext();

    const valoresFaixas: IValorFaixa[] = useWatch({
        control,
        name: 'imposto.valorFaixas',
    });

    const valor: IImpostoResponse[] = useWatch({
        control,
        name: 'imposto.valor',
    });

    return (
        <>
            <div className="flex flex-col sm:flex-row">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput<IImpostoForm>
                        fieldPath="imposto.nome"
                        label={t('name')}
                        required={true}
                        placeholder={t('name')}
                        disabled={viewMode}
                    />

                    {valor != null && (
                        <FormInput<IImpostoForm>
                            fieldPath="imposto.valor"
                            label={t('value')}
                            required={true}
                            placeholder={t('value')}
                            disabled={viewMode}
                        />
                    )}

                    {getValues('imposto.nome') == 'INSS' && (
                        <FormInputMoneyBR<IImpostoForm>
                            fieldPath="imposto.teto"
                            label={t('Valor Teto')}
                            required={true}
                            placeholder={t('Teto')}
                            disabled={viewMode}
                        />
                    )}

                    {valoresFaixas &&
                        valoresFaixas
                            .sort((a, b) => a.valorInicial - b.valorInicial) // Ordena por valorInicial ou outro critério
                            .map((_valorFaixa, index) => (
                                <div
                                    key={index}
                                    className="grid col-span-2 grid-cols-1 sm:grid-cols-2 gap-5"
                                >
                                    <div
                                        key={index}
                                        className="grid grid-cols-1 sm:grid-cols-4 gap-5"
                                    >
                                        <FormInput<IImpostoForm>
                                            fieldPath={`imposto.valorFaixas.${index}.valorInicial`}
                                            label={`${t('initialValue')} ${index + 1}`}
                                            placeholder={`${t('initialValue')}`}
                                            disabled={viewMode}
                                        />

                                        <FormInput<IImpostoForm>
                                            fieldPath={`imposto.valorFaixas.${index}.valorFinal`}
                                            label={`${t('finalValue')} ${index + 1}`}
                                            placeholder={`${t('finalValue')}`}
                                            disabled={viewMode}
                                        />

                                        <FormInput<IImpostoForm>
                                            fieldPath={`imposto.valorFaixas.${index}.aliquota`}
                                            label={`${t('aliquot')} ${index + 1}`}
                                            placeholder={`${t('aliquot')}`}
                                            disabled={viewMode}
                                        />

                                        <FormInput<IImpostoForm>
                                            fieldPath={`imposto.valorFaixas.${index}.parcelaDeduzir`}
                                            label={`${t('Installment_deduct')} ${index + 1}`}
                                            placeholder={`${t('Installment_deduct')}`}
                                            disabled={viewMode}
                                        />
                                    </div>
                                </div>
                            ))}
                </div>
            </div>
        </>
    );
};

export default TabImposto;
