import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../models/user.model'
import { UserService } from '../services/user.service'
import { UserController } from '../controllers/user.controller'
import { UserRepository } from '../repositories/user.repository'
import { AuthModule } from '../modules/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository]
})
export class UserModule {}
