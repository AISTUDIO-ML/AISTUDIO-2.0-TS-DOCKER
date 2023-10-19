import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Team } from "../entities/team.entity";
import { Repository } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { UserService } from "src/users/services/users.service";


@Injectable()
export class TeamService{ 
      
    constructor(
        @InjectRepository(Team) private teamRepository: Repository<Team>,
        private userService: UserService
    ){}

    async create(leader: User, member: User){
       await this.teamRepository.save({
           leader: leader,
           member: member
       });
    }

    async getTeamByEmail(leader: User, email: string): Promise<User>{
        if(leader.username === email){
            return leader
        }
        const  emailOwner = await this.userService.getUserByUsername(email);
        if(!emailOwner){
             return null
        }
        const team = await this.teamRepository.findOne({where:{ member: emailOwner}})
        if(team){
             return emailOwner
        }
    }

    async getTeams(leader: User){
        const  teams = await this.teamRepository.find({ where: { leader: leader}, relations:{ member: true}})
        return teams.map((team)=> team.member)
    }
}