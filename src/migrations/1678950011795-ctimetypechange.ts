import { MigrationInterface, QueryRunner } from 'typeorm';

export class ctimetypechange1678950011795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE log_prev100bill MODIFY c_time varchar(50)`);
    await queryRunner.query(`ALTER TABLE log_prev10bill MODIFY c_time varchar(50)`);
    await queryRunner.query(`ALTER TABLE log_5bill MODIFY c_time varchar(50)`);
    await queryRunner.query(`ALTER TABLE log_15per MODIFY c_time varchar(50)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
