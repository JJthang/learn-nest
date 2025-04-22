import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Profile } from '../profile/profile.entity';
import { Post } from '../post/post.entity';
import { hash } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password!, 10);
  }

  // JoinColumn() đánh dấu đây là cột chứa khóa ngoại
  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
