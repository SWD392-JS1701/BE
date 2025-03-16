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
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  booking_time!: Date;
}

export class UpdateBookingDto {
  @ApiProperty({ example: 'u456', description: 'User ID (optional)' })
  @IsString()
  user_id?: string;

  @ApiProperty({ example: 'd789', description: 'Doctor ID (optional)' })
  @IsString()
  doctor_id?: string;

  @ApiProperty({ example: 'c101', description: 'Combo ID (optional)' })
  @IsString()
  combo_id?: string;

  @ApiProperty({ example: '2024-03-14T12:00:00.000Z', description: 'Updated Booking Time' })
  @Transform(({ value }) => new Date(value))  // Ensures correct Date parsing
  @IsDate()
  booking_time?: Date;
}
