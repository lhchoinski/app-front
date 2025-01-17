import React, { useEffect, useState } from 'react';
import Breadcrumbs from '@/components/BreadCrumbs';
import { useTranslation } from 'react-i18next';
import RelatorioFiltro from '@/pages/Relatorios/Filtro';
import { gerarPDF, relatorioFindAll } from '@/pages/Relatorios/Periodo/service';
import { IPeriodoResultadoFinal } from './interfaces';
import { IRelatorioPeriodoFiltro } from '@/pages/Relatorios/Periodo/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaRelatorioPeriodoFiltro } from '@/pages/Relatorios/Periodo/schema';
import { Resolver } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useCoreLoader } from '@/providers/LoaderProvider';
import './index.css';
import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import BreadCrumbs from '@/components/BreadCrumbs';

const RelatorioPeriodo = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const { startLoading, stopLoading } = useCoreLoader();
    const [filterValues, setFilterValues] = useState<IRelatorioPeriodoFiltro>({
        dataInicial: '',
        dataFinal: '',
        codFonte: null,
        tipoData: '1'
    });
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle('Relatórios'));
    }, [dispatch]);

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('home'),
            icon: 'GoHomeFill'
        },
        {
            label: t('reports'),
            icon: 'TbFileAnalytics'
        }
    ];

    const searchEvent = async (values: IRelatorioPeriodoFiltro) => {
        setFilterValues(values);
        setRefresh(true);
        await handleGerarPDF(values); // Chama a geração do PDF diretamente
    };

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                await relatorioFindAll(filterValues);
            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
            } finally {
                setRefresh(false);
                setLoading(false);
            }
        };

        if (refresh) {
            getData();
        }
    }, [refresh, filterValues]);

    const handleGerarPDF = async (values: IRelatorioPeriodoFiltro) => {
        startLoading();
        try {
            const pdfUrl = await gerarPDF(values); // Agora, gerarPDF retorna a URL diretamente
            setPdfUrl(pdfUrl); // Armazena a URL no estado
        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
        } finally {
            stopLoading();
        }
    };

    return (
        <div>
            <BreadCrumbs items={breadCrumbsItems} />

            <div className="panel mt-6 gap-4">
                <RelatorioFiltro<IRelatorioPeriodoFiltro>
                    searchEvent={searchEvent}
                    refresh={refresh}
                    initialValues={filterValues}
                    resolver={yupResolver(schemaRelatorioPeriodoFiltro) as Resolver<IRelatorioPeriodoFiltro>}
                />
            </div>

            <div className="panel mt-6 gap-4">
                {pdfUrl && (
                    <iframe
                        src={pdfUrl}
                        style={{ width: '100%', height: '600px', border: 'none' }}
                        title="Relatório PDF"
                    />
                )}
            </div>
        </div>
    );
};

export default RelatorioPeriodo;
