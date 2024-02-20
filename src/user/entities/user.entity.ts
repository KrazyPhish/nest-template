import { CommonEntity } from "@/common/common.entity";
import { Entity, Column } from "typeorm";

@Entity()
export class User extends CommonEntity {
  @Column()
  username: string

  @Column({ select: false })
  password: string

  @Column({ nullable: true })
  nickname: string

  @Column({ nullable: true })
  age: number

  @Column({ type: 'timestamp', nullable: true })
  birthday: Date

}
