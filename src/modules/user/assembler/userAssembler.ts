import { CreateUserDto } from "src/types/dtos/create-user.dto";
import { UserResponseDto } from "src/types/dtos/user.response.dto";
import { User } from "src/types/entities/user.entity";

export class UserAssembler{
static assembleCreateUserToDto(user: CreateUserDto): UserResponseDto{
    return {
        name:user.name,
        email: user.email,
        login: user.login,
        age: user.age 
    }
}
static assembleUsersToDto(user: User[]): UserResponseDto[]{
    const usersDto = user.map(user=>{return {
        name:user.name,
        email: user.email,
        login: user.login,
        age: user.age 
    }
})

return usersDto;
}
}