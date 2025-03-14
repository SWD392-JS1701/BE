import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: 'b123', description: 'Unique booking ID' })
  @IsString()
  @IsNotEmpty()
  booking_id!: string;

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

  @ApiProperty({ example: '2024-03-14T10:00:00.000Z', description: 'Booking Time' })
  @IsDate()
  @IsNotEmpty()
  booking_time!: Date;
}

export class UpdateBookingDto {
  @ApiProperty({ example: '2024-03-14T12:00:00.000Z', description: 'Updated Booking Time' })
  @IsDate()
  booking_time?: Date;
}
