import { Column, Entity } from 'typeorm';
import { Aggregate } from '../../../libs/aggregate';

type PostConstructor = {
  title: string;
  content: string;
  author: string;
  state: string;
  temporaryStorage: boolean;
  userId: string;
};

@Entity()
export class Post extends Aggregate {
  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  state!: string;

  @Column()
  temporaryStorage!: boolean;

  @Column()
  author!: string;

  @Column()
  userId!: string;

  constructor(args: PostConstructor) {
    super();
    if (args) {
      this.title = args.title;
      this.content = args.content;
      this.state = args.state;
      this.temporaryStorage = args.temporaryStorage;
      this.author = args.author;
      this.userId = args.userId;
    }
  }

  static Of(args: PostConstructor) {
    return new Post(args);
  }
}
