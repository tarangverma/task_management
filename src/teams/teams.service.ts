import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { TeamMember } from './entities/team-member.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
    @InjectRepository(TeamMember)
    private teamMembersRepository: Repository<TeamMember>,
  ) {}

  async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    const team = this.teamsRepository.create(createTeamDto);
    return this.teamsRepository.save(team);
  }

  async findAllTeams(): Promise<Team[]> {
    return this.teamsRepository.find({
      relations: ['members'],
    });
  }

  async findOneTeam(id: string): Promise<Team> {
    const team = await this.teamsRepository.findOne({
      where: { id },
      relations: ['members', 'members.tasks'],
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    return team;
  }

  async addTeamMember(teamId: string, createTeamMemberDto: CreateTeamMemberDto): Promise<TeamMember> {
    const team = await this.findOneTeam(teamId);
    
    const teamMember = this.teamMembersRepository.create({
      ...createTeamMemberDto,
      team,
    });

    return this.teamMembersRepository.save(teamMember);
  }

  async findAllTeamMembers(): Promise<TeamMember[]> {
    return this.teamMembersRepository.find({
      relations: ['team', 'tasks'],
    });
  }

  async findOneTeamMember(id: string): Promise<TeamMember> {
    const teamMember = await this.teamMembersRepository.findOne({
      where: { id },
      relations: ['team', 'tasks'],
    });

    if (!teamMember) {
      throw new NotFoundException(`Team member with ID ${id} not found`);
    }

    return teamMember;
  }

  async removeTeam(id: string): Promise<void> {
    const result = await this.teamsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
  }
}