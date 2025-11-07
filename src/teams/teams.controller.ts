import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Team } from './entities/team.entity';
import { TeamMember } from './entities/team-member.entity';

@Controller('teams')
@UseGuards(JwtAuthGuard)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  createTeam(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamsService.createTeam(createTeamDto);
  }

  @Get()
  findAllTeams(): Promise<Team[]> {
    return this.teamsService.findAllTeams();
  }

  @Get(':id')
  findOneTeam(@Param('id') id: string): Promise<Team> {
    return this.teamsService.findOneTeam(id);
  }

  @Post(':teamId/members')
  addTeamMember(
    @Param('teamId') teamId: string,
    @Body() createTeamMemberDto: CreateTeamMemberDto,
  ): Promise<TeamMember> {
    return this.teamsService.addTeamMember(teamId, createTeamMemberDto);
  }

  @Get('members/all')
  findAllTeamMembers(): Promise<TeamMember[]> {
    return this.teamsService.findAllTeamMembers();
  }

  @Get('members/:id')
  findOneTeamMember(@Param('id') id: string): Promise<TeamMember> {
    return this.teamsService.findOneTeamMember(id);
  }

  @Delete(':id')
  removeTeam(@Param('id') id: string): Promise<void> {
    return this.teamsService.removeTeam(id);
  }
}