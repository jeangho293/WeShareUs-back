import { Column, Entity } from 'typeorm';
import { Aggregate } from '../../../libs/aggregate';
import type { PublishedDate } from '../../../libs/types';

type TodoConstructor = {
  item: string;
  order: number;
  publishedDate: PublishedDate;
};

@Entity()
export class Todo extends Aggregate {
  @Column()
  item!: string;

  @Column()
  order!: number;

  @Column({ default: false })
  done!: boolean;

  @Column()
  publishedDate!: PublishedDate;

  constructor(args: TodoConstructor) {
    super();
    if (args) {
      this.item = args.item;
      this.order = args.order;
      this.publishedDate = args.publishedDate;
    }
  }

  static Of(args: TodoConstructor) {
    return new Todo(args);
  }

  update(done: boolean) {
    this.done = done;
    return this;
  }
}
