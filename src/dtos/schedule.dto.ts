import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength, IsInt, IsDate, IsIn } from 'class-validator'
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
        specialization!: string;

        @IsString()
        status!: string;
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