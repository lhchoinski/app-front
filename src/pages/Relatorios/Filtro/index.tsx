import React, { useState } from 'react';
import { DynamicIcons } from '@/components/DynamicIcons';
import { useTranslation } from 'react-i18next';
import AnimateHeight from 'react-animate-height';
import {
    IRelatorioFiltro,
    IRelatorioFiltroProps,
} from '@/pages/Relatorios/Filtro/interfaces';
import SubmitButton from '@/components/Form/Buttons/Submit';
import SimpleButton from '@/components/Form/Buttons/Simple';
import CoreForm from '@/components/Form/CoreForm';
import { useForm } from 'react-hook-form';
import { DefaultValues } from 'react-hook-form/dist/types/form';
import FormInputDate from '@/components/Form/FormInputDate';
import FormSelectBasic from '@/components/Form/FormSelectBasic';
import { compareDates } from '@/helpers/DateHelper';
import FormSelectMultipleApi from '@/components/Form/FormSelectMultipleApi';
import { ISelect2Options } from '@/types/ISelect2';
import { data } from 'autoprefixer';

const RelatorioFiltro = <T extends IRelatorioFiltro>({
    searchEvent,
    initialValues,
    children,
    refresh,
    resolver,
    onSubmitCallback,
}: IRelatorioFiltroProps<T>) => {
    const [isSubmitForm, setIsSubmitForm] = useState(false);
    const { t } = useTranslation();

    const createParams = (values: T): T => {
        return {
            ...values,
            dataInicial: values.dataInicial,
            dataFinal: values.dataFinal,
            codFonte: values.codFonte,
            tipoData: values.tipoData,
        };
    };

    const [genericError, setGenericError] = useState<string | undefined>(
        undefined,
    );

    const onSubmit = async (values: T) => {
        setIsSubmitForm(true);

        if (onSubmitCallback) {
            onSubmitCallback(values);
        }

        const comparisonResult = compareDates(
            values.dataInicial,
            values.dataFinal,
        );

        if (comparisonResult === 1) {
            setGenericError(
                'Data final deve ser posterior ou igual à data inicial',
            );
            setIsSubmitForm(false);
            return;
        } else {
            setGenericError(undefined);
        }

        try {
            const params = createParams(values);
            searchEvent(params);
        } catch (error) {
            setGenericError('Erro ao buscar os dados. Tente novamente.');
        } finally {
            setIsSubmitForm(false);
        }
    };

    const [active, setActive] = useState<boolean>(true);
    const togglePara = () => {
        setActive(!active);
    };

    const formMethods = useForm<T>({
        defaultValues: initialValues as DefaultValues<T>,
        resolver: resolver,
    });

    const dataTypesOptions: ISelect2Options<string, string>[] = [
        {
            label: 'Data da Emissão',
            value: '1',
        },
        {
            label: 'Data da Baixa',
            value: '2',
        },
    ];

    return (
        <div className="space-y-2">
            <div className="border border-[#d3d3d3] rounded dark:border-[#1b2e4b]">
                <button
                    type="button"
                    className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] ${active ? '!text-primary' : ''}`}
                    onClick={togglePara}
                >
                    <DynamicIcons name={'FaFilter'} className={'mr-2'} />
                    <span>Pesquisar</span>
                    <div
                        className={`ltr:ml-auto rtl:mr-auto ${active ? 'rotate-180' : ''}`}
                    >
                        <DynamicIcons name={active ? 'BsDashLg' : 'HiPlus'} />
                    </div>
                </button>

                <div>
                    <AnimateHeight duration={300} height={active ? 'auto' : 0}>
                        <div className="space-y-2 p-4 border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                            <CoreForm<T>
                                onSubmit={onSubmit}
                                formMethods={formMethods}
                                hideSubmitButton={true}
                                genericError={genericError}
                            >
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 col-span-4 gap-4">
                                            <FormInputDate<IRelatorioFiltro>
                                                fieldPath="dataInicial"
                                                label={'Data Inicial'}
                                                placeholder={'Data Inicial'}
                                                required={true}
                                            />

                                            <FormInputDate<IRelatorioFiltro>
                                                fieldPath="dataFinal"
                                                label={'Data Final'}
                                                placeholder={'Data Final'}
                                                required={true}
                                            />
                                        </div>

                                        <FormSelectBasic<
                                            IRelatorioFiltro,
                                            string,
                                            string
                                        >
                                            fieldPath="tipoData"
                                            label={'Tipo da data'}
                                            options={dataTypesOptions}
                                            placeholder={t(
                                                'select.placeHolder',
                                            )}
                                            required={true}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                                        <FormSelectMultipleApi<
                                            IRelatorioFiltro,
                                            number,
                                            string
                                        >
                                            fieldPath="fontes"
                                            label={t('font')}
                                            placeholder={t(
                                                'select.placeHolder',
                                            )}
                                            route={'fontes'}
                                        />
                                    </div>

                                    {children}

                                    <div className="flex gap-4 justify-end items-center mt-4">
                                        <SubmitButton
                                            icon="MdSearch"
                                            text={t('button.search')}
                                            className="gap-2"
                                            disabled={isSubmitForm}
                                            loading={refresh}
                                        />

                                        <SimpleButton
                                            icon="MdFilterAltOff"
                                            text={t('button.cleanFilter')}
                                            className="btn btn-dark gap-2"
                                            onClick={() => {
                                                formMethods.reset();
                                            }}
                                            disabled={refresh}
                                        />
                                    </div>
                                </>
                            </CoreForm>
                        </div>
                    </AnimateHeight>
                </div>
            </div>
        </div>
    );
};

export default RelatorioFiltro;
