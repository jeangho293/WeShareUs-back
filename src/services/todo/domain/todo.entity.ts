import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
    cascade: ['insert', 'update'],
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
export class TodoItem {
  @PrimaryGeneratedColumn()
  private id!: number;

  @Column()
  content!: string;

  @Column({ default: false })
  done!: boolean;

  @ManyToOne(() => Todo, (todo) => todo.id)
  todo!: Todo;

  constructor(args: { content: string; done: boolean }) {
    if (args) {
      this.content = args.content;
      this.done = args.done;
    }
  }
}
