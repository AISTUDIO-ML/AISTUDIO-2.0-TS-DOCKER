
import { registerAs } from "@nestjs/config";

export const MAIL_CONFIG  = registerAs('mail',()=>({
    user: process.env["MAIL_USER"],
    pass: process.env["MAIL_PASS"],
    from: process.env["MAIL_FROM"],
}));