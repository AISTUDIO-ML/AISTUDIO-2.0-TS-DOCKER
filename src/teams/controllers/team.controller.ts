import { Controller, Get } from "@nestjs/common";
import { TeamService } from "../services/team.service";
import { Auth } from "src/decorators/auth.decorator";
import { User } from "src/users/entities/user.entity";


@Controller('teams')
export class TeamController{

    constructor(private teamService: TeamService){}

    @Get()
    async etTeams(@Auth() auth: User){
        return await this.teamService.getTeams(auth);
    }

}