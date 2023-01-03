import { Service } from 'typedi';
import { Repository } from '../../../libs/repository';
import { Post } from '../domain/post.entity';

@Service()
export class PostRepository extends Repository<Post> {
  constructor() {
    super(Post);
  }

  find() {
    return this.getManager().find();
  }

  save(post: Post) {
    return this.getManager().save(post);
  }
}
