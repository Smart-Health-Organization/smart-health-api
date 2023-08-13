import { ApiProperty } from '@nestjs/swagger';

export class UsuarioExameCompartilhadoResponseType {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Título' })
  titulo: string;

  @ApiProperty({ example: 'Login' })
  login: string;
}

export class GetUsuarioExamesCompartilhadosResponseType extends Array<UsuarioExameCompartilhadoResponseType> {}
