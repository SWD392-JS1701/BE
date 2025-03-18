import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateBookingDto {
  @ApiProperty({ example: 'u456', description: 'User ID' })
  @IsString()
  @IsNotEmpty()
  user_id!: string;

  @ApiProperty({ example: 'd789', description: 'Doctor ID' })
  @IsString()
  @IsNotEmpty()
  doctor_id!: string;

  @ApiProperty({ example: 'c101', description: 'Combo ID' })
  @IsString()
  @IsNotEmpty()
  combo_id!: string;

  @ApiProperty({ example: '2024-03-19T10:00:00.000Z', description: 'Booking Time' })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  booking_time!: Date;

  @ApiProperty({ example: '2024-03-19', description: 'Booking Date (YYYY-MM-DD)' })
  @IsString()
  @IsNotEmpty()
  booking_date!: string;

  @ApiProperty({ example: 'Tuesday', description: 'Day of the week' })
  @IsString()
  @IsNotEmpty()
  dayofweek!: string;
}

export class UpdateBookingDto {
  @ApiProperty({ example: '2024-03-14T12:00:00.000Z', description: 'Updated Booking Time' })
  @IsDate()
  booking_time?: Date;

  @ApiProperty({ example: '2024-03-19', description: 'Updated Booking Date (YYYY-MM-DD)' })
  @IsString()
  booking_date?: string;

  @ApiProperty({ example: 'Tuesday', description: 'Updated Day of the week' })
  @IsString()
  dayofweek?: string;
}
