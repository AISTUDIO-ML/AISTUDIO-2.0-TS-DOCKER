import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";



@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy,'google-auth'){


    constructor(){
         super({
            clientID:     process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            scope:        ['email','profile'],
            callbackURL:  'http://localhost:5000/users/google-auth-callback'
         })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
      ): Promise<any> {
            const { name, emails, photos } = profile;
            const user = {
                email:       emails[0].value,
                firstName:   name.givenName,
                lastName:    name.familyName,
            };
            done(null, user);
      }
}