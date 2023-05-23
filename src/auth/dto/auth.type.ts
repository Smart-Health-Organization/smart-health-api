import { UsuarioResponseDto } from '@app/types/dtos/response/user.response.dto';
import { Usuario } from '@app/types/entities/usuario.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class AuthType {
  @ApiProperty({
    type: UsuarioResponseDto,
  })
  @Field(() => Usuario)
  usuario: Usuario;

  @Field()
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;
}
