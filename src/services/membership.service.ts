import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Membership, MembershipDocument } from '../models/membership.model'
import { CreateMembershipDto, UpdateMembershipDto } from '~/dtos/membership.dto'

@Injectable()
export class MembershipService {
  constructor(@InjectModel(Membership.name) private membershipModel: Model<MembershipDocument>) {}

  /* Create membership */
  async createMembership(createMembershipDto: CreateMembershipDto): Promise<Membership> {
    const newMembership = new this.membershipModel({
      ...createMembershipDto
    })
    return newMembership.save()
  }

  /* Get all memberships */
  async getAllMemberships(): Promise<Membership[]> {
    return this.membershipModel.find().exec()
  }

  /* Get a membership type by ID */
  async getMembershipById(id: string): Promise<Membership> {
    const objectId = new Types.ObjectId(id)
    const membership = await this.membershipModel.findById(objectId).exec()
    if (!membership) throw new NotFoundException('Membership type not found')
    return membership
  }

  /* Update membership */
  async updateMembership(id: string, updateMembershipDto: UpdateMembershipDto): Promise<Membership> {
    const updatedMembership = await this.membershipModel
      .findByIdAndUpdate(id, { $set: updateMembershipDto, updatedAt: new Date() }, { new: true })
      .exec()
    if (!updatedMembership) throw new NotFoundException('Membership type not found')
    return updatedMembership
  }

  /* Delete membership */
  async deleteMembership(id: string): Promise<void> {
    const objectId = new Types.ObjectId(id)
    const membership = await this.membershipModel.findByIdAndDelete(objectId).exec()
    if (!membership) throw new NotFoundException('Membership type not found')
  }
}
