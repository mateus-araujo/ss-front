export class User {
    // Usuário
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    tipo_usuario: number;

    // Prestador
    telefone: string;
    celular: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
    numero: string;
    complemento: string;
    cep: string;
    data_nasc: string;
    rg: string;
    aprovado: number;
    id_serv_1: number;
    id_serv_2: number;
    id_serv_3: number;
    descricao: string;
    avaliacao: string;
    foto: string;
    tipo: number;
    tipo_prestador: number;

    usuario_id: number;
    nome_serv_1: string;
    nome_serv_2: string;
    nome_serv_3: string;
    nome: string;

    // Pessoa Jurídica
    cpf: string;
    sexo: string;
    curriculum: string;

    // Pessoa Física
    cnpj: string;
    nome_fantasia: string;
    razao_social: string;
    prestador_id: number;
}