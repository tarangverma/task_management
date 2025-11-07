
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateTeamMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}