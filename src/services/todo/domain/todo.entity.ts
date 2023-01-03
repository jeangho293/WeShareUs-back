import { Column, Entity } from 'typeorm';
import { Aggregate } from '../../../libs/aggregate';
import { DateToPublishedDate } from '../../../libs/dayjs';
import type { PublishedDate } from '../../../libs/types';

type TodoConstructor = {
  item: string;
  done: boolean;
  date: Date;
};

@Entity()
export class Todo extends Aggregate {
  @Column()
  item!: string;

  @Column()
  done!: boolean;

  @Column()
  publishedDate!: PublishedDate;

  constructor(args: TodoConstructor) {
    super();
    if (args) {
      this.item = args.item;
      this.done = args.done;
      this.publishedDate = DateToPublishedDate(args.date);
    }
  }

  static Of(args: TodoConstructor) {
    return new Todo(args);
  }
}
