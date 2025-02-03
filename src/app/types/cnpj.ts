import DtoEventoRetorno from "./dto_evento_retorno";

export default interface Cnpj extends DtoEventoRetorno {
    cnpjFormatado: {
        cnpj: string,
    }
}