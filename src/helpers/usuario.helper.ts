export class UsuarioHelper {
  public static calcularIdade(dataNascimento: string): number {
    const hoje = new Date();
    const dataNascimentoFormatada = new Date(dataNascimento);
    const anoNascimento = dataNascimentoFormatada.getFullYear();
    const mesNascimento = dataNascimentoFormatada.getMonth();
    const diaNascimento = dataNascimentoFormatada.getDay();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();

    let idade = anoAtual - anoNascimento;

    if (
      mesAtual < mesNascimento ||
      (mesAtual === mesNascimento && diaAtual < diaNascimento)
    ) {
      idade--;
    }

    return idade;
  }
}
