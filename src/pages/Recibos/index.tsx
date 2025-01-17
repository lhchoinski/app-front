import BreadCrumbs from '@/components/BreadCrumbs';
import DataTableApi from '@/components/DataTable/Api';
import React, { useEffect } from 'react';
import { DataTableColumn } from 'mantine-datatable';
import { IReciboResponse } from '@/pages/Recibos/interfaces';
import { useTranslation } from 'react-i18next';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import { IContextMenuButton } from '@/components/ContextMenu/interfaces';
import { convertDateDbToBr } from '@/helpers/DateHelper';
import { formatMoneyBR } from '@/helpers/FormatDataHelper';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';

const Recibos = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Recibos'));
    });

    const apiRoute = 'recibos';

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('home'),
            icon: 'GoHomeFill',
        },
        {
            label: t('receipts'),
            icon: 'BiSolidReceipt',
        },
    ];

    // @ts-ignore
    const columns: DataTableColumn<IReciboResponse>[] = [
        {
            accessor: 'codRecibo',
            title: t('code'),
        },
        {
            accessor: 'pessoa.nome',
            title: t('people'),
        },
        {
            accessor: 'dataEmissao',
            title: t('date.issue'),
            render: ({ dataEmissao }) => convertDateDbToBr(dataEmissao),
        },
        {
            accessor: 'valorBruto',
            title: t('grossValue'),
            render: ({ valorBruto }) => formatMoneyBR(valorBruto),
        },
        {
            accessor: 'valorLiquido',
            title: t('netValue'),
            render: ({ valorLiquido }) => formatMoneyBR(valorLiquido),
        },
        {
            accessor: 'dataPrevPagamento',
            title: t('date.prevPayment'),
            render: ({ dataPrevPagamento }) =>
                convertDateDbToBr(dataPrevPagamento),
        },
        {
            accessor: 'dataPagamento',
            title: t('date.payment'),
            render: ({ dataPagamento }) => convertDateDbToBr(dataPagamento),
        },
        {
            accessor: 'status',
            title: t('status'),
            width: 80,
            textAlign: 'center',
            render: (record: IReciboResponse) => (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    {record['status'] ? (
                        <span className="badge bg-primary">{t('paid')}</span>
                    ) : (
                        <span className="badge bg-danger">{t('pending')}</span>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div>
            <BreadCrumbs items={breadCrumbsItems} />

            <DataTableApi
                apiRoute={apiRoute}
                columns={columns}
                hideActionButtomDelete={true}
                hideColumnActive={true}
                CustomTextEnableActionButton={'Dar Baixa'}
                CustomTextDisableActionButton={'Pendente'}
                CustomIconEnableActionButton={'FaClipboardCheck'}
                CustomIconDisableActionButton={'MdPendingActions'}
                CustomEnableStatusSelect={'Pagos'}
                CustomDisableStatusSelect={'Pendentes'}
                ModalTitleEnable={'Dar Baixa'}
                ModaltextEnable={'Deseja dar baixa nesse recibo ?'}
                ModaltextDisable={'Deseja voltar para pendente ?'}
                ModalTitleDisable={'Pentente'}
                InitStatus={null}
                customButtons={i => {
                    return [
                        {
                            text: 'Visualizar',
                            icon: 'MdRemoveRedEye',
                            to: `/recibos/visualizar/${i.id}`,
                        },
                    ] as IContextMenuButton<IReciboResponse>[];
                }}
            />
        </div>
    );
};

export default Recibos;
