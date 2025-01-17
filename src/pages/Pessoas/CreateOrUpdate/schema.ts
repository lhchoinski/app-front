import * as Yup from 'yup';

export const schemaPessoa = Yup.object({
    pessoa: Yup.object({
        nome: Yup.string().required(),
        dataNascimento: Yup.string().required(),
        nacionalidade: Yup.string().required(),
        cpf: Yup.string()
            .nullable()
            .when('nacionalidade', {
                is: (v: string) => v === 'Brasileiro',
                then: () => Yup.string().required().cpf(),
                otherwise: () => Yup.string().optional().nullable(),
            }),
        passaporte: Yup.string()
            .nullable()
            .when('nacionalidade', {
                is: (v: string) => v === 'Estrangeiro',
                then: () => Yup.string().required(),
                otherwise: () => Yup.string().optional().nullable(),
            }),
        alvara: Yup.boolean().required(),
        numAlvara: Yup.string()
            .nullable()
            .when('alvara', {
                is: (v: boolean) => v,
                then: () => Yup.string().required(),
                otherwise: () => Yup.string().optional().nullable()
            }),
    }),
    endereco: Yup.object({
        rua: Yup.string().required(),
        cidade: Yup.string().required(),
        bairro: Yup.string().required(),
        cep: Yup.string().required(),
        numero: Yup.string().required(),
        estado: Yup.string().required(),
        pais: Yup.string().required(),
    }),
});
