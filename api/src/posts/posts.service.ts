import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Postdto } from './dto/post.dto';
import { postDateFormatter } from './postdateformatter';
import { Posts } from './posts.entity';
import { PostRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}

  async newPost(postdto: Postdto, user: User): Promise<Posts> {
    return this.postRepository.newPost(postdto, user);
  }

  async getPostById(id: number, user: User): Promise<Posts> {
    const found = await this.postRepository.findOne({ id, user });

    if (!found) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
    return found;
  }

  async getAllPosts(user: User): Promise<Posts[]> {
    const found = await this.postRepository.find({ user });
    return found;
  }

  async deletePost(id: number, user: User): Promise<string> {
    const result = await this.postRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    } else {
      return 'Post was succesfully deleted!';
    }
  }

  async editPost(editedPost: Postdto, id: number, user: User): Promise<Posts> {
    const postToEdit = await this.getPostById(id, user);
    (postToEdit.title = editedPost.title),
      (postToEdit.body = editedPost.body),
      (postToEdit.date = `Updated on ${postDateFormatter()}`);
    await postToEdit.save();
    return postToEdit;
  }
}
