import { Injectable } from '@nestjs/common';
import { Postdto } from './dto/post.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostsService {
  posts = [];

  newPost(newPost: Postdto): void {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const createPost: Postdto = newPost;
    const dateStamp = new Date();
    const year = dateStamp.getFullYear();
    const date = dateStamp.getDate();
    const monthIndex = dateStamp.getMonth();
    const monthName = months[monthIndex];
    let hours = dateStamp.getHours();
    const minutes = dateStamp.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesWLeadingZero = minutes < 10 ? '0' + minutes : minutes;
    const timeStamp = `${monthName} ${date}, ${year} at ${hours}:${minutesWLeadingZero}${ampm}`;
    newPost.date = timeStamp;
    newPost.id = uuidv4();
    this.posts.push(createPost);
  }

  getAllPosts(): Postdto[] {
    return this.posts;
  }

  deletePost(id: string): void {
    this.posts = this.posts.filter((post) => post.id !== id);
  }
}
