import FormInput from '@/components/Form/FormInput';
import { IPessoaForm } from '@/types/IPessoa';
import { useTranslation } from 'react-i18next';
import { ITabEnderecoPessoa } from '@/pages/Pessoas/CreateOrUpdate/Form/TabEnderecoPessoa/interfaces';
import FormInputCep from '@/components/Form/FormInputCep';

const TabEnderecoPessoa = ({ viewMode }: ITabEnderecoPessoa) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="flex flex-col sm:flex-row">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput<IPessoaForm>
                        fieldPath="endereco.rua"
                        label={t('street')}
                        required={true}
                        placeholder={t('street')}
                        disabled={viewMode}
                    />

                    <FormInput<IPessoaForm>
                        fieldPath="endereco.numero"
                        label={t('number')}
                        type="number"
                        required={true}
                        placeholder={t('number')}
                        disabled={viewMode}
                    />

                    <FormInput<IPessoaForm>
                        fieldPath="endereco.complemento"
                        label={t('complement')}
                        placeholder={t('complement')}
                        disabled={viewMode}
                    />

                    <FormInput<IPessoaForm>
                        fieldPath="endereco.bairro"
                        label={t('neighborhood')}
                        required={true}
                        placeholder={t('neighborhood')}
                        disabled={viewMode}
                    />

                    <FormInputCep<IPessoaForm>
                        fieldPath="endereco.cep"
                        type="number"
                        required={true}
                        placeholder={t('cep')}
                        disabled={viewMode}
                    />

                    <FormInput<IPessoaForm>
                        label={t('state')}
                        fieldPath="endereco.estado"
                        required={true}
                        placeholder={t('state')}
                        disabled={viewMode}
                    />

                    <FormInput<IPessoaForm>
                        fieldPath="endereco.cidade"
                        label={t('city')}
                        required={true}
                        placeholder={t('city')}
                        disabled={viewMode}
                    />

                    <FormInput<IPessoaForm>
                        fieldPath="endereco.pais"
                        label={t('country')}
                        required={true}
                        placeholder={t('country')}
                        disabled={viewMode}
                    />
                </div>
            </div>
        </>
    );
};

export default TabEnderecoPessoa;
