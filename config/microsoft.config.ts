import { registerAs } from "@nestjs/config";


export const MICROSOFT_CONFIG = registerAs('microsoft',()=>({
     client_id:     process.env.MICROSOFT_CLIENT_ID,
     client_secret: process.env.MICROSOFT_CLIENT_SECRET,
     callback_url:  process.env.MICROSOFT_CALLBACK_URL
}))