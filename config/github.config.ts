import { registerAs } from "@nestjs/config";


export const GITHUB_CONFIG = registerAs('github',()=>({
     client_id:     process.env.GITHUB_CLIENT_ID,
     client_secret: process.env.GITHUB_CLIENT_SECRET,
     callback_url:  process.env.GITHUB_CALLBACK_URL
}))