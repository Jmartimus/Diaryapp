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
  // posts = [];
  // newPost(newPost: Postdto): string {
  //   newPost.date = postDateFormatter();
  //   newPost.id = uuidv4();
  //   this.posts.push(newPost);
  //   const message = `Posted on ${newPost.date}`;
  //   return message;
  // }

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

  // getAllPosts(): Postdto[] {
  //   return this.posts;
  // }

  // deletePost(id: string): string {
  //   this.posts = this.posts.filter((post) => post.id !== id);
  //   const message = 'Your post has been deleted forever!';
  //   return message;
  // }

  // editPost(editedPost: Postdto, id: string): string {
  //   const postToEdit = this.posts.find((post) => post.id === id);
  //   (postToEdit.title = editedPost.title),
  //     (postToEdit.body = editedPost.body),
  //     (postToEdit.date = `Updated on ${postDateFormatter()}`);
  //   const message = postToEdit.date;
  //   return message;
  // }
}
