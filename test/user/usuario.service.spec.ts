import { RedefinirSenhaInsertDto } from '@app/types/dtos/insert/redefinir-senha.insert.dto';
import { UpdateUsuarioInsertDto } from '@app/types/dtos/insert/update-usuario.insert.dto';
import { UsuarioAssembler } from '@modules/usuario/assembler/usuarioAssembler';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsuarioService } from '../../src/modules/usuario/usuario.service';
import { Usuario } from '../../src/types/entities/usuario.entity';
var usuarioCreationMock = require('./mock/UsuarioCreationRequestMock.json');
var usuarioCreationResponseMock = require('./mock/UsuarioCreationResponseMock.json');
var usuariosResponseMock = require('./mock/UsuariosResponseMock.json');
var usuariosMock = require('./mock/UsuariosMock.json');

describe('UsuarioService', () => {
  let usuarioService: UsuarioService;
  let mockRepository: Partial<Repository<Usuario>>;

  //criando beforeEach para ser rodado antes de cada teste
  beforeEach(() => {
    //mockando retornos do método create do repositório
    mockRepository = {
      create: jest.fn().mockReturnValue(usuarioCreationMock),
      //mockando retornos do método save do repositório
      save: jest.fn().mockReturnValue(usuarioCreationMock),
      //mockando retornos do método find do repositório
      find: jest.fn().mockReturnValue(usuariosMock),
      findOne: jest.fn().mockReturnValue(null),
    };
    //instanciando o serviço
    usuarioService = new UsuarioService(mockRepository as Repository<Usuario>);
  });

  describe('createUsuario', () => {
    //teste para verificar se o método está retornando as mesmas informações
    //do usuário que deve ser criado
    it('Deve criar um novo usuario', async () => {
      // Cria um novo usuário
      const novoUsuario = usuarioCreationMock;

      // Chama a função createUsuario do UsuarioService e armazena o valor retornado
      const createdUsuario = await usuarioService.postUsuario(novoUsuario);

      // Verifica se o repositório mock foi chamado corretamente
      expect(mockRepository.create).toHaveBeenCalledWith(usuarioCreationMock);
      expect(mockRepository.save).toHaveBeenCalledWith(usuarioCreationMock);

      // Verifica se a função retornou corretamente o novo usuário criado
      expect(createdUsuario).toEqual(usuarioCreationResponseMock);
    });
  });

  describe('findUsuarios', () => {
    //teste para verificar se todos os usuários estão sendo retornados de acordo com o mock
    it('should return all usuarios', async () => {
      const allUsuarios = await usuarioService.getUsuarios();
      expect(allUsuarios).toStrictEqual(usuariosResponseMock);
    });
  });

  describe('getUsuarioByEmail', () => {
    it('deve retornar usuário de acordo com email', async () => {
      jest
        .spyOn(mockRepository, 'findOne')
        .mockResolvedValue(usuarioCreationMock);
      const usuario = await usuarioService.getUsuarioByEmail(
        'thi.sanches@hotmail.com',
      );
      expect(usuario).toStrictEqual(usuarioCreationMock);
    });

    it('deve retornar null quando um usuario nao for encontrado', async () => {
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(null);

      const userEmail = 'nonexistent@example.com';
      const user = await usuarioService.getUsuarioByEmail(userEmail);

      expect(user).toBeNull();
    });
  });

  describe('getUsuarioById', () => {
    it('deve atualizar usuário e retornar um UsuarioResponseDto', async () => {
      // Arrange
      const mockUserId = '1';
      const mockUser: Usuario = {
        id: +mockUserId,
        nome: 'Lucas Santos',
        email: 'lucas@example.com',
        dataDeNascimento: '2001-07-03T00:00:00.000Z',
        sexo: 'masculino',
        senha: 'senha',
        exames: [],
        metas: [],
        examesCompartilhados: [],
      };
      const mockUpdateData: UpdateUsuarioInsertDto = {
        nome: 'Updated Name',
        email: 'updated@example.com',
        dataDeNascimento: '2001-03-10T00:00:00.000Z',
      };
      const mockUpdatedUser: Usuario = {
        ...mockUser,
        ...mockUpdateData,
      };
      jest.spyOn(usuarioService, 'getUsuarioById').mockResolvedValue(mockUser);
      jest.spyOn(usuarioService, 'getUsuarioByEmail').mockResolvedValue(null);
      mockRepository.update = jest.fn().mockResolvedValue(undefined);
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(mockUpdatedUser);

      const updatedUser = await usuarioService.updateUsuario(
        mockUserId,
        mockUpdateData,
      );

      expect(updatedUser).toEqual(
        UsuarioAssembler.assembleUsuarioToDto({
          ...mockUser,
          ...mockUpdateData,
        }),
      );
    });

    it('deve lançar BadRequestException quando um email existente é utilizado', async () => {
      // Arrange
      const mockUserId = '1';
      const mockUser: Usuario = {
        id: +mockUserId,
        nome: 'John Doe',
        email: 'johndoe@example.com',
        dataDeNascimento: '2001-07-03T00:00:00.000Z',
        sexo: 'masculino',
        senha: 'senha',
        exames: [],
        metas: [],
        examesCompartilhados: [],
      };
      const mockUpdateData: UpdateUsuarioInsertDto = {
        nome: 'Updated Name',
        email: 'existing@example.com',
        dataDeNascimento: '2001-03-10T00:00:00.000Z',
      };
      jest.spyOn(usuarioService, 'getUsuarioById').mockResolvedValue(mockUser);
      jest
        .spyOn(usuarioService, 'getUsuarioByEmail')
        .mockResolvedValue(mockUser);

      await expect(
        usuarioService.updateUsuario(mockUserId, mockUpdateData),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateSenhaUsuario', () => {
    it('deve lançar UnauthorizedException para uma senha incorreta', async () => {
      // Arrange
      const mockUserId = '1';
      const mockUser: Usuario = {
        id: +mockUserId,
        nome: 'Lucas Santos',
        email: 'lucas@example.com',
        dataDeNascimento: '2001-07-03T00:00:00.000Z',
        sexo: 'masculino',
        senha: 'hashedPassword',
        exames: [],
        metas: [],
        examesCompartilhados: [],
      };
      const mockUpdateData: RedefinirSenhaInsertDto = {
        senhaAntiga: 'incorrectPassword',
        novaSenha: 'newHashedPassword',
      };
      jest.spyOn(usuarioService, 'getUsuarioById').mockResolvedValue(mockUser);

      await expect(
        usuarioService.updateSenhaUsuario(mockUserId, mockUpdateData),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
