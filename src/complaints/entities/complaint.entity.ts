import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Complaint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customer: string;

  @Column()
  product: string;

  @Column({
    length: 5,
  })
  lot: string;

  @Column()
  title: string;

  @Column()
  detail: string;

  @Column({
    default: 'pending',
    enum: ['pending', 'opened', 'closed', 'cancelled', 're-opened'],
  })
  state: string;

  @Column({nullable: true})
  note: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
