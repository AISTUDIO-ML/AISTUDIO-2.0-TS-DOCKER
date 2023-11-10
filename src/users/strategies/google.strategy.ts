import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "../services/auth.service";
import { ConfigService } from "@nestjs/config";



@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy,'google-auth'){


    constructor(
        private configService: ConfigService,
        private authService: AuthService
    ){
         super({
            clientID:     configService.getOrThrow('google.client_id'),
            clientSecret: configService.getOrThrow('google.client_secret'),
            scope:        ['email','profile'],
            callbackURL:  configService.getOrThrow('google.callback_url')
         })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const authData: any = {
            profileId: profile.id,
        }
        const token = await this.authService.loginWithGoogle( authData )
        done(null, { token });
      }
}