import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Membership, MembershipSchema } from '../models/membership.model'
import { MembershipController } from '~/controllers/membership.controller'
import { MembershipService } from '~/services/membership.service'
import { AuthModule } from './auth.module'


@Module({
  imports: [MongooseModule.forFeature([{ name: Membership.name, schema: MembershipSchema }]), AuthModule],
  controllers: [MembershipController],
  providers: [MembershipService],
  exports: [MembershipService]
})
export class MembershipModule {}
