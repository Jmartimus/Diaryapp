import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDtoReg {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @IsString()
  email: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  date: string;
}
