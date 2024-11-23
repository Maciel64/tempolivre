import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John', description: "User's first name" })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Doe', description: "User's last name" })
  lastName: string;

  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'Email do usuário',
  })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({ example: '12345678', description: "User's password" })
  @IsString()
  @MinLength(8, {
    message: 'The password should be at least 8 characters long',
  })
  password: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John', description: "User's first name" })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Doe', description: "User's last name" })
  lastName: string;
}
