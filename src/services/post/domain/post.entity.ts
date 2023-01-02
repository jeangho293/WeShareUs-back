import { Column, Entity } from 'typeorm';
import { Aggregate } from '../../../libs/aggregate';

type PostConstructor = {
  title: string;
  content: string;
  author: string;
  userId: string;
};

@Entity()
export class Post extends Aggregate {
  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  author!: string;

  @Column()
  userId!: string;

  constructor(args: PostConstructor) {
    super();
    if (args) {
      this.title = args.title;
      this.content = args.content;
      this.author = args.author;
      this.userId = args.userId;
    }
  }

  static Of(args: PostConstructor) {
    return new Post(args);
  }
}
