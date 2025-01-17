import FormInput from '@/components/Form/FormInput';
import { IPessoaForm } from '@/types/IPessoa';
import { ITabPessoa } from '@/pages/Pessoas/CreateOrUpdate/Form/TabPessoa/interfaces';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import FormSelectBasic from '@/components/Form/FormSelectBasic';
import { useFormContext, useWatch } from 'react-hook-form';
import FormInputCpf from '@/components/Form/FormInputCpf';
import { nacionalidadeOptions } from '@/pages/Pessoas/CreateOrUpdate/Form/TabPessoa/helpers';
import FormInputPhone from '@/components/Form/FormInputPhone';
import FormInputDate from '@/components/Form/FormInputDate';
import FormRadioButton from '@/components/Form/FormRadioButton';

const TabPessoa = ({ viewMode }: ITabPessoa) => {
    const { t } = useTranslation();

    const { control , setValue} = useFormContext();

    const alvara = useWatch({
        control,
        name: 'pessoa.alvara',
    });

    const nacionalidade = useWatch({
        control,
        name: 'pessoa.nacionalidade',
    })

    useEffect(() => {
        if (nacionalidade === 'Estrangeiro') {
            setValue('pessoa.cpf', null);
        } else if (nacionalidade === 'Brasileiro') {
            setValue('pessoa.passaporte', null);
        }
    }, [nacionalidade, setValue]);

    return (
        <>
            <div className="flex flex-col sm:flex-row">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput<IPessoaForm>
                        fieldPath="pessoa.nome"
                        label={t('name')}
                        required={true}
                        placeholder={t('name')}
                        disabled={viewMode}
                    />

                    <FormInputDate<IPessoaForm>
                        fieldPath="pessoa.dataNascimento"
                        label={t('date.birthday')}
                        required={true}
                        placeholder={t('date.birthday')}
                        disabled={viewMode}
                    />

                    {nacionalidade === 'Estrangeiro' ? (
                        <FormInput<IPessoaForm>
                            fieldPath="pessoa.passaporte"
                            label={t('Passaporte')}
                            required={true}
                            placeholder={t('Passaporte')}
                            disabled={viewMode}
                        />
                    ) : (
                        <FormInputCpf<IPessoaForm>
                            fieldPath="pessoa.cpf"
                            placeholder={t('cpf')}
                            required={true}
                            disabled={viewMode}
                        />
                    )}

                    <FormSelectBasic<IPessoaForm, string, string>
                        options={nacionalidadeOptions()}
                        fieldPath="pessoa.nacionalidade"
                        label={t('nationality')}
                        required={true}
                        placeholder={t('select.placeHolder')}
                        disabled={viewMode}
                    />

                    <FormInputPhone<IPessoaForm>
                        fieldPath="pessoa.contato"
                        placeholder={t('contact')}
                        disabled={viewMode}
                    />

                    <FormInput<IPessoaForm>
                        fieldPath="pessoa.email"
                        label={t('email')}
                        placeholder={t('email')}
                        disabled={viewMode}
                    />

                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 ">
                        <FormRadioButton<IPessoaForm, boolean>
                            fieldPath="pessoa.alvara"
                            label={t('Alvará')}
                            info={t(
                                'if marked as Yes it will not calculate the ISS',
                            )}
                            required={true}
                            options={[
                                { value: true, label: 'Sim' },
                                { value: false, label: 'Não' },
                            ]}
                        />

                        {alvara ? (
                            <FormInput<IPessoaForm>
                                fieldPath="pessoa.numAlvara"
                                label={t('Número Alvará')}
                                placeholder={t('Alvará')}
                                disabled={viewMode}
                                required={alvara}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TabPessoa;
