import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { postDateFormatter } from 'src/posts/postdateformatter';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDtoReg } from './dto/auth-credentialsReg.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(
    authCredentialsDtoReg: AuthCredentialsDtoReg,
  ): Promise<void> {
    const { username, password, firstname, lastname, email } =
      authCredentialsDtoReg;
    let { date } = authCredentialsDtoReg;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    date = `Account created on ${postDateFormatter()}`;
    const user = this.create({
      username,
      password: hashedPassword,
      firstname,
      lastname,
      email,
      date,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        //postgres code that means duplicate based on entity decorator Duplicate()
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
