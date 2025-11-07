import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { TeamMember } from '../teams/entities/team-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TeamMember])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}