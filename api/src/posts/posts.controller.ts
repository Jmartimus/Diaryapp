import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { Postdto } from './dto/post.dto';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // @Post()
  // newPost(@Body() newPost: Postdto): string {
  //   return this.postsService.newPost(newPost);
  // }

  @Post()
  newPost(@Body() newPost: Postdto): Promise<Posts> {
    return this.postsService.newPost(newPost);
  }

  // @Get()
  // getAllPosts(): Postdto[] {
  //   return this.postsService.getAllPosts();
  // }

  //@Get('/:id')
  getPostByID(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
    return this.postsService.getPostById(id);
  }

  // @Delete('/:id')
  // deletePost(@Param('id') id: string): string {
  //   return this.postsService.deletePost(id);
  // }
  // @Patch('/:id')
  // editPost(@Body() editedPost: Postdto, @Param('id') id: string): string {
  //   return this.postsService.editPost(editedPost, id);
  // }
}
