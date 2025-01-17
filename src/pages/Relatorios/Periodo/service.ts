import { AxiosPromise } from 'axios';
import { CoreClient } from '@/services/ApiService';
import { IRelatorioPeriodoRequest } from '@/pages/Relatorios/Filtro/interfaces';
import { IPeriodoResultadoFinal } from '@/pages/Relatorios/Periodo/interfaces';

export const relatorioFindAll = (
    values: IRelatorioPeriodoRequest,
): AxiosPromise<IPeriodoResultadoFinal> => {
    return CoreClient.get(`/relatorio/periodo/recibos`, {
        params: values,
        paramsSerializer: {
            indexes: null,
        },
    });
};

export const gerarPDF = async (values: IRelatorioPeriodoRequest) => {
    try {
        const response = await CoreClient.get(
            `/relatorio/periodo/recibos/pdf`,
            {
                params: values,
                responseType: 'blob',
                paramsSerializer: {
                    indexes: null,
                },
            },
        );

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        return url;
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        throw error;
    }
};
