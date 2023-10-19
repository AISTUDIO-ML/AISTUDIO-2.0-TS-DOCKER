import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource } from "typeorm";
config({
    path: `${__dirname}/../config/env/${process.env.NODE_ENV}.env`
})

export default new DataSource({
    type:     'mysql',
    host:      process.env['DATABASE_HOST'],
    username:  process.env['DATABASE_USER'],
    password:  process.env['DATABASE_PASS'],
    database:  process.env['DATABASE_NAME'],
    port:      Number(process.env['DATABAES_PORT']),
    migrationsTableName: 'migrations',
    migrations:['migrations/*.ts']
})