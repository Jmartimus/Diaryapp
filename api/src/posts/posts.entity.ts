import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  date: string;

  @ManyToOne((_type) => User, (user) => user.posts, { eager: false })
  @Exclude({ toPlainOnly: true }) //excludes the user property from being sent back as JSON
  user: User;
}
