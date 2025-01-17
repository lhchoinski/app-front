import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import BreadCrumbs from '@/components/BreadCrumbs';
import DataTableApi from '@/components/DataTable/Api';
import { DataTableColumn } from 'mantine-datatable';
import { useTranslation } from 'react-i18next';
import { IPessoaResponse } from '@/types/IPessoa';
import React, { useEffect } from 'react';
import { formatCpf, formatPhone } from '@/helpers/FormatDataHelper';
import { IContextMenuButton } from '@/components/ContextMenu/interfaces';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';

const Pessoas = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Pessoas'));
    });

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('home'),
            icon: 'GoHomeFill',
        },
        {
            label: t('people'),
            icon: 'FaPeopleGroup',
        },
    ];

    const apiRoute = 'pessoas';

    const columns: DataTableColumn<IPessoaResponse>[] = [
        {
            accessor: 'nome',
            title: t('name'),
            render: (item: any) =>
                item.nome ? (
                    item.nome
                ) : (
                    <span className="badge bg-dark">{t('not_informed')}</span>
                ),
        },
        {
            accessor: 'cpf',
            title: t('document'),
            render: (item: any) => item.cpf ? <div>{formatCpf(item.cpf)}</div> : item.passaporte,
        },
        {
            accessor: 'nacionalidade',
            title: t('nationality'),
            render: (item: any) =>
                item.nacionalidade ? (
                    item.nacionalidade
                ) : (
                    <span className="badge bg-dark">{t('not_informed')}</span>
                ),
        },
        {
            accessor: 'contato',
            title: t('contact'),
            render: (item: any) => (
                <div>
                    {item.contato ? (
                        formatPhone(item.contato)
                    ) : (
                        <span className="badge bg-dark">
                            {t('not_informed')}
                        </span>
                    )}
                </div>
            ),
        },
        {
            accessor: 'endereco.completo',
            title: t('address'),
            render: (item: any) =>
                item.endereco?.completo ? (
                    item.endereco.completo
                ) : (
                    <span className="badge bg-dark">{t('not_informed')}</span>
                ),
        },
    ];

    const customButtons = (
        item: IPessoaResponse
    ): IContextMenuButton<IPessoaResponse>[] => {
        return [
            {
                text: t('view'),
                icon: t('FaEye'),
                to: `/pessoas/visualizar/${item.id}`,
            },
        ];
    };

    return (
        <div>
            <BreadCrumbs items={breadCrumbsItems} />

            <DataTableApi
                apiRoute={apiRoute}
                columns={columns}
                customButtons={customButtons}
            />
        </div>
    );
};

export default Pessoas;
