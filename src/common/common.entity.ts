import { Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

export abstract class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updateTime: Date;

  @Column({ default: false })
  isDelete: boolean;
}
