import { badRequest } from '@hapi/boom';
import { Inject, Service } from 'typedi';
import { UserRepository } from '../../user/infrastructure/user.repository';
import { Post } from '../domain/post.entity';
import { PostRepository } from '../infrastructure/post.repository';

@Service()
export class PostService {
  @Inject()
  private readonly postRepository!: PostRepository;

  @Inject()
  private readonly userRepository!: UserRepository;

  async list() {
    return this.postRepository.find();
  }

  async add({
    title,
    content,
    userId,
    state,
    temporaryStorage,
  }: {
    title: string;
    content: string;
    userId: string;
    state: string;
    temporaryStorage: boolean;
  }) {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw badRequest(`${userId}(admin) is not existed.`, {
        errorMessage: 'the admin is not existed.',
      });
    }

    const post = Post.Of({
      title,
      content,
      state,
      temporaryStorage,
      author: user.nickname,
      userId: user.id,
    });
    await this.postRepository.save(post);
  }
}
