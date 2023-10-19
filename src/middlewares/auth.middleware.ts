import { Injectable, InternalServerErrorException, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { UserService } from "src/users/services/users.service";


@Injectable()
export class AuthMiddleware implements NestMiddleware{

    constructor(
        private jwtService:    JwtService,
        private configService: ConfigService,
        private userService:   UserService
    ){}


    async use(req: Request, res: Response, next: (error?: any) => void) {
        const token = this.extractTokenFromHeader(req);
        if (!token) {
            throw new UnauthorizedException('Missing Token');
        }
        try {
            const payload = this.jwtService.verify(
                token,
                {
                  secret: this.configService.getOrThrow('jwt.secret')
                }
            );
            const user = await this.userService.findById(Number(payload.sub))
            if(!user){
                  throw new Error()
            }
            req['user'] = user
        }catch {
            throw new UnauthorizedException('Failed to Decode JWT Token');
        }
        next()
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}