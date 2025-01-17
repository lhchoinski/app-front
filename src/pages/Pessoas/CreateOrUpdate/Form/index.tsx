import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { postRequest, putRequest } from '@/services/GenericService';
import { IPessoaForm, IPessoaRequest, IPessoaResponse } from '@/types/IPessoa';
import CoreFormTabs from '@/components/Form/CoreFormTabs';
import { ICoreFormTab } from '@/components/Form/CoreFormTabs/interfaces';
import { useTranslation } from 'react-i18next';
import CoreLoader from '@/components/Loader';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { IPessoasCadastrarForm } from '@/pages/Pessoas/CreateOrUpdate/Form/interfaces';
import { schemaPessoa } from '@/pages/Pessoas/CreateOrUpdate/schema';
import { showErrorToast, showSuccessToast } from '@/components/SweetAlert';
import TabPessoa from '@/pages/Pessoas/CreateOrUpdate/Form/TabPessoa';
import TabEnderecoPessoa from '@/pages/Pessoas/CreateOrUpdate/Form/TabEnderecoPessoa';
import { pessoaFormToResquest } from '@/pages/Pessoas/CreateOrUpdate/helpers';
import { AxiosError } from 'axios';
import { applyErrorsToForm, hasMessage } from '@/helpers/CoreFormErrorsHelper';
import { isString } from 'lodash';

const PessoaForm = ({ initialValues, viewMode }: IPessoasCadastrarForm) => {
    const { t } = useTranslation();

    const [refresh, setRefresh] = useState(false);

    const [genericError, setGenericError] = useState<string | undefined>(
        undefined,
    );

    const formMethods = useForm<IPessoaForm>({
        resolver: yupResolver(schemaPessoa as any),
        defaultValues: initialValues,
    });

    const { setError, setValue } = formMethods;

    useEffect(() => {
        setRefresh(true);
    }, [initialValues]);

    useEffect(() => {
        if (refresh) {
            setValue('pessoa', initialValues.pessoa);
            setValue('endereco', initialValues.endereco);
            setValue(
                'pessoa.nacionalidade',
                initialValues.pessoa.nacionalidade,
            );
            setRefresh(false);
        }
    }, [refresh]);

    const apiRoute = 'pessoas';
    const pageRoute = 'gestao-de-pessoas/pessoas';

    const navigate = useNavigate();

    const onSubmit = (values: IPessoaForm) => {
        if (initialValues.pessoa.id) {
            putRequest<IPessoaRequest>(
                apiRoute,
                initialValues.pessoa.id,
                pessoaFormToResquest(values),
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
        postRequest<IPessoaRequest>(apiRoute, pessoaFormToResquest(values))
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
                                : JSON.stringify(errorData),
                        );
                    } else {
                        applyErrorsToForm(
                            errorData as IPessoaResponse,
                            setError,
                            initialValues,
                        );
                    }
                }
            });
    };

    const tabs: ICoreFormTab<IPessoaForm>[] = [
        {
            name: t('people'),
            icon: 'FaPerson',
            ref: 'pessoa',
            content: () => <TabPessoa viewMode={viewMode} />,
        },
        {
            name: t('address'),
            icon: 'FaMapMarkerAlt',
            ref: 'endereco',
            content: () => <TabEnderecoPessoa viewMode={viewMode} />,
        },
    ];

    return (
        <CoreLoader id={'form-pessoa'}>
            <CoreFormTabs<IPessoaForm>
                onSubmit={onSubmit}
                tabs={tabs}
                formMethods={formMethods}
                genericError={genericError}
                hideSubmitButton={viewMode}
            />
        </CoreLoader>
    );
};

export default PessoaForm;
