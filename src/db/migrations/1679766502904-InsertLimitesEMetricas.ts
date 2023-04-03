import { Limite } from 'src/types/entities/limite.entity';
import { Metrica } from 'src/types/entities/metrica.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertLimitesEMetricas1679766502904 implements MigrationInterface {
  name = 'InsertLimitesEMetricas1679766502904';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const metricaLDL = await queryRunner.manager.save(Metrica, { nome: 'LDL' });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaLDL,
      idadeInicio: 0,
      idadeFim: 19,
      baixo: 110,
      alto: 129,
      unidade: 'mg/dL',
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaLDL,
      idadeInicio: 20,
      idadeFim: 49,
      baixo: 130,
      alto: 140,
      unidade: 'mg/dL',
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaLDL,
      idadeInicio: 0,
      idadeFim: 19,
      baixo: 110,
      alto: 129,
      unidade: 'mg/dL',
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaLDL,
      idadeInicio: 20,
      idadeFim: 49,
      baixo: 130,
      alto: 140,
      unidade: 'mg/dL',
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
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "exame_item"`);
    await queryRunner.query(`DROP TABLE "resultado_exame_item"`);
  }
}
