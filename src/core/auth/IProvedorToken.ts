export default interface IProvedorToken {
    gerar(usuario: string | object): string;
    verificar(token: string): string | object;
}