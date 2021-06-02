import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDtoLog } from './dto/auth-credentialsLog.dto';
import { AuthCredentialsDtoReg } from './dto/auth-credentialsReg.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  signUp(@Body() authCredentialsDtoReg: AuthCredentialsDtoReg): Promise<void> {
    return this.authService.register(authCredentialsDtoReg);
  }
  @Post('/signin')
  signIn(
    @Body() authCredentialsDtoLog: AuthCredentialsDtoLog,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDtoLog);
  }
}
