/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup';
export const yupLang = {
    default: {
        mixed: {
            required: 'Este campo é obrigatório',
            oneOf: 'O valor deve ser um dos seguintes: ${values}',
            defined: 'O valor não deve ser indefinido',
            notNull: 'O valor não pode ser null',
            notOneOf:
                '${path} não deve ter nenhum dos seguintes valores: ${values}',
            notType: ({ path, type, value, originalValue }: any) => {
                const isCast = originalValue != null && originalValue !== value;
                let msg =
                    path +
                    ' deve ser do tipo `' +
                    type +
                    '`, ' +
                    ('mas o valor final foi: `' +
                        Yup.printValue(value, true) +
                        '`') +
                    (isCast
                        ? ' (cast do valor `' +
                        Yup.printValue(originalValue, true) +
                        '`).'
                        : '.');

                if (value === null) {
                    msg +=
                        '\n Se a intenção era usar "null" como um valor em branco marque o esquema como `.nullable()`';
                }

                return msg;
            },
        },
        string: {
            min: 'O campo deve ter pelo menos ${min} caracteres',
            max: 'O campo pode ter no máximo ${max} caracteres',
            email: 'Formato de e-mail inválido',
            length: 'O campo deve ter exatamente ${length} caracteres',
            matches: 'Deve corresponder ao padrão: "${regex}"',
            url: 'Formato de url inválido',
            uuid: 'Formato de UUID inválido',
            trim: 'Não deve conter espaços no início nem no fim',
            lowercase: 'O campo deve estar em letras minúsculas',
            uppercase: 'O campo deve estar em letras maiúsculas',
        },
        number: {
            min: 'O valor dev ser maior ou igual a ${min}',
            max: 'O valor dev ser menor ou igual a ${max}',
            lessThan: 'O valor deve ser menor que ${less}',
            moreThan: 'O valor deve ser maior que ${more}',
            positive: 'O valor deve ser um número positivo',
            negative: 'O valor deve ser um número negativo',
            integer: 'O valor deve ser um número inteiro',
        },
        date: {
            min: 'A data deve ser depois de ${min}',
            max: 'A data deve ser antes de ${max}',
        },
        array: {
            min: 'O campo deve conter pelo menos ${min} itens',
            max: 'O campo deve conter no máximo ${max} itens',
            length: ({ path, type, value, originalValue, length }: any) => {
                return (
                    path +
                    ' deve ter ' +
                    length +
                    ' ' +
                    (length === 1 ? 'item' : 'itens')
                );
            },
        },
        object: {
            noUnknown: 'O campo tem chaves desconhecidas: ${unknown}',
        },
        boolean: {
            isValue: 'O campo deve ser ${value}',
        },
    },
    cpf: {
        invalid: 'CPF Inválido',
    },
    cnpj: {
        invalid: 'CNPJ Inválido',
    },
    customDate: {
        invalid: 'Data inválida',
    },
    phone: {
        invalid: 'Telefone inválido',
    },
    file: {
        invalidFile: 'O campo deve ser um arquivo válido',
        invalidType:
            'Tipo de arquivo inválido. Tipos permitidos: ${allowedExtensions}',
        maxSize: 'O arquivo deve ter no máximo ${maxSize}MB',
    },
    moneyBr: {
        invalid: 'Valor Inválido',
        notZero: 'Valor não pode ser R$ 0,00',
    },
};
