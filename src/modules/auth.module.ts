import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthService } from '../services/auth.service'
import { User, UserSchema } from '../models/user.model'
import { AuthController } from '~/controllers/auth.controller'
import { UserModule } from '../modules/user.module';
import { AuthGuard } from '~/auth/auth.guard'
import * as dotenv from 'dotenv'

dotenv.config()

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60s' }
      })
    }),
    UserModule 
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, JwtModule, AuthGuard]
})
export class AuthModule {}
