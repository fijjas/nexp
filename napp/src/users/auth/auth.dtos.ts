import {
  IsAlpha,
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';
import { Match } from '../../common/validators/match.constraint';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  @IsLowercase()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @MinLength(1)
  @MaxLength(200)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @MinLength(1)
  @MaxLength(200)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @IsNotEmpty()
  @Match(SignUpDto, o => o.password, { message: 'Passwords aren\'t equal' })
  password2: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  password: string;
}

export class AuthenticatedRequestHeadersDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(10000)
  token: string;
}
