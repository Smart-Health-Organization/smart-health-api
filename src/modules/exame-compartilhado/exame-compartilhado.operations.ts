import { ExameCompartilhadoInsertDto } from '@app/types/dtos/insert/exame-compartilhado.request.dto';
import { Usuario } from '@app/types/entities/usuario.entity';
import { ExameCompartilhadoResponse } from '@modules/exame-compartilhado/type/exame-compartilhado.response';

export interface ExameCompartilhadoOperations {
  criarExameCompartilhado(
    usuario: Usuario,
    data: ExameCompartilhadoInsertDto,
  ): Promise<ExameCompartilhadoResponse>;

  getExamesCompartilhadosPorUsuario(id: string);
}
