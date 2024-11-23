import { Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './User';
import { CreateUserDTO } from './user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Usuários listados com sucesso' })
  index(): User[] {
    return [];
  }

  @Post()
  @ApiOperation({ summary: 'Criar um usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiBody({ description: 'Dados para criar um usuário', type: CreateUserDTO })
  store(): User {
    return new User();
  }
}
