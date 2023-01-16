import * as Joi from 'joi';
import Spec from './patch';

describe('PATCH /todos/:todoId', () => {
  it('정상적인 body', () => {
    const body = Spec.validate?.body as Joi.AnySchema;
    const { error } = body.validate({
      publishedDate: '2023-01-11',
      todoItems: [
        {
          id: 1,
          content: 'todo-content-1',
          done: false,
        },
        {
          id: 2,
          content: '테스트 코드 귀찮은데 해야해..',
          done: true,
        },
        {
          id: 3,
          content: '이거 장기프로젝트임',
          done: false,
        },
      ],
    });

    expect(error).toBeUndefined();
  });

  it('정상적인 query', () => {
    const params = Spec.validate?.params as Joi.AnySchema;
    const { error } = params.validate({
      todoId: 'todo-uuid',
    });

    expect(error).toBeUndefined();
  });
});
