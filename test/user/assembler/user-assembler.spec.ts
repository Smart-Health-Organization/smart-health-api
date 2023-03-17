import { UserResponseDto } from "../../../src/types/dtos/user.response.dto";
import { UserAssembler } from "../../../src/modules/user/assembler/userAssembler"
var userCreationMock = require("../mock/UserCreationRequestMock.json")


describe('UserAssembler', () => {

  describe('assembleCreateUserToDto', () => {
    //teste para verificar se a função que transforma o usuário em DTO está funcionando corretamente
    it('should remove password from response', async () => {
      // Cria um novo usuário
      const newUser =userCreationMock;

      //chama o método assembleCreateUserToDto para transformar o retorno do banco em dto
      const UserWithousPass = UserAssembler.assembleCreateUserToDto(newUser)

      // Verifica se a função transformou corretamente o usuário em Dto
      expect(UserWithousPass.name).toStrictEqual(newUser.name)
      expect(UserWithousPass.email).toStrictEqual(newUser.email)
      expect(UserWithousPass.age).toStrictEqual(newUser.age)
      expect(UserWithousPass.login).toStrictEqual(newUser.login)
      
    });
  })
})
