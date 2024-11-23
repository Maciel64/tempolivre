import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { User } from './User';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Show all users' })
  @ApiResponse({ status: 200, description: 'Users retrived successfully' })
  async index(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Show one user' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The param of the requested User',
  })
  @ApiResponse({ status: 200, description: 'User retrived successfully' })
  async show(@Param('id') id: string): Promise<User> {
    return await this.userService.get(parseInt(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create an User' })
  @ApiResponse({ status: 201, description: 'User created sucessfully' })
  @ApiResponse({
    status: 403,
    description: "The passed user's email was already registered",
  })
  @ApiBody({ description: 'Data to create an User', type: CreateUserDTO })
  async store(@Body() data: CreateUserDTO): Promise<User> {
    return await this.userService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an User' })
  @ApiResponse({ status: 200, description: 'User updated sucessfully' })
  @ApiResponse({
    status: 403,
    description: "The passed user's email was already registered",
  })
  @ApiBody({ description: 'Data to update an User', type: UpdateUserDTO })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDTO,
  ): Promise<User> {
    return await this.userService.update(parseInt(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an User' })
  @ApiResponse({ status: 204, description: 'User deleted sucessfully' })
  @ApiResponse({
    status: 404,
    description: 'The requested user was not found registered',
  })
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.userService.delete(parseInt(id));
  }
}
