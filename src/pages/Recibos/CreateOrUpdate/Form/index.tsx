import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { postRequest, putRequest } from '@/services/GenericService';
import CoreFormTabs from '@/components/Form/CoreFormTabs';
import { ICoreFormTab } from '@/components/Form/CoreFormTabs/interfaces';
import { useTranslation } from 'react-i18next';
import CoreLoader from '@/components/Loader';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { showErrorToast, showSuccessToast } from '@/components/SweetAlert';
import {
    IReciboForm,
    IReciboRequest,
    IReciboResponse,
} from '@/pages/Recibos/interfaces';
import { schemaRecibo } from '@/pages/Recibos/schema';
import TabRecibo from '@/pages/Recibos/CreateOrUpdate/Form/TabRecibo';
import { IRecibosCadastrarForm } from '@/pages/Recibos/CreateOrUpdate/Form/interfaces';
import { reciboFormToRequest } from '@/pages/Recibos/CreateOrUpdate/Form/TabRecibo/helpers';
import { AxiosError } from 'axios';
import { applyErrorsToForm, hasMessage } from '@/helpers/CoreFormErrorsHelper';
import { isString } from 'lodash';
import TabDescricao from '@/pages/Recibos/CreateOrUpdate/Form/TabDescricao';

const ReciboForm = ({ initialValues }: IRecibosCadastrarForm) => {
    const { t } = useTranslation();

    const [refresh, setRefresh] = useState(false);

    const [genericError, setGenericError] = useState<string | undefined>(
        undefined,
    );

    const formMethods = useForm<IReciboForm>({
        resolver: yupResolver(schemaRecibo as any),
        defaultValues: initialValues,
    });

    useEffect(() => {
        setRefresh(true);
    }, [initialValues]);

    const { setValue, setError } = formMethods;

    useEffect(() => {
        if (refresh) {
            setValue('recibo.id', initialValues.recibo.id);
            setValue('recibo.idPessoa', initialValues.recibo.idPessoa);
            setValue('recibo.codFonte', initialValues.recibo.codFonte);
            setValue('descricao.descricao', initialValues.descricao.descricao);
            setValue('recibo.valorBruto', initialValues.recibo.valorBruto);
            setValue('recibo.reciboValores', initialValues.recibo.reciboValores);
            setValue('recibo.dataPagamento', initialValues.recibo.dataPagamento);
            setValue('recibo.dataBaixa', initialValues.recibo.dataBaixa);
            setValue('recibo.dataPrevPagamento', initialValues.recibo.dataPrevPagamento);
            setValue('recibo.premio', initialValues.recibo.premio);
            setRefresh(false);
        }
    }, [refresh]);

    useEffect(() => {
        setRefresh(true);
    }, [initialValues]);

    const apiRoute = 'recibos';
    const pageRoute = 'recibos';

    const navigate = useNavigate();

    const onSubmit = (values: IReciboForm) => {
        if (initialValues.recibo.id) {
            putRequest<IReciboRequest>(
                apiRoute,
                initialValues.recibo.id,
                reciboFormToRequest(values),
            )
                .then(() => {
                    void showSuccessToast();
                    navigate(`/${pageRoute}`);
                })
                .catch(error => {
                    void showErrorToast();
                    setGenericError(error);
                });
            return;
        }
        postRequest<IReciboRequest>(apiRoute, reciboFormToRequest(values))
            .then(() => {
                void showSuccessToast();
                navigate(`/${pageRoute}`);
            })
            .catch(error => {
                const newError = error as AxiosError<
                    IReciboResponse | { message: string }
                >;

                if (newError.response) {
                    const errorData = newError.response.data;

                    if (hasMessage(errorData)) {
                        showErrorToast();
                        setGenericError(errorData.message);
                    } else if (newError.response?.status !== 422) {
                        setGenericError(
                            isString(errorData)
                                ? errorData
                                : JSON.stringify(errorData),
                        );
                    } else {
                        applyErrorsToForm(
                            errorData as IReciboResponse,
                            setError,
                            initialValues,
                        );
                    }
                }
            });
    };

    const tabs: ICoreFormTab<IReciboForm>[] = [
        {
            name: t('receipts'),
            icon: 'BiSolidReceipt',
            ref: 'recibo',
            content: () => <TabRecibo
                initialValues={initialValues}/>,
        },
        {
            name: t('description'),
            icon: 'LuText',
            ref: 'descricao',
            content: () => <TabDescricao/>,
        },
    ];

    return (
        <CoreLoader id={'form-recibo'}>
            <CoreFormTabs<IReciboForm>
                onSubmit={onSubmit}
                tabs={tabs}
                formMethods={formMethods}
                genericError={genericError}
                hideSubmitButton={true}
            />
        </CoreLoader>
    );
};

export default ReciboForm;
