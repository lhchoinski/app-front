import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { showErrorToast } from '@/components/SweetAlert';
import { findById, getPdfFile } from '@/services/GenericService';
import BreadCrumbs from '@/components/BreadCrumbs';
import { useTranslation } from 'react-i18next';
import { IHistorico, IReciboResponse } from '@/pages/Recibos/interfaces';
import { convertDateDbToBr } from '@/helpers/DateHelper';
import DataTableBasic from '@/components/DataTable/Basic';
import { Box, Stack, Table } from '@mantine/core';
import classes from './details.module.css';
import { formatMoneyBR } from '@/helpers/FormatDataHelper';
import { convertDateTimeZoneDbToBr } from '@/helpers/DateHelper/convertDateSimple';

const ReciboView = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const [currentData, setCurrentData] = useState<IReciboResponse>();
    const [loading, setLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const breadcrumbItems = [
        {
            label: t('receipts'),
            uri: '/recibos',
            icon: 'BiSolidReceipt',
        },
        { label: t('view'), icon: 'MdRemoveRedEye' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (id) {
                    const reciboResponse = await findById('recibos', id);
                    setCurrentData(reciboResponse.data as any);

                    const response = await getPdfFile<Blob>(
                        `recibos/${id}/pdf`,
                    );
                    const url = window.URL.createObjectURL(response.data);
                    setPdfUrl(url);
                }
            } catch (error) {
                showErrorToast();
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const columns = [
        { accessor: 'ref', title: 'Ref' },
        {
            accessor: 'operacao',
            title: 'Operação',
            render: (item: IHistorico) => {
                if (item.operacao === 'C') return 'Cadastrar';
                if (item.operacao === 'U') return 'Editar';
                if (item.operacao === 'S') return 'Alterado Status';
                return '-';
            },
        },
        { accessor: 'usuarioNome', title: 'Usuário' },
        {
            accessor: 'dtCadastrado',
            title: 'Data',
            render: (item: IHistorico) => {
                if (item.dtCadastrado) {
                    return convertDateTimeZoneDbToBr(item.dtCadastrado);
                }
                return '';
            },
        },
    ];

    const [data, setData] = useState<IHistorico[]>([]);

    useEffect(() => {
        findById<IHistorico[]>('recibo/historico', `${id}`).then(r =>
            setData(r.data),
        );
    }, [id]);

    return (
        <div>
            <BreadCrumbs items={breadcrumbItems} />

            <div className="panel mt-6 gap-4">
                <div className="p-5">
                    {currentData && (
                        <div className="mb-5 text-lg font-bold">
                            {t('receipts')} - {currentData.id}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex items-center justify-between">
                            <div className="font-bold">{t('people')}:</div>
                            <div>{currentData?.pessoa.nome || '-'}</div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="font-bold">{t('award')}:</div>
                            <div>{currentData?.premio ? 'Sim' : 'Não'}</div>
                        </div>

                        <div className="w-full space-y-5">
                            <div className="flex items-center justify-between">
                                <div className="font-bold">{t('code')}:</div>
                                <div>{`${currentData?.codRecibo || '-'}`}</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="font-bold">{t('font')}:</div>
                            <div>{currentData?.fonte.descricao || '-'}</div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="font-bold">{t('dateIssue')}:</div>
                            <div>{`${convertDateDbToBr(currentData?.dataEmissao as string)}`}</div>
                        </div>

                        <div className="w-full space-y-5">
                            <div className="flex items-center justify-between">
                                <div className="font-bold">
                                    {t('grossValue')}:
                                </div>
                                <div>{`${formatMoneyBR(currentData?.valorBruto || 0)}`}</div>
                            </div>
                        </div>

                        <div className="w-full space-y-5">
                            <div className="flex items-center justify-between">
                                <div className="font-bold">
                                    {t('liquidValue')}:
                                </div>
                                <div>{`${formatMoneyBR(currentData?.valorLiquido || 0)}`}</div>
                            </div>
                        </div>

                        <div className="w-full space-y-5">
                            <div className="flex items-center justify-between">
                                <div className="font-bold">
                                    {t('date.payment')}:
                                </div>
                                <div>{`${convertDateDbToBr(currentData?.dataPagamento as string)}`}</div>
                            </div>
                        </div>

                        <div className="w-full space-y-5">
                            <div className="flex items-center justify-between">
                                <div className="font-bold">
                                    {t('date.low')}:
                                </div>
                                {currentData?.dataBaixa != null ? (
                                    <div>{`${convertDateDbToBr(currentData?.dataBaixa)}`}</div>
                                ) : (
                                    <div>Recibo ainda Pendente</div>
                                )}
                            </div>
                        </div>

                        <div className="w-full space-y-5">
                            <div className="flex items-center justify-between">
                                <div className="font-bold">
                                    {t('date.prevPayment')}:
                                </div>
                                <div>{`${convertDateDbToBr(currentData?.dataPrevPagamento as string)}`}</div>
                            </div>
                        </div>
                    </div>

                    <hr className="mt-5 mb-5" />

                    {pdfUrl && (
                        <iframe
                            src={pdfUrl}
                            style={{
                                width: '100%',
                                height: '600px',
                                border: 'none',
                            }}
                            title="Recibo PDF"
                        />
                    )}
                </div>

                <div className="panel">
                    <div className="p-5">
                        <div className="text-2xl font-extrabold dark:text-white">
                            {t('history')}
                        </div>
                    </div>
                    <DataTableBasic<IHistorico>
                        columns={columns}
                        data={data}
                        disablePagination={true}
                        hideSearch={true}
                        rowExpansion={{
                            content: ({ record }) => (
                                <Stack
                                    p="xs"
                                    gap={6}
                                    className={classes.details}
                                >
                                    {record.alteracoes ? (
                                        record.alteracoes.map(
                                            (alteracao, index) => (
                                                <Box key={index}>
                                                    {alteracao.alteracoes
                                                        .length > 0 ? (
                                                        <Table highlightOnHover>
                                                            <thead>
                                                                <tr>
                                                                    <th
                                                                        className="text-center"
                                                                        colSpan={
                                                                            4
                                                                        }
                                                                    >
                                                                        {
                                                                            alteracao.origem
                                                                        }
                                                                    </th>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        Parâmetro
                                                                    </th>
                                                                    <th>
                                                                        Alias
                                                                    </th>
                                                                    <th>
                                                                        Valor
                                                                        Antigo
                                                                    </th>
                                                                    <th>
                                                                        Valor
                                                                        Novo
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {alteracao.alteracoes.map(
                                                                    (
                                                                        item,
                                                                        idx,
                                                                    ) => (
                                                                        <tr
                                                                            key={
                                                                                idx
                                                                            }
                                                                        >
                                                                            <td>
                                                                                {
                                                                                    item.parameter
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    item.alias
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {item.oldValue ===
                                                                                    null ||
                                                                                item.oldValue ===
                                                                                    undefined
                                                                                    ? 'vazio'
                                                                                    : record.operacao ===
                                                                                        'S'
                                                                                      ? item.oldValue ===
                                                                                        'true'
                                                                                          ? 'pago'
                                                                                          : item.oldValue ===
                                                                                              'false'
                                                                                            ? 'pendente'
                                                                                            : item.oldValue
                                                                                      : record.operacao ===
                                                                                          'U'
                                                                                        ? item.oldValue ===
                                                                                          'true'
                                                                                            ? 'Sim'
                                                                                            : item.oldValue ===
                                                                                                'false'
                                                                                              ? 'Não'
                                                                                              : item.oldValue
                                                                                        : item.oldValue}{' '}
                                                                            </td>
                                                                            <td>
                                                                                {item.newValue ===
                                                                                    null ||
                                                                                item.newValue ===
                                                                                    undefined
                                                                                    ? 'vazio'
                                                                                    : record.operacao ===
                                                                                        'S'
                                                                                      ? item.newValue ===
                                                                                        'true'
                                                                                          ? 'pago'
                                                                                          : item.newValue ===
                                                                                              'false'
                                                                                            ? 'pendente'
                                                                                            : item.newValue
                                                                                      : record.operacao ===
                                                                                          'U'
                                                                                        ? item.newValue ===
                                                                                          'true'
                                                                                            ? 'Sim'
                                                                                            : item.newValue ===
                                                                                                'false'
                                                                                              ? 'Não'
                                                                                              : item.newValue
                                                                                        : item.newValue}{' '}
                                                                            </td>
                                                                        </tr>
                                                                    ),
                                                                )}
                                                            </tbody>
                                                        </Table>
                                                    ) : (
                                                        ''
                                                    )}
                                                </Box>
                                            ),
                                        )
                                    ) : (
                                        <div>
                                            <span>Não contém alterações!</span>
                                        </div>
                                    )}
                                </Stack>
                            ),
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReciboView;
