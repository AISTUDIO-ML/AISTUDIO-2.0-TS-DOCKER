import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
import { AuthService } from "../services/auth.service";

@Injectable()
export class GithubAuthStrategy extends PassportStrategy(Strategy,'github-auth'){

    constructor(
        private configService: ConfigService,
        private authService: AuthService
    ){
        super({
            clientID:     configService.getOrThrow('github.client_id'),
            clientSecret: configService.getOrThrow('github.client_secret'),
            callbackURL:  configService.getOrThrow('github.callback_url')
        })
    }


    async validate(
        accessToken:  string,
        refreshToken: string,
        profile: any,
        done: any
    ){
         const authData = {
             profileId: profile.id
         }

         const token = await this.authService.loginWithGithub(authData);
         done(null,{ token })
    }
}