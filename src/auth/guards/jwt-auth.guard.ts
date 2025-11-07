import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from '../../tasks/tasks.controller';
import { TasksService } from '../../tasks/tasks.service';
import { Task } from '../../tasks/entities/task.entity';
import { TeamMember } from '../../teams/entities/team-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TeamMember])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}