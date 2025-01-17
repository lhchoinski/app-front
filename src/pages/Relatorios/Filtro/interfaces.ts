import React from 'react';
import { FieldValues, Resolver } from 'react-hook-form';

export interface IRelatorioFiltroProps<T extends IRelatorioFiltro> {
    searchEvent: (values: T) => void;
    initialValues: T;
    children?: React.ReactNode;
    refresh: boolean;
    resolver: Resolver<T>;
    genericError?: string;
    onSubmitCallback?: (values: T) => void;
}

export interface IRelatorioFiltro extends FieldValues {
    dataInicial: string ;
    dataFinal: string ;
    fontes?: number | null;
    tipoData: string | null;
}

export interface IRelatorioPeriodoRequest {
    dataInicial: string ;
    dataFinal: string ;
    fontes?: number | null ;
    tipoData: string | null;
}
