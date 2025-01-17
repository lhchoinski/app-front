import { IPessoaResponse } from '@/types/IPessoa';
import { IFonteResponse } from '@/types/IFonte';

export interface IReciboValores {
    id: number | null;
    idRecibo: number | null;
    descricao: string | null;
    valor: number | null;

    [key: string]: any;
}

export interface IReciboForm {
    recibo: {
        id?: number | null;
        idPessoa: string | null;
        codFonte: number | null;
        valorBruto: number | null;
        reciboValores?: IReciboValores[] | null;
        dataPagamento: string | null;
        dataPrevPagamento: string | null;
        dataBaixa?: string | null
        premio: boolean;
        status?: boolean | null;
    };
    descricao: {
        descricao: string | null;
    };
}

export interface IReciboRequest {
    id?: number | null;
    idPessoa: string;
    codFonte: number;
    valorBruto: number | null;
    reciboValores?: IReciboValores[];
    dataPagamento: string;
    dataPrevPagamento: string;
    dataBaixa?: string;
    premio: boolean;
    status?: boolean | null;
    descricao: string | null;
}

export interface IReciboResponse {
    id: number;
    pessoa: IPessoaResponse;
    fonte: IFonteResponse;
    descricao: string | null;
    codRecibo: string;
    valorBruto: number;
    iss: number;
    irpf: number;
    inss: number;
    valorLiquido: number;
    reciboValores?: IReciboValores[];
    dataPagamento: string;
    dataPrevPagamento: string;
    dataBaixa: string | null;
    dataEmissao: string;
    premio: boolean;
    status: boolean;
}

export interface IHistorico {
    id: number;
    idOcorrencia: number;
    ref: string;
    operacao: string;
    alteracoes: IHistoricoAlteracoes[];
    usuarioId: string;
    usuarioNome: string;
    dtCadastrado: string;
}

export interface IHistoricoAlteracoes {
    origem: string;
    alteracoes: IHistoricoAlteracoesAlt[];
}

export interface IHistoricoAlteracoesAlt {
    parameter: string | string[];
    alias: string;
    oldValue: string | null;
    newValue: string | null;
}
