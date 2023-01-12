import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Aggregate } from '../../../libs/aggregate';
import type { PublishedDate } from '../../../libs/types';

export type TodoTypes = {
  id: string;
  publishedDate: PublishedDate;
  todoItems: TodoItem[];
};
type TodoConstructor = {
  publishedDate: PublishedDate;
};

@Entity()
export class Todo extends Aggregate {
  @Column()
  publishedDate!: PublishedDate;

  @OneToMany(() => TodoItem, (todoItem) => todoItem.todo, {
    cascade: ['update'],
    eager: true,
  })
  todoItems!: TodoItem[];

  constructor(args: TodoConstructor) {
    super();
    if (args) {
      this.publishedDate = args.publishedDate;
    }
  }

  static Of(args: TodoConstructor) {
    return new Todo(args);
  }

  async update(args: any) {
    return Object.assign(this, args);
  }
}

@Entity()
export class TodoItem extends Aggregate {
  // TODO: order 컬럼은 필요가 없을 듯하다.
  @Column()
  order!: number;

  @Column()
  content!: string;

  @Column({ default: false })
  done!: boolean;

  @ManyToOne(() => Todo, (todo) => todo.id)
  todo!: Todo;
}
