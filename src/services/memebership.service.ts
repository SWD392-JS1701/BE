import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Membership, MembershipDocument } from '../models/membership.model';

@Injectable()
export class MembershipService {
  constructor(
    @InjectModel(Membership.name) private membershipModel: Model<MembershipDocument>,
  ) {}

  /* Create membership */
  async createMembership(data: Partial<Membership>): Promise<Membership> {
    return this.membershipModel.create(data);
  }

  /* Get all memberships */
  async getAllMemberships(): Promise<Membership[]> {
    return this.membershipModel.find().exec();
  }

  /* Get a membership type by ID */
    async getMembershipById(id: string): Promise<Membership> {
      const objectId = new Types.ObjectId(id);
      const membership = await this.membershipModel.findById(objectId).exec();
      if (!membership) throw new NotFoundException('Membership type not found');
      return membership;
    }
}
