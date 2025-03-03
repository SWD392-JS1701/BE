import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from '../models/schedule.model';
import { ScheduleService } from '../services/schedule.service';
import { ScheduleController } from '../controllers/schedule.controller';
import { ScheduleRepository } from '../repositories/schedule.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Schedule.name, schema: ScheduleSchema }]),
  ],
  providers: [ScheduleService, ScheduleRepository],
  controllers: [ScheduleController],
  exports: [ScheduleService, ScheduleRepository],
})
export class ScheduleModule {}
