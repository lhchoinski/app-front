import { IImpostoForm, IImpostoRequest, IImpostoResponse, IValorFaixa } from '@/types/IImposto';
import { extractNumbersMoneyBR } from '@/helpers/DataHelper/extractNumbers';

export const defaultValues = (id: string | null): IImpostoForm => {
    return {
        imposto: {
            nome: '',
            valor: undefined,
            teto: null,
            valorFaixas: undefined
        }
    };
};

export const impostoResponseToForm = (data: IImpostoResponse): IImpostoForm => {
    return {
        imposto: {
            id: data.id,
            nome: data.nome,
            valor: data.valor,
            teto: data.teto,
            valorFaixas: data.valorFaixas
        }
    };
};

export const impostoFormToResquest = (data: IImpostoForm): IImpostoRequest => {
    return {
        id: data.imposto.id ? data.imposto.id : undefined,
        nome: data.imposto.nome,
        valor: data.imposto.valor as number,
        teto: extractNumbersMoneyBR(data.imposto.teto?.toString()),
        valorFaixas: data.imposto.valorFaixas as IValorFaixa[]
    };
};
