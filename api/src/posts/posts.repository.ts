import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Postdto } from './dto/post.dto';
import { postDateFormatter } from './postdateformatter';
import { Posts } from './posts.entity';

@EntityRepository(Posts)
export class PostRepository extends Repository<Posts> {
  async newPost(postdto: Postdto, user: User): Promise<Posts> {
    const { title, body } = postdto;

    const newPost = new Posts();
    newPost.title = title;
    newPost.body = body;
    newPost.date = `Posted on ${postDateFormatter()}`;
    newPost.user = user;
    await newPost.save();

    return newPost;
  }
}
