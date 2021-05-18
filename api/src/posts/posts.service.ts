import { Injectable } from '@nestjs/common';
import { Postdto } from './dto/post.dto';
import { v4 as uuidv4 } from 'uuid';
import { postDateFormatter } from './postdateformatter';

@Injectable()
export class PostsService {
  posts = [];

  newPost(newPost: Postdto): string {
    newPost.date = postDateFormatter();
    newPost.id = uuidv4();
    this.posts.push(newPost);
    const message = `Posted on ${newPost.date}`;
    return message;
  }

  getAllPosts(): Postdto[] {
    return this.posts;
  }

  deletePost(id: string): string {
    this.posts = this.posts.filter((post) => post.id !== id);
    const message = 'Your post has been deleted forever!';
    return message;
  }

  editPost(editedPost: Postdto, id: string): string {
    const postToEdit = this.posts.find((post) => post.id === id);
    (postToEdit.title = editedPost.title),
      (postToEdit.body = editedPost.body),
      (postToEdit.date = `Updated on ${postDateFormatter()}`);
    const message = postToEdit.date;
    return message;
  }
}
