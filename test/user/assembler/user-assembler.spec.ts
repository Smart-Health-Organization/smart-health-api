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
      const usuarioWithousPass =
        UsuarioAssembler.assembleCreateUsuarioParaDto(novoUsuario);

      // Verifica se a função transformou corretamente o usuário em Dto
      expect(usuarioWithousPass.nome).toStrictEqual(novoUsuario.nome);
      expect(usuarioWithousPass.email).toStrictEqual(novoUsuario.email);
      expect(usuarioWithousPass.idade).toStrictEqual(novoUsuario.idade);
    });

    it('deve transformar uma entidade usuario em DTO', async () => {
      // Cria um novo usuário
      const novoUsuario: Usuario = usuarioCreationMock;

      //chama o método assembleCreateUsuarioToDto para transformar o retorno do banco em dto
      const usuarioDto = UsuarioAssembler.assembleUserToDto(novoUsuario);

      // Verifica se a função transformou corretamente o usuário em Dto
      expect(usuarioDto.id).toStrictEqual(novoUsuario.id);
      expect(usuarioDto.nome).toStrictEqual(novoUsuario.nome);
      expect(usuarioDto.email).toStrictEqual(novoUsuario.email);
      expect(usuarioDto.idade).toStrictEqual(novoUsuario.idade);
      expect(usuarioDto.sexo).toStrictEqual(novoUsuario.sexo);
    });

    it('deve transformar varias entidades usuario em DTO', async () => {
      const novoUsuario: Usuario = usuarioCreationMock;
      const outroNovoUsuario: Usuario = usuarioCreationMock;
      outroNovoUsuario.nome = 'Outro nome';
      outroNovoUsuario.email = 'outroemail@gmail.com';
      outroNovoUsuario.idade = 25;
      outroNovoUsuario.sexo = 'feminino';
      const listaDeUsuarios = [novoUsuario, outroNovoUsuario];

      const usuariosDto =
        UsuarioAssembler.assembleUsuariosParaDto(listaDeUsuarios);
      usuariosDto.forEach((usuarioDto, index) => {
        expect(usuarioDto.id).toStrictEqual(listaDeUsuarios[index].id);
        expect(usuarioDto.nome).toStrictEqual(listaDeUsuarios[index].nome);
        expect(usuarioDto.email).toStrictEqual(listaDeUsuarios[index].email);
        expect(usuarioDto.idade).toStrictEqual(listaDeUsuarios[index].idade);
        expect(usuarioDto.sexo).toStrictEqual(listaDeUsuarios[index].sexo);
      });
    });
  });
});
