export default interface provedorCriptografia {
    criptografar(texto: string): string;
    comparar(senha: string, senhaCriptografada: string): boolean;
}