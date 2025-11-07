import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Team } from './team.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('team_members')
export class TeamMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: string;

  @ManyToOne(() => Team, (team) => team.members)
  team: Team;

  @OneToMany(() => Task, (task) => task.assignee)
  tasks: Task[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}