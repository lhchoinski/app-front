import * as Yup from 'yup';

export const schemaLogin = Yup.object({
    login: Yup.string().required(),
    password: Yup.string().required(),
});
