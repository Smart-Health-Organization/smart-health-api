import { Limite } from 'src/types/entities/limite.entity';
import { Metrica } from 'src/types/entities/metrica.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertLimitesEMetricas1679766502904 implements MigrationInterface {
  name = 'InsertLimitesEMetricas1679766502904';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const metricaAcidoUrico = await queryRunner.manager.save(Metrica, {
      nome: 'ACIDO URICO',
      unidade: 'mg/dL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaAcidoUrico,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 2.5,
      alto: 8,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaAcidoUrico,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 2.5,
      alto: 8,
    });

    const metricaColesterolTotal = await queryRunner.manager.save(Metrica, {
      nome: 'COLESTEROL TOTAL',
      unidade: 'mg/dL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaColesterolTotal,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 150,
      alto: 199,
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaColesterolTotal,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 150,
      alto: 199,
    });

    const metricaCreatinina = await queryRunner.manager.save(Metrica, {
      nome: 'CREATININA',
      unidade: 'mg/dL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaCreatinina,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 0.5,
      alto: 1.0,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaCreatinina,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 0.7,
      alto: 1.2,
    });

    const metricaGlicose = await queryRunner.manager.save(Metrica, {
      nome: 'GLICOSE',
      unidade: 'mg/dL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaGlicose,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 70,
      alto: 105,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaGlicose,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 70,
      alto: 105,
    });

    const metricaPotassio = await queryRunner.manager.save(Metrica, {
      nome: 'POTASSIO',
      unidade: 'mEq/L',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaPotassio,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 3.5,
      alto: 5,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaPotassio,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 3.5,
      alto: 5,
    });

    const metricaSodio = await queryRunner.manager.save(Metrica, {
      nome: 'SODIO',
      unidade: 'mEq/L',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaSodio,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 136,
      alto: 145,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaSodio,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 136,
      alto: 145,
    });

    const metricaUreia = await queryRunner.manager.save(Metrica, {
      nome: 'UREIA',
      unidade: 'mg/dL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaUreia,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 8,
      alto: 20,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaUreia,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 8,
      alto: 20,
    });

    const metricaGamaGlutamil = await queryRunner.manager.save(Metrica, {
      nome: 'GAMA-GLUTAMIL TRANSFERASE',
      unidade: ' U/L',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaGamaGlutamil,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 5,
      alto: 36,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaGamaGlutamil,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 8,
      alto: 61,
    });

    const metricaTriglicerideos = await queryRunner.manager.save(Metrica, {
      nome: 'TRIGLICERÍDEOS',
      unidade: 'mg/dL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaTriglicerideos,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 150,
      alto: 199,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaTriglicerideos,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 150,
      alto: 199,
    });

    const metricaTriglicerides = await queryRunner.manager.save(Metrica, {
      nome: 'TRIGLICERÍDES',
      unidade: 'mg/dL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaTriglicerides,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 150,
      alto: 199,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaTriglicerides,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 150,
      alto: 199,
    });

    const metricaLdl = await queryRunner.manager.save(Metrica, {
      nome: 'LDL',
      unidade: 'mg/dL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaLdl,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 0,
      alto: 130,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaLdl,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 0,
      alto: 130,
    });

    const metricaHdl = await queryRunner.manager.save(Metrica, {
      nome: 'HDL',
      unidade: 'mg/dL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaHdl,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 0,
      alto: 40,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaHdl,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 0,
      alto: 40,
    });

    const metricaAmilase = await queryRunner.manager.save(Metrica, {
      nome: 'AMILASE',
      unidade: 'U/L',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaAmilase,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 0,
      alto: 110,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaAmilase,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 0,
      alto: 110,
    });

    const metricaCalcio = await queryRunner.manager.save(Metrica, {
      nome: 'CALCIO',
      unidade: 'mg/dL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaCalcio,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 9,
      alto: 10.5,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaCalcio,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 9,
      alto: 10.5,
    });

    const metricaCapacidadeDeFixacaoDeFerro = await queryRunner.manager.save(
      Metrica,
      {
        nome: 'CAPACIDADE DE FIXAÇÃO DO FERRO',
        unidade: 'mcg/dL',
      },
    );

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaCapacidadeDeFixacaoDeFerro,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 250,
      alto: 460,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaCapacidadeDeFixacaoDeFerro,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 250,
      alto: 460,
    });

    const metricaFosforo = await queryRunner.manager.save(Metrica, {
      nome: 'FOSFORO',
      unidade: 'mg/dL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaFosforo,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 30,
      alto: 4.5,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaFosforo,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 30,
      alto: 4.5,
    });

    const metricaLipase = await queryRunner.manager.save(Metrica, {
      nome: 'LIPASE',
      unidade: 'U/L',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaLipase,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 0,
      alto: 95,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaLipase,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 0,
      alto: 95,
    });

    const metricaMagnesio = await queryRunner.manager.save(Metrica, {
      nome: 'MAGNESIO',
      unidade: 'mg/dL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaMagnesio,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 1.5,
      alto: 2.4,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaMagnesio,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 1.5,
      alto: 2.4,
    });

    const metricaBicarbonato = await queryRunner.manager.save(Metrica, {
      nome: 'BICARBONATO',
      unidade: 'mEq/L',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaBicarbonato,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 23,
      alto: 28,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaBicarbonato,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 23,
      alto: 28,
    });

    const metricaFerro = await queryRunner.manager.save(Metrica, {
      nome: 'FERRO',
      unidade: 'mcg/dL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaFerro,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 35,
      alto: 145,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaFerro,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 50,
      alto: 150,
    });

    const metricaFerritina = await queryRunner.manager.save(Metrica, {
      nome: 'FERRITINA',
      unidade: 'ng/mL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaFerritina,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 30,
      alto: 200,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaFerritina,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 30,
      alto: 300,
    });

    const metricaTsh = await queryRunner.manager.save(Metrica, {
      nome: 'TSH',
      unidade: 'µUI/mL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaTsh,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 0.5,
      alto: 5,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaTsh,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 0.5,
      alto: 5,
    });

    const metricaVitaminaDHidroxi = await queryRunner.manager.save(Metrica, {
      nome: 'VITAMINA D (25-hidroxi)',
      unidade: 'mcUI/mL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaVitaminaDHidroxi,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 15,
      alto: 80,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaVitaminaDHidroxi,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 15,
      alto: 80,
    });

    const metricaALT = await queryRunner.manager.save(Metrica, {
      nome: 'ALT-ALANINA AMINOTRANSFERASE',
      unidade: 'U/L',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaALT,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 0,
      alto: 35,
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaALT,
      idadeInicio: 0,
      idadeFim: 150,
      baixo: 0,
      alto: 35,
    });

    const metricaVLDL = await queryRunner.manager.save(Metrica, {
      nome: 'VLDL',
      unidade: 'mg/dL',
    });

    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaVLDL,
      idadeInicio: 0,
      idadeFim: 19,
      baixo: 0,
      alto: 20,
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'feminino',
      metrica: metricaVLDL,
      idadeInicio: 20,
      idadeFim: 150,
      baixo: 21,
      alto: 30,
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaVLDL,
      idadeInicio: 0,
      idadeFim: 19,
      baixo: 0,
      alto: 20,
    });
    await queryRunner.manager.save(Limite, {
      sexo: 'masculino',
      metrica: metricaVLDL,
      idadeInicio: 20,
      idadeFim: 150,
      baixo: 21,
      alto: 30,
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
