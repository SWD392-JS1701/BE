import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { MembershipService } from '../services/membership.service'
import { CreateMembershipDto, UpdateMembershipDto } from '../dtos/membership.dto'

@Controller('memberships')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post('create')
  async createMembership(@Body() createMembershipDto: CreateMembershipDto) {
    return this.membershipService.createMembership(createMembershipDto)
  }

  @Get()
  async findAll() {
    return this.membershipService.getAllMemberships()
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.membershipService.getMembershipById(id)
  }

  /** Update membership */
  @Patch(':id')
  async updateMembership(@Param('id') id: string, @Body() updateMembershipDto: UpdateMembershipDto) {
    return this.membershipService.updateMembership(id, updateMembershipDto)
  }

  /** Delete membership */
  @Delete(':id')
  async deleteMembership(@Param('id') id: string) {
    return this.membershipService.deleteMembership(id)
  }
}
