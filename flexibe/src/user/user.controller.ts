import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './User';
import { CreateUserDTO } from './user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Usuários listados com sucesso' })
  async index(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create an User' })
  @ApiResponse({ status: 201, description: 'User created sucessfully' })
  @ApiResponse({
    status: 403,
    description: "The passed user's email was already registered",
  })
  @ApiBody({ description: 'Dados para criar um usuário', type: CreateUserDTO })
  async store(@Body() data: CreateUserDTO): Promise<User> {
    return await this.userService.create(data);
  }
}
