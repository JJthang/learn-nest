import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name_product: string;

  @Column()
  price_product: number;

  @Column()
  quantity_product: number;

  @Column()
  desc_product: string;

  // @CreateDateColumn({ type: 'timestamp' })
  // created_at: Date;

  // @UpdateDateColumn({ type: 'timestamp' })
  // updated_at: Date;
}
