import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { CreateUserDto, DeleteUserDto, UpdateUserDto } from '../dtos/user.dto'
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** Create a user */
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto)
  }

  /** Get all users */
  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers()
  }

  /** Get user by ID */
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id)
  }

  /** Get user by username */
  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    return this.userService.getUserByUsername(username);
  }

  /** Get user by email */
  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  /** Update user */
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto)
  }

  /** Delete user */
  @Delete(':id')
  async deleteUser(@Param('id') id: string , @Body() deleteUserDto: DeleteUserDto) {
    return this.userService.updateUser(id, deleteUserDto)
  }
}
