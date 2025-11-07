import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { TaskStatus, TaskPriority } from '../entities/task.entity';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;
}