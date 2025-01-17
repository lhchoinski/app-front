import { IPessoaForm, IPessoaRequest, IPessoaResponse } from '@/types/IPessoa';
import { extractNumbers } from '@/helpers/DataHelper';

export const defaultValues = (id: string | null): IPessoaForm => {
    return {
        pessoa: {
            id: id,
            nome: '',
            cpf: null,
            passaporte: null,
            dataNascimento: '',
            nacionalidade: null,
            contato: '',
            email: '',
            alvara: false,
            numAlvara: '',
            status: null,
        },
        endereco: {
            id: null,
            rua: '',
            cidade: '',
            bairro: '',
            cep: '',
            numero: undefined,
            complemento: '',
            estado: '',
            pais: '',
            completo: '',
        },
    };
};

export const pessoaResponseToForm = (data: IPessoaResponse): IPessoaForm => {
    return {
        pessoa: {
            id: data.id,
            nome: data.nome,
            cpf: data.cpf,
            passaporte: data.passaporte,
            dataNascimento: data.dataNascimento,
            nacionalidade: data.nacionalidade,
            contato: data.contato,
            email: data.email,
            alvara: data.alvara,
            numAlvara: data.numAlvara,
            status: data.status,
        },
        endereco: {
            id: data.endereco ? data.endereco.id : null,
            rua: data.endereco ? data.endereco.rua : '',
            cidade: data.endereco ? data.endereco.cidade : '',
            bairro: data.endereco ? data.endereco.bairro : '',
            cep: data.endereco ? data.endereco.cep : '',
            numero: data.endereco ? data.endereco.numero : undefined,
            complemento: data.endereco ? data.endereco.complemento : '',
            estado: data.endereco ? data.endereco.estado : '',
            pais: data.endereco ? data.endereco.pais : '',
            completo: data.endereco ? data.endereco.completo : '',
        },
    };
};

export const pessoaFormToResquest = (data: IPessoaForm): IPessoaRequest => {
    return {
        id: data.pessoa.id,
        nome: data.pessoa.nome,
        dataNascimento: data.pessoa.dataNascimento,
        cpf: data.pessoa.passaporte ? null : extractNumbers(data.pessoa.cpf),
        passaporte: data.pessoa.cpf ? null : data.pessoa.passaporte,
        nacionalidade: data.pessoa.nacionalidade,
        endereco: {
            id: data.endereco.id,
            rua: data.endereco.rua,
            cidade: data.endereco.cidade,
            bairro: data.endereco.bairro,
            cep: extractNumbers(data.endereco.cep),
            numero: data.endereco.numero as number,
            complemento: data.endereco.complemento,
            estado: data.endereco.estado,
            pais: data.endereco.pais,
        },
        contato: data.pessoa.contato ? data.pessoa.contato : null,
        email: data.pessoa.email ? data.pessoa.email : null,
        alvara: data.pessoa.alvara,
        numAlvara: data.pessoa.numAlvara ? data.pessoa.numAlvara : null,
        status: data.pessoa.status,
    };
};
