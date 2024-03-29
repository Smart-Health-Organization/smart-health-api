import { UsuarioHelper } from '@app/helpers/usuario.helper';
import { CreateAntropometriaInsertDto } from '@app/types/dtos/insert/create-antropometria.insert.dto';
import { AntropometriaResponseDto } from '@app/types/dtos/response/antropometria.response.dto';
import { Antropometria } from '@app/types/entities/antropometria.entity';
import { Meta } from '@app/types/entities/meta.entity';
import { AntropometriaAssembler } from '@modules/metas/modules/antropometria/assembler/antropometria.assembler';
import { AntropometriaComparativoResponseData } from '@modules/metas/modules/antropometria/type/antropometria-comparativo.response.type';
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

  async deleteAntropometria(
    antropometriaId: number,
    metaId: number,
  ): Promise<boolean> {
    await this.getAntropometriaById(antropometriaId);
    const deleted = await this.repository.delete({
      id: antropometriaId,
      meta: { id: metaId },
    });
    if (deleted) return true;
    return false;
  }

  async getAntropometriaById(antropmetriaId: number) {
    const antropometria = await this.repository.findOne({
      where: { id: antropmetriaId },
    });
    if (!antropometria) {
      throw new BadRequestException('Antropometria não encontrada');
    }
    return antropometria;
  }

  async getComparativoDeMedidas(
    metaId: number,
  ): Promise<AntropometriaComparativoResponseData> {
    const antropometrias = await this.getAntropometriasByMeta(metaId);
    const comparativos =
      AntropometriaAssembler.assembleComparativos(antropometrias);
    return comparativos;
  }
  async getAntropometriasByMeta(
    metaId: number,
  ): Promise<AntropometriaResponseDto[]> {
    const antropometrias = await this.repository.find({
      where: { meta: { id: metaId } },
    });

    if (!antropometrias.length) {
      throw new BadRequestException('Não há antropometrias para essa meta');
    }
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

    const somaDeDobras =
      antropometria?.abdominal +
      antropometria?.coxa +
      antropometria?.suprailiaca +
      antropometria?.triceps;

    const gorduraCorporal = this.calcularGorduraCorporal(
      sexo,
      idade,
      somaDeDobras,
    );

    const taxaMetabolicaBasal = this.calcularTaxaMetabolicaBasal(
      antropometria,
      sexo,
      idade,
    );

    const massaMagra =
      antropometria.peso - (antropometria.peso * gorduraCorporal) / 100;
    const caloriasDiarias = this.calcularCaloriasDiarias(
      antropometria,
      sexo,
      taxaMetabolicaBasal,
    );

    return {
      densidadeCorporal:
        sexo == 'masculino'
          ? 1.1714 - 0.0671 * Math.log10(somaDeDobras)
          : 1.1665 - 0.0706 * Math.log10(somaDeDobras),
      gorduraCorporal,
      taxaMetabolicaBasal,
      massaMagra,
      caloriasDiarias,
    };
  }

  private calcularGorduraCorporal(sexo, idade, somaDeDobras: number): number {
    let gorduraCorporal;

    if (sexo == 'masculino') {
      gorduraCorporal =
        0.29288 * somaDeDobras -
        0.0005 * (somaDeDobras * somaDeDobras) +
        0.15845 * idade -
        5.76377;
    } else if (sexo == 'feminino') {
      gorduraCorporal =
        0.29669 * somaDeDobras -
        0.00043 * (somaDeDobras * somaDeDobras) +
        0.02963 * idade -
        1.4072;
    }
    return gorduraCorporal;
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
