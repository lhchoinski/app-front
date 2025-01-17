export interface IPessoaResponse {
    id: string;
    nome: string;
    dataNascimento: string;
    cpf: string;
    passaporte: string | null;
    nacionalidade: string;
    endereco: {
        id: number | null;
        rua: string;
        cidade: string;
        bairro: string;
        cep: string;
        numero: number;
        complemento: string;
        estado: string;
        pais: string;
        completo: string;
    };
    contato: string;
    email: string;
    alvara: boolean | null;
    numAlvara: string | null;
    status: boolean;
}

export interface IPessoaRequest {
    id?: string | null;
    nome: string;
    dataNascimento: string | null;
    cpf: string | null;
    passaporte: string | null;
    nacionalidade: string | null;
    endereco: {
        id?: number | null;
        rua: string;
        cidade: string;
        bairro: string;
        cep: string | null;
        numero: number | null;
        complemento: string;
        estado: string;
        pais: string;
    };
    contato: string | null;
    email: string | null;
    alvara: boolean | null;
    numAlvara: string | null;
    status?: boolean | null;
}

export interface IPessoaForm {
    pessoa: {
        id?: string | null | undefined;
        nome: string;
        dataNascimento: string | null;
        cpf: string | null | undefined;
        passaporte: string | null;
        nacionalidade: string | null;
        contato: string;
        email: string;
        alvara: boolean | null
        numAlvara: string | null
        status?: boolean | null | undefined;
    };
    endereco: {
        id?: number | null;
        rua: string;
        cidade: string;
        bairro: string;
        cep: string;
        numero: number | undefined;
        complemento: string;
        estado: string;
        pais: string;
        completo: string;
    };
}
