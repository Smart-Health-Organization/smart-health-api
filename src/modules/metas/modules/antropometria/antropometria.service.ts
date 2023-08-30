import { UsuarioHelper } from '@app/helpers/usuario.helper';
import { CreateAntropometriaInsertDto } from '@app/types/dtos/insert/create-antropometria.insert.dto';
import { AntropometriaResponseDto } from '@app/types/dtos/response/antropometria.response.dto';
import { Antropometria } from '@app/types/entities/antropometria.entity';
import { Meta } from '@app/types/entities/meta.entity';
import { AntropometriaAssembler } from '@modules/metas/modules/antropometria/assembler/antropometria.assembler';
import { Calculos } from '@modules/metas/modules/antropometria/type/calculos.type';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AntropometriaOperations } from './antropometria.operations';

@Injectable()
export class AntropometriaService implements AntropometriaOperations {
  constructor(
    @InjectRepository(Antropometria)
    private repository: Repository<Antropometria>,
  ) {}
  async getAntropometriasByMeta(
    metaId: number,
  ): Promise<AntropometriaResponseDto[]> {
    const antropometrias = await this.repository.find({
      where: { meta: { id: metaId } },
    });
    return AntropometriaAssembler.assembleAntropometriasToResponse(
      antropometrias,
    );
  }

  async createAntropometria(
    sexo: string,
    dataNascimento: string,
    meta: Meta,
    antropometria: CreateAntropometriaInsertDto,
  ): Promise<AntropometriaResponseDto> {
    const calculos = this.calcularMedidas(antropometria, sexo, dataNascimento);
    const antropometriaSalva = await this.repository.save({
      meta,
      ...antropometria,
      ...calculos,
    });

    if (!antropometriaSalva) {
      throw new BadRequestException('Antropometria não foi criada');
    }

    const antropometriaCriadaDto =
      AntropometriaAssembler.assembleAntropometriaToResponse(
        antropometriaSalva,
      );
    return antropometriaCriadaDto;
  }

  calcularMedidas(
    antropometria: CreateAntropometriaInsertDto,
    sexo: string,
    dataNascimento: string,
  ): Calculos {
    const idade = UsuarioHelper.calcularIdade(dataNascimento);

    const dc = this.calcularDensidadeCorporal(sexo, idade, antropometria);

    const taxaMetabolicaBasal = this.calcularTaxaMetabolicaBasal(
      antropometria,
      sexo,
      idade,
    );
    const auxiliarParaCalculo = dc - 4.5;
    const gorduraCorporal = (4.95 / auxiliarParaCalculo) * 100;
    const massaMagra =
      antropometria.peso - (antropometria.peso * gorduraCorporal) / 100;
    const caloriasDiarias = this.calcularCaloriasDiarias(
      antropometria,
      sexo,
      taxaMetabolicaBasal,
    );
    return {
      densidadeCorporal: dc,
      gorduraCorporal,
      taxaMetabolicaBasal,
      massaMagra,
      caloriasDiarias,
    };
  }

  private calcularDensidadeCorporal(
    sexo,
    idade,
    antropometria: CreateAntropometriaInsertDto,
  ): number {
    let dencisadeCorporal;
    const somaDeDobras =
      antropometria?.abdominal +
      antropometria?.coxa +
      antropometria?.suprailiaca +
      antropometria?.triceps;

    if (sexo == 'masculino') {
      dencisadeCorporal =
        0.29288 * somaDeDobras -
        0.0005 * (somaDeDobras * somaDeDobras) +
        0.15845 * idade -
        5.76377;
    } else if (sexo == 'feminino') {
      dencisadeCorporal =
        0.29669 * somaDeDobras -
        0.00043 * (somaDeDobras * somaDeDobras) +
        0.02963 * idade -
        1.4072;
    }
    return dencisadeCorporal;
  }

  private calcularTaxaMetabolicaBasal(antropometria, sexo, idade): number {
    let taxaMetabolicaBasal;
    if (sexo == 'masculino') {
      taxaMetabolicaBasal =
        10 * antropometria.peso + 6.25 * antropometria.altura - 5 * idade + 5;
    } else if (sexo == 'feminino') {
      taxaMetabolicaBasal =
        10 * antropometria.peso + 6.25 * antropometria.altura - 5 * idade - 161;
    }
    return taxaMetabolicaBasal;
  }

  private calcularCaloriasDiarias(antropometria, sexo, tmb): number {
    const nivelAtividade = antropometria.atividadeFisicaSemanal;
    let fatorAtividade;

    if (sexo === 'masculino') {
      if (nivelAtividade >= 0 && nivelAtividade <= 1) {
        fatorAtividade = 1.5;
      } else if (nivelAtividade > 1 && nivelAtividade <= 4) {
        fatorAtividade = 1.8;
      } else if (nivelAtividade > 4) {
        fatorAtividade = 2.1;
      }
    } else if (sexo === 'feminino') {
      if (nivelAtividade >= 0 && nivelAtividade <= 1) {
        fatorAtividade = 1.6;
      } else if (nivelAtividade > 1 && nivelAtividade <= 4) {
        fatorAtividade = 1.6;
      } else if (nivelAtividade > 4) {
        fatorAtividade = 1.8;
      }
    }

    return tmb * fatorAtividade;
  }
}
