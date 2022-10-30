import { IsAlpha, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UsersSearchDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsAlpha()
  keyword: string;
}
