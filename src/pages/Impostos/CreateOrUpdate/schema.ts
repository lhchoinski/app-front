import * as Yup from 'yup';

export const schemaImposto = Yup.object({
    imposto: Yup.object({
        nome: Yup.string().required()
    }),
});
