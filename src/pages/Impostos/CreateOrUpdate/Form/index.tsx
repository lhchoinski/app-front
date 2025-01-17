import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { postRequest, putRequest } from '@/services/GenericService';
import { IPessoaResponse } from '@/types/IPessoa';
import CoreFormTabs from '@/components/Form/CoreFormTabs';
import { ICoreFormTab } from '@/components/Form/CoreFormTabs/interfaces';
import { useTranslation } from 'react-i18next';
import CoreLoader from '@/components/Loader';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { showErrorToast, showSuccessToast } from '@/components/SweetAlert';
import { AxiosError } from 'axios';
import { applyErrorsToForm, hasMessage } from '@/helpers/CoreFormErrorsHelper';
import { isString } from 'lodash';
import { IImpostoCadastrarForm } from '@/pages/Impostos/CreateOrUpdate/Form/interfaces';
import { IImpostoForm, IImpostoRequest } from '@/types/IImposto';
import { impostoFormToResquest } from '@/pages/Impostos/CreateOrUpdate/helpers';
import TabImposto from '@/pages/Impostos/CreateOrUpdate/Form/TabImposto';
import { schemaImposto } from '@/pages/Impostos/CreateOrUpdate/schema';

const ImpostoForm = ({ initialValues, viewMode }: IImpostoCadastrarForm) => {
    const { t } = useTranslation();

    const [refresh, setRefresh] = useState(false);

    const [genericError, setGenericError] = useState<string | undefined>(
        undefined
    );

    const formMethods = useForm<IImpostoForm>({
        resolver: yupResolver(schemaImposto as any),
        defaultValues: initialValues
    });

    const { setError, setValue } = formMethods;

    useEffect(() => {
        setRefresh(true);
    }, [initialValues]);

    useEffect(() => {
        if (refresh) {
            setValue('imposto', initialValues.imposto);

            setRefresh(false);
        }
    }, [refresh]);

    const apiRoute = 'impostos';
    const pageRoute = 'impostos';

    const navigate = useNavigate();

    const onSubmit = (values: IImpostoForm) => {
        if (initialValues.imposto.id) {
            putRequest<IImpostoRequest>(
                apiRoute,
                initialValues.imposto.id,
                impostoFormToResquest(values)
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
        postRequest<IImpostoRequest>(apiRoute, impostoFormToResquest(values))
            .then(() => {
                void showSuccessToast();
                navigate(`/${pageRoute}`);
            })
            .catch(error => {
                const newError = error as AxiosError<
                    IPessoaResponse | { message: string }
                >;

                if (newError.response) {
                    const errorData = newError.response.data;

                    if (hasMessage(errorData)) {
                        void showErrorToast();
                        setGenericError(errorData.message);
                    } else if (newError.response?.status !== 422) {
                        setGenericError(
                            isString(errorData)
                                ? errorData
                                : JSON.stringify(errorData)
                        );
                    } else {
                        applyErrorsToForm(
                            errorData as IPessoaResponse,
                            setError,
                            initialValues
                        );
                    }
                }
            });
    };

    const tabs: ICoreFormTab<IImpostoForm>[] = [
        {
            name: t('taxes'),
            icon: 'TbCashRegister',
            ref: 'imposto',
            content: () => <TabImposto viewMode={viewMode} />
        }
    ];

    return (
        <CoreLoader id={'form-imposto'}>
            <CoreFormTabs<IImpostoForm>
                onSubmit={onSubmit}
                tabs={tabs}
                formMethods={formMethods}
                genericError={genericError}
                hideSubmitButton={viewMode}
            />
        </CoreLoader>
    );
};

export default ImpostoForm;
