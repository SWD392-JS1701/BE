import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength, IsInt, IsDate, IsIn } from 'class-validator'
import { Type } from 'class-transformer';
export class CreateScheduleDto{
       @IsDate()
      date!: Date;
    
      @IsString()
      dayOfWeek!: string;

        @IsString()
        slotId!: string;

        @IsString()
        startTime!: string;

        @IsString()
        endTime!: string;

        @IsString()
        doctorId!: string;

        @IsString()
        doctorName!: string;

        @IsString()
        status!: string;
}

export class UpdateScheduleDto {
  @ApiPropertyOptional({ example: '2025-03-04T00:00:00.000Z', description: 'The date of the schedule' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date?: Date;

  @ApiPropertyOptional({ example: 'Tuesday', description: 'The day of the week' })
  @IsString()
  @IsOptional()
  dayOfWeek?: string;

  @ApiPropertyOptional({ example: '09:00 AM', description: 'Start time of the schedule' })
  @IsString()
  @IsOptional()
  startTime?: string;

  @ApiPropertyOptional({ example: '10:00 AM', description: 'End time of the schedule' })
  @IsString()
  @IsOptional()
  endTime?: string;
}

export class UpdateSlotDto {
  @ApiPropertyOptional({ example: "doc-123", description: "Doctor ID assigned to this slot" })
  @IsOptional()
  @IsString()
  doctorId?: string;

  @ApiPropertyOptional({ example: "Dr. John Doe", description: "Doctor's name" })
  @IsOptional()
  @IsString()
  doctorName?: string;

  @ApiPropertyOptional({ example: "Cardiology", description: "Doctor's specialization" })
  @IsOptional()
  @IsString()
  specialization?: string;

  @ApiPropertyOptional({
    example: "booked",
    description: "Status of the slot (must be 'available', 'booked', or 'cancelled')",
    enum: ['available', 'booked', 'cancelled'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['available', 'booked', 'cancelled'])
  status?: string;
}