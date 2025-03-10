import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthService } from '../services/auth.service'
import { User, UserSchema } from '../models/user.model'
import { AuthController } from '~/controllers/auth.controller'
import { UserModule } from '../modules/user.module'
import { AuthGuard } from '~/auth/auth.guard'
import * as dotenv from 'dotenv'
import { AuthRepository } from '~/repositories/auth.repository'
import { MailService } from '~/services/mail.service'
import { ResetToken, ResetTokenModel } from '../models/reset-token.model';
import { RefreshToken, RefreshTokenModel } from '~/models/refresh-token.model'
import { UserRepository } from '~/repositories/user.repository'

dotenv.config()

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema },
      { name: ResetToken.name, schema: ResetTokenModel },
      { name: RefreshToken.name, schema: RefreshTokenModel }
    ]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '15m' }
      })
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, AuthRepository, MailService, UserRepository],
  exports: [AuthService, JwtModule, AuthGuard, AuthRepository]
})
export class AuthModule {}
