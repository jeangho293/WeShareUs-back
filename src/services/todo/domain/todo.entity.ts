import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Aggregate } from '../../../libs/aggregate';
import type { PublishedDate } from '../../../libs/types';

type TodoConstructor = {
  publishedDate: PublishedDate;
};

@Entity()
export class Todo extends Aggregate {
  @Column()
  publishedDate!: PublishedDate;

  @OneToMany(() => TodoItem, (todoItem) => todoItem.todo, { eager: true })
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

  update(args: { done: boolean; item?: string }) {
    return this;
  }
}

@Entity()
export class TodoItem {
  @PrimaryGeneratedColumn()
  order!: number;

  @Column()
  content!: string;

  @Column({ default: false })
  done!: boolean;

  @ManyToOne(() => Todo, (todo) => todo.id)
  todo!: Todo;
}
