import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async newPost(postdto: Postdto): Promise<Posts> {
    return this.postRepository.newPost(postdto);
  }

  async getPostById(id: number): Promise<Posts> {
    const found = await this.postRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
    return found;
  }

  async getAllPosts(): Promise<Posts[]> {
    const found = await this.postRepository.find();
    return found;
  }

  async deletePost(id: number): Promise<string> {
    const result = await this.postRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    } else {
      return 'Post was succesfully deleted!';
    }
  }

  async editPost(editedPost: Postdto, id: number): Promise<Posts> {
    const postToEdit = await this.getPostById(id);
    (postToEdit.title = editedPost.title),
      (postToEdit.body = editedPost.body),
      (postToEdit.date = `Updated on ${postDateFormatter()}`);
    await postToEdit.save();
    return postToEdit;
  }
}
