import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { CreateUserDto, LoginDto } from '../dtos/user.dto'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { UserService } from '../services/user.service'
import { CustomRequest } from '../custom/custom-request'
import { JwtAuthGuard } from '../guards/JwtAuthGuard'
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @Post('register')
  @ApiOperation({ summary: 'User Registration' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: CustomRequest) {
    const userId = req.user.id
    return this.userService.getUserById(userId)
  }
}
