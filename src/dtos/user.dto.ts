import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, MinLength, IsInt } from 'class-validator'

export class CreateUserDto {
  @IsString()
  username!: string

  @IsString()
  @MinLength(6)
  plainPassword!: string

  @IsEmail()
  email!: string

  @IsOptional()
  @IsString()
  role?: string

  @IsOptional()
  @IsString()
  skin_type?: string

  @IsOptional()
  membership_id?: string

  @IsOptional()
  point?: number

  @IsOptional()
  @IsString()
  first_name?: string

  @IsOptional()
  @IsString()
  last_name?: string

  @IsOptional()
  @IsString()
  phone_number?: string

  @IsOptional()
  @IsString()
  address?: string

  @IsOptional()
  @IsInt()
  status!: number

  @IsOptional()
  @IsString()
  skinType?: string

  @IsOptional()
  @IsString()
  sensitivity?: string
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string

  @IsOptional()
  @IsString()
  @MinLength(6)
  plainPassword?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  role?: string

  @IsOptional()
  @IsString()
  skin_type?: string

  @IsOptional()
  membership_id?: string

  @IsOptional()
  point?: number

  @IsOptional()
  @IsString()
  first_name?: string

  @IsOptional()
  @IsString()
  last_name?: string

  @IsOptional()
  @IsString()
  phone_number?: string

  @IsOptional()
  @IsString()
  address?: string

  @IsOptional()
  @IsString()
  skinType?: string

  @IsOptional()
  @IsString()
  sensitivity?: string

  @IsOptional()
  @IsString()
  status?: number
}

export class DeleteUserDto {
  @IsOptional()
  @IsString()
  status?: 0
}

export class LoginDto {
  @IsOptional()
  @IsEmail()
  email!: string

  @IsOptional()
  @IsString()
  password!: string
}

export class ResetPasswordDto {
  @IsOptional()
  @IsString()
  token!: string;

  @IsOptional()
  @IsString()
  newPassword!: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'abc@gmail.com' })
  @IsEmail()
  email!: string;
}
