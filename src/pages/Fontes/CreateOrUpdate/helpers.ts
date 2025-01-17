import { IFonteForm, IFonteRequest, IFonteResponse } from '@/types/IFonte';

export const defaultValues = (id: number | null): IFonteForm => {
    return {
        fonte: {
            id: id,
            fonte: null,
            descricao: null,
            status: null
        }
    }
}

export const fonteResponseToForm = (data: IFonteResponse): IFonteForm => {
    return {
        fonte: {
            id: data.id,
            fonte: data.fonte,
            descricao: data.descricao,
            status: data.status
        }
    }
}

export const fonteFormToResponse = (data: IFonteForm): IFonteRequest => {
    return {
        id: data.fonte.id as number,
        fonte: data.fonte.fonte as number,
        descricao: data.fonte.descricao as string,
        status: data.fonte.status as boolean,
    }
}
