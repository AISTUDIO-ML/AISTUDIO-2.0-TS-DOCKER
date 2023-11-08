import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-microsoft";


@Injectable()
export class MicrosoftAuthStrategy extends PassportStrategy(Strategy,'microsoft-auth'){

   constructor(private configService: ConfigService){
        super({
                clientID:     configService.getOrThrow('microsoft.client_id'),
                clientSecret: configService.getOrThrow('microsoft.client_secret'),
                callbackURL:  'http://localhost:5000/users/microsoft-auth-callback',
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
      const user = {
            profile
      };
      done(null, user);
   }
   
}