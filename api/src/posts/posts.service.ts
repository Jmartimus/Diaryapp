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

  //how to return above message?

  getAllPosts(): Postdto[] {
    return this.posts;
  }

  deletePost(id: string): string {
    const deleteTime = postDateFormatter();
    this.posts = this.posts.filter((post) => post.id !== id);
    const message = `Posted on ${deleteTime}`;
    return message;
  }

  editPost(editedPost: Postdto, id: string): void {
    const postToEdit = this.posts.find((post) => post.id === id);
    const editingPost: Postdto = editedPost;
    editedPost.date = postDateFormatter();
    editedPost.id = uuidv4();
    this.posts.push(createPost);
    const message = `Updated on ${editedPost.date}`;
  }
  //finish logic change the info and return the new post back to posts with a message saying that it was updated.
}
