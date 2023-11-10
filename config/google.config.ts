import { registerAs } from "@nestjs/config";


export const GOOGLE_CONFIG = registerAs('google',()=>({
     client_id:     process.env.GOOGLE_CLIENT_ID,
     client_secret: process.env.GOOGLE_CLIENT_SECRET,
     callback_url:  process.env.GOOGLE_CALLBACK_URL
}))