import { Controller, Post, Body, Put } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { CreateUserDto, ForgotPasswordDto, LoginDto, ResetPasswordDto } from '../dtos/user.dto'
import { ApiOperation } from '@nestjs/swagger'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
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

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

   @Post('forgot-password')
   async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Put('change-password')
  async changePassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.changePassword(
      resetPasswordDto.newPassword,
      resetPasswordDto.token,
    );
  }
}
