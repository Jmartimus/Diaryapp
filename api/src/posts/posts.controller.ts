import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { Postdto } from './dto/post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  newPost(@Body() newPost: Postdto): string {
    return this.postsService.newPost(newPost);
  }

  @Get()
  getAllPosts(): Postdto[] {
    return this.postsService.getAllPosts();
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string): string {
    return this.postsService.deletePost(id);
  }
  @Patch('/:id')
  editPost(@Body() editedPost: Postdto, @Param('id') id: string) {
    return this.postsService.editPost(editedPost, id);
  }
}
