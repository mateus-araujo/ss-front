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
    cep: string;
    bairro: string;
    cidade: string;
    estado: string;
    numero: string;
    descricao: string;
    avaliacao: string;
    foto: string;
    tipo_prestador: string;
    usuario_id: number;
    id_serv_1: number;
    id_serv_2: number;
    id_serv_3: number;

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