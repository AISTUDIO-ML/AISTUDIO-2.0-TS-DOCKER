import { registerAs } from "@nestjs/config";

export const APP_CONFIG= registerAs('app',()=>{
    return {
        port:   process.env['PORT'],
        frontend_host:  process.env['FRONTEND_HOST']
    }
})