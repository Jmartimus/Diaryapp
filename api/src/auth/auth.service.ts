import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDtoReg } from './dto/auth-credentialsReg.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload';
import { AuthCredentialsDtoLog } from './dto/auth-credentialsLog.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async register(authCredentialsDtoReg: AuthCredentialsDtoReg): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDtoReg);
  }

  async signIn(
    authCredentialsDtoLog: AuthCredentialsDtoLog,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDtoLog;
    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
