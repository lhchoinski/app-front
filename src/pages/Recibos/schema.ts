import * as Yup from 'yup';
import i18n from '@/i18n';

export const schemaRecibo = Yup.object({
    recibo: Yup.object({
        idPessoa: Yup.string().required(),
        codFonte: Yup.number().required(),
        valorBruto: Yup.string().required(),
        dataPagamento: Yup.string().required(),
        dataBaixa: Yup.string().optional().nullable(),
        dataPrevPagamento: Yup.string().required(),
        premio: Yup.boolean().required(),
    }),
    descricao: Yup.object({
        descricao: Yup.string().required(),
    })
});
