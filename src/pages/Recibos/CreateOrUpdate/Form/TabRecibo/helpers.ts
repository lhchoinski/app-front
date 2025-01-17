import {
    IReciboForm,
    IReciboRequest,
    IReciboResponse,
} from '@/pages/Recibos/interfaces';
import { extractNumbersMoneyBR } from '@/helpers/DataHelper/extractNumbers';

export const defaultValues = (id: number | null): IReciboForm => {
    return {
        recibo: {
            id: id,
            idPessoa: null,
            codFonte: null,
            valorBruto: null,
            reciboValores: null,
            dataPagamento: null,
            dataPrevPagamento: null,
            dataBaixa: null,
            premio: false,
        },
        descricao: {
            descricao:
                'Recebi do Centro Cultural Teatro Guaíra, estabelecido na Rua XV de Novembro, ' +
                's/n, Curitiba-PR, inscrito no CNPJ sob o nº 76.695.204/0001-56, a importância ' +
                'acima mencionada, já deduzidos os descontos legais discriminados, referente a...',
        },
    };
};

export const reciboResponseToForm = (data: IReciboResponse): IReciboForm => {
    return {
        recibo: {
            id: data.id,
            idPessoa: data.pessoa.id,
            codFonte: data.fonte.fonte,
            valorBruto: data.valorBruto,
            reciboValores: data.reciboValores,
            dataPagamento: data.dataPagamento,
            dataBaixa: data.dataBaixa,
            dataPrevPagamento: data.dataPrevPagamento,
            premio: data.premio,
        },
        descricao: {
            descricao: data.descricao,
        },
    };
};

export const reciboFormToRequest = (data: IReciboForm): IReciboRequest => {
    return {
        id: data.recibo.id,
        idPessoa: data.recibo.idPessoa as string,
        codFonte: data.recibo.codFonte as number,
        descricao: data.descricao.descricao as string,
        valorBruto: extractNumbersMoneyBR(data.recibo.valorBruto?.toString()),
        reciboValores:
            data.recibo.reciboValores?.filter(
                val =>
                    val.valor !== null &&
                    val.valor !== 0 &&
                    val.descricao !== '',
            ) ?? [],
        dataPagamento: data.recibo.dataPagamento as string,
        dataPrevPagamento: data.recibo.dataPrevPagamento as string,
        dataBaixa: data.recibo.dataBaixa as string,
        premio: data.recibo.premio,
    };
};
