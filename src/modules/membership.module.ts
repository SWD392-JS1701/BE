import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Membership, MembershipSchema } from '../models/membership.model';
import { MembershipController } from '~/controllers/membership.controller';
import { MembershipService } from '~/services/membership.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Membership.name, schema: MembershipSchema }]),
  ],
  controllers: [MembershipController],
  providers: [MembershipService],
})
export class MembershipModule {}
