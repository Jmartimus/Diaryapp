import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Postdto } from './dto/post.dto';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  newPost(@Body() newPost: Postdto, @GetUser() user: User): Promise<Posts> {
    return this.postsService.newPost(newPost, user);
  }

  @Get()
  getAllPosts(@GetUser() user: User): Promise<Posts[]> {
    return this.postsService.getAllPosts(user);
  }

  @Get('/:id')
  getPostByID(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Posts> {
    return this.postsService.getPostById(id, user);
  }

  @Delete('/:id')
  deletePost(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<string> {
    return this.postsService.deletePost(id, user);
  }

  @Patch('/:id')
  editPost(
    @Body() editedPost: Postdto,
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Posts> {
    return this.postsService.editPost(editedPost, id, user);
  }
}
