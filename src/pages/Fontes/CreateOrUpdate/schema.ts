import * as Yup from 'yup';

export const schemaFonte = Yup.object({
    fonte: Yup.object({
        fonte: Yup.number().optional().required(),
        descricao: Yup.string().required()
    })
});
