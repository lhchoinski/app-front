export interface IValorFaixa {
    id: number;
    valorInicial: number;
    valorFinal: number;
    aliquota: number;
    parcelaDeduzir: number;
}

export interface IImpostoForm {
    imposto: {
        id?: string | null;
        nome: string;
        valor: number | undefined;
        teto?: number | null;
        valorFaixas: IValorFaixa[] | undefined;
    }
}

export interface IImpostoRequest {
    id?: string
    nome: string;
    valor: number;
    teto?: number | null;
    valorFaixas: IValorFaixa[];
}

export interface IImpostoResponse {
    id: string
    nome: string;
    valor: number;
    teto?: number | null;
    valorFaixas: IValorFaixa[];
}

