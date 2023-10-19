import { MailerModule, MailerOptions, MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
    imports:[
        MailerModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
                let  options: MailerOptions;
                options={
                    transport:{
                       host: 'smtp.mailgun.org',
                       auth:{
                           user: configService.get('mail.user'),
                           pass: configService.get('mail.pass'),
                       },
                       secure:false,
                    }, 
                    defaults:{
                       from: configService.get('mail.from'),
                    },
                    template:{
                        dir: `${__dirname}/templates`,
                        adapter: new HandlebarsAdapter(),
                        options:{
                            strict: true
                        }
                    },
                }
                return options;
            },
            inject:[ConfigService]
        })
    ]
})
export class MailModule {}
