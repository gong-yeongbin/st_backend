import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class common {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @CreateDateColumn({
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
