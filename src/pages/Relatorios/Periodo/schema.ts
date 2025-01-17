import * as Yup from 'yup';

export const schemaRelatorioPeriodoFiltro = Yup.object({
    dataInicial: Yup.string().required(),
    dataFinal: Yup.string().required(),
    tipoData: Yup.string().required(),
});
