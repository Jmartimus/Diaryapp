import { Body, Controller, Get, Post } from '@nestjs/common';
import { Postdto } from './dto/post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  newPost(@Body() newPost: Postdto) {
    return this.postsService.newPost(newPost);
  }

  @Get('/all')
  getAllPosts(): Postdto[] {
    return this.postsService.getAllPosts();
  }
}
