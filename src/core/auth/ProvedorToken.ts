export default interface ProvedorToken {
    gerar(usuario: string | object): string;
    verificar(token: string): string | object;
}