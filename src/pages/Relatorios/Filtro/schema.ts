import * as Yup from 'yup';

export const schemaRelatorioFiltro = Yup.object({
    dataInicial: Yup.string().required(),
    dataFinal: Yup.string().required(),
    fontes: Yup.number(),
    tipoData: Yup.string().required()
});
