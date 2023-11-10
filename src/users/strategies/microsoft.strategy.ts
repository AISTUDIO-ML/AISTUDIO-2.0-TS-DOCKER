import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-microsoft";
import { AuthService } from "../services/auth.service";


@Injectable()
export class MicrosoftAuthStrategy extends PassportStrategy(Strategy,'microsoft-auth'){

   constructor(
      private configService: ConfigService,
      private authService: AuthService
      
   ){
        super({
                clientID:     configService.getOrThrow('microsoft.client_id'),
                clientSecret: configService.getOrThrow('microsoft.client_secret'),
                callbackURL:  configService.getOrThrow('microsoft.callback_url'),
                scope: ['user.read'],
                tenant: 'common'
        })
   }

   async validate(
        accessToken:  string,
        refreshToken: string,
        profile: any,
        done: any
   ){
      const authData: any = {
          profileId: profile.id
      }
      const token = await this.authService.loginWithMicrosoft( authData)
      done(null, { token });
   }
   
}