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

const TabRecibo: React.FC<TabReciboProps> = ({ initialValues }) => {
    const { t } = useTranslation();
    const { setValue, getValues } = useFormContext<IReciboForm>();

    const [reciboValores, setReciboValores] = useState<IReciboValores[]>(
        initialValues.recibo.reciboValores || [],
    );

    useEffect(() => {
        if (initialValues.recibo.reciboValores) {
            setReciboValores(initialValues.recibo.reciboValores);
        }
    }, [initialValues]);

    const handleAddInput = () => {
        setReciboValores([
            ...reciboValores,
            { valor: null, descricao: '', id: null, idRecibo: null },
        ]);
    };

    const handleRemoveInput = (index: number) => {
        const newReciboValores = reciboValores.filter((_, i) => i !== index);
        setReciboValores(newReciboValores);
        setValue('recibo.reciboValores', newReciboValores);
    };

    const handleChange = (index: number, field: string, value: string) => {
        const newReciboValores = [...reciboValores];
        newReciboValores[index][field] = value;
        setReciboValores(newReciboValores);
        setValue('recibo.reciboValores', newReciboValores);
    };

    return (
        <div className="flex flex-col sm:flex-row">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormSelectApi<IReciboForm, number, string>
                    fieldPath="recibo.idPessoa"
                    label={t('people')}
                    required={true}
                    placeholder={t('select.placeHolder')}
                    route={'pessoas'}
                    apiSearch={true}
                    apiSearchDelay={0}
                />

                <FormInputDate<IReciboForm>
                    fieldPath={'recibo.dataPrevPagamento'}
                    placeholder={t('date.prevPayment')}
                    label={t('date.prevPayment')}
                    required={true}
                />

                <FormInputDate<IReciboForm>
                    fieldPath={'recibo.dataPagamento'}
                    placeholder={t('date.payment')}
                    label={t('date.payment')}
                    required={true}
                />

                <FormInputMoneyBR<IReciboForm>
                    fieldPath="recibo.valorBruto"
                    label={t('grossValue')}
                    required={true}
                    placeholder={'R$ 0,00'}
                    className="flex-grow mr-2"
                />

                <FormSelectApi<IReciboForm, number, string>
                    fieldPath="recibo.codFonte"
                    label={t('font')}
                    required={true}
                    placeholder={t('select.placeHolder')}
                    route={'fontes'}
                />

                {getValues('recibo.dataBaixa') != null ? (
                    <FormInputDate<IReciboForm>
                        fieldPath={'recibo.dataBaixa'}
                        placeholder={t('Data da Baixa')}
                        label={t('Data da Baixa')}
                        required={true}
                    />
                ) : (
                    ''
                )}

                <FormRadioButton<IReciboForm, boolean>
                    fieldPath="recibo.premio"
                    label={t('award')}
                    info={t(
                        'This field, if marked as "Yes", adds 25% to the gross amount.',
                    )}
                    required={true}
                    options={[
                        { value: true, label: 'Sim' },
                        { value: false, label: 'Não' },
                    ]}
                />

                <div className="grid col-span-2 gap-5">
                    <div>
                        <label>{t('otherValues')}</label>
                        {reciboValores.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 mt-2"
                            >
                                <FormInput
                                    fieldPath={`recibo.reciboValores[${index}].valor`}
                                    placeholder={t('value')}
                                    value={
                                        item.valor !== null ? item.valor : ''
                                    }
                                    onChange={e =>
                                        handleChange(
                                            index,
                                            'valor',
                                            e.target.value,
                                        )
                                    }
                                />
                                <FormInput
                                    fieldPath={`recibo.reciboValores[${index}].descricao`}
                                    placeholder={t('description')}
                                    className="flex-grow ml-4"
                                    value={
                                        item.descricao !== null
                                            ? item.descricao
                                            : ''
                                    }
                                    onChange={e =>
                                        handleChange(
                                            index,
                                            'descricao',
                                            e.target.value,
                                        )
                                    }
                                />
                                <button
                                    type="button"
                                    className="text-red-500"
                                    onClick={() => handleRemoveInput(index)}
                                >
                                    <DynamicIcons name={'FaTrash'} />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-primary ml-2 mt-2"
                            onClick={handleAddInput}
                        >
                            Adicionar valores
                            <DynamicIcons name={'IoMdAdd'} className="ml-2" />
                        </button>
                    </div>
                </div>

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

export default TabRecibo;
