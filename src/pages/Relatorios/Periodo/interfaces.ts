import { IRelatorioFiltro } from '@/pages/Relatorios/Filtro/interfaces';
import { IReciboResponse } from '@/pages/Recibos/interfaces';

export interface IRelatorioPeriodoFiltro extends IRelatorioFiltro {}

export interface IPeriodoResultadoFinal {
    resultadoRecibo: {
        [x: string]: any;
        pessoaId: string;
        recibos: IReciboResponse;
        totalAgrupadoValorBruto: number;
        totalAgrupadoIss: number;
        totalAgrupadoInss: number;
        totalAgrupadoIrpf: number;
    };
    totalPessoas: number;
    valorBrutoTotal: number;
    valorLiquidoTotal: number;
    issTotal: number;
    irpfTotal: number;
    inssTotal: number;
    outrosValoresTotal: number;
}
