import { Usuario } from '@app/types/entities/usuario.entity';
import { UsuarioAssembler } from '../../../src/modules/usuario/assembler/usuarioAssembler';
var usuarioCreationMock = require('../mock/UsuarioCreationRequestMock.json');

describe('UsuarioAssembler', () => {
  describe('assembleCreateUsuarioToDto', () => {
    //teste para verificar se a função que transforma o usuário em DTO está funcionando corretamente
    it('should remove password from response', async () => {
      // Cria um novo usuário
      const novoUsuario: Usuario = usuarioCreationMock;

      //chama o método assembleCreateUsuarioToDto para transformar o retorno do banco em dto
      const UsuarioWithousPass =
        UsuarioAssembler.assembleCreateUsuarioParaDto(novoUsuario);

      // Verifica se a função transformou corretamente o usuário em Dto
      expect(UsuarioWithousPass.nome).toStrictEqual(novoUsuario.nome);
      expect(UsuarioWithousPass.email).toStrictEqual(novoUsuario.email);
      expect(UsuarioWithousPass.dataDeNascimento).toStrictEqual(novoUsuario.dataDeNascimento);
    });
  });
});
