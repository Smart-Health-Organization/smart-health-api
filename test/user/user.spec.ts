import { UserService } from '../../src/modules/user/user.service';
import { User } from '../../src/types/entities/user.entity';
import { Repository } from 'typeorm';
var userCreationMock = require("./mock/UserCreationRequestMock.json")
var userCreationResponseMock = require("./mock/UserCreationResponseMock.json")
var usersResponseMock = require("./mock/UsersResponseMock.json")
var usersMock = require("./mock/UsersMock.json")


describe('UserService', () => {
  let userService: UserService;
  let mockRepository: Partial<Repository<User>>;

  //criando beforeEach para ser rodado antes de cada teste
  beforeEach(() => {
    //mockando retornos do método create do repositório 
    mockRepository = {
      create: jest.fn().mockReturnValue(userCreationMock),
        //mockando retornos do método save do repositório
      save: jest.fn().mockReturnValue(userCreationMock),
        //mockando retornos do método find do repositório
        find: jest.fn().mockReturnValue(usersMock),
    };
    //instanciando o serviço
    userService = new UserService(mockRepository as Repository<User>);
  });

  describe('createUser', () => {
    //teste para verificar se o método está retornando as mesmas informações
    //do usuário que deve ser criado
    it('should create and return a new user', async () => {
      // Cria um novo usuário
      const newUser =userCreationMock
    
      // Chama a função createUser do UserService e armazena o valor retornado
      const createdUser = await userService.createUser(newUser);

      // Verifica se o repositório mock foi chamado corretamente
      expect(mockRepository.create).toHaveBeenCalledWith(userCreationMock);
      expect(mockRepository.save).toHaveBeenCalledWith(userCreationMock);


      // Verifica se a função retornou corretamente o novo usuário criado
      expect(createdUser).toEqual(userCreationResponseMock);
    });
  });
  describe('findUsers', () => {
    //teste para verificar se todos os usuários estão sendo retornados de acordo com o mock
    it('should create and return all users', async () => {
        const allUsers = await userService.getUsers();
        expect(allUsers).toStrictEqual(usersResponseMock)

    });
  });
});
