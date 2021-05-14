import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
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

  @Delete('/:id')
  deletePost(@Param('id', ParseIntPipe) id: number): void {
    this.postsService.deletePost(id);
  }
}
