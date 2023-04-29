import { Limite } from 'src/types/entities/limite.entity';
import { Metrica } from 'src/types/entities/metrica.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertLimitesEMetricas1679766502904 implements MigrationInterface {
  name = 'InsertLimitesEMetricas1679766502904';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const metricaLDL = await queryRunner.manager.save(Metrica, {
      nome: 'LDL',
      unidade: 'unidade LDL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaLDL,
      idadeInicio: 0,
      idadeFim: 19,
      baixo: 110,
      alto: 129,
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaLDL,
      idadeInicio: 20,
      idadeFim: 49,
      baixo: 130,
      alto: 140,
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaLDL,
      idadeInicio: 0,
      idadeFim: 19,
      baixo: 110,
      alto: 129,
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaLDL,
      idadeInicio: 20,
      idadeFim: 49,
      baixo: 130,
      alto: 140,
    });

    const metricaHDL = await queryRunner.manager.save(Metrica, {
      nome: 'HDL',
      unidade: 'unidade HDL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaHDL,
      idadeInicio: 0,
      idadeFim: 19,
      baixo: 110,
      alto: 129,
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaHDL,
      idadeInicio: 20,
      idadeFim: 49,
      baixo: 130,
      alto: 140,
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaHDL,
      idadeInicio: 0,
      idadeFim: 19,
      baixo: 110,
      alto: 129,
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaHDL,
      idadeInicio: 20,
      idadeFim: 49,
      baixo: 130,
      alto: 140,
    });

    const metricaVLDL = await queryRunner.manager.save(Metrica, {
      nome: 'VLDL',
      unidade: 'unidade VLDL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaVLDL,
      idadeInicio: 0,
      idadeFim: 19,
      baixo: 110,
      alto: 129,
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaVLDL,
      idadeInicio: 20,
      idadeFim: 49,
      baixo: 130,
      alto: 140,
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaVLDL,
      idadeInicio: 0,
      idadeFim: 19,
      baixo: 110,
      alto: 129,
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaVLDL,
      idadeInicio: 20,
      idadeFim: 49,
      baixo: 130,
      alto: 140,
    });

    const metricaCREATININA = await queryRunner.manager.save(Metrica, {
      nome: 'CREATININA',
      unidade: 'unidade CREATININA',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaCREATININA,
      idadeInicio: 0,
      idadeFim: 19,
      baixo: 110,
      alto: 129,
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaCREATININA,
      idadeInicio: 20,
      idadeFim: 49,
      baixo: 130,
      alto: 140,
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaCREATININA,
      idadeInicio: 0,
      idadeFim: 19,
      baixo: 110,
      alto: 129,
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaCREATININA,
      idadeInicio: 20,
      idadeFim: 49,
      baixo: 130,
      alto: 140,
    });

    const metricaBHCGQUANTITATIVO = await queryRunner.manager.save(Metrica, {
      nome: 'BHCG',
      unidade: 'unidade BHCG',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaBHCGQUANTITATIVO,
      idadeInicio: 0,
      idadeFim: 56,
      baixo: 53,
      alto: 58,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "limite" DROP CONSTRAINT "FK_9ebcac9baf9161094816646e4b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exame" DROP CONSTRAINT "FK_80cde449354e6c1bc909f8e7754"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exame_item" DROP CONSTRAINT "FK_8798a5440d1be41341d95e63f9d"`,
    );
    await queryRunner.query(`DROP TABLE "limite"`);
    await queryRunner.query(`DROP TABLE "metrica"`);
    await queryRunner.query(`DROP TABLE "exame"`);
    await queryRunner.query(`DROP TABLE "usuario"`);
    await queryRunner.query(`DROP TABLE "exame_item"`);
    await queryRunner.query(`DROP TABLE "resultado_exame_item"`);
  }
}
