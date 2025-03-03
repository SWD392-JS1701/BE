import { IsEmail, IsOptional, IsString, MinLength, IsInt, IsDate } from 'class-validator'
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