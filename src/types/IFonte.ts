export interface IFonteResponse {
    id: number;
    fonte: number;
    descricao: string;
    status: boolean;
}

export interface IFonteRequest {
    id?: number;
    fonte: number;
    descricao: string;
    status: boolean;
}

export interface IFonteForm {
    fonte: {
        id?: number | null;
        fonte: number | null;
        descricao: string | null;
        status?: boolean | null;
    }
}

