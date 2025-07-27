export default interface ICasoDeUso<Entrada, Saida> {
    executar(entrada: Entrada): Promise<Saida>;
}