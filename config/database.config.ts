import { registerAs } from "@nestjs/config";


export const DATABASE_CONFIG = registerAs('database',()=>({
    host: process.env['DATABASE_HOST'],
    user: process.env['DATABASE_USER'],
    pass: process.env['DATABASE_PASS'],
    name: process.env['DATABASE_NAME'],
    port: process.env['DATABASE_PORT']
}));