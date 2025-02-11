import { Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class AuthService {
  private readonly validUsername = 'admin'
  private readonly validPassword = 'admin'

  login(username: string, password: string): { message: string; token?: string } {
    if (username === this.validUsername && password === this.validPassword) {
      // In a real application, you would generate a JWT token here
      return { message: 'Login successful', token: 'mocked-jwt-token' }
    } else {
      throw new UnauthorizedException('Invalid credentials')
    }
  }
}
