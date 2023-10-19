import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersTable1697446091978 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "bigint",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "username",
                    type: "varchar",
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name:   "verified",
                    type:   "boolean",
                    default:    false,
                    isNullable: false
                },
                {
                    name:      "verifyToken",
                    type:      "varchar",
                    isNullable: false
                },
                {
                   name:    'createdAt',
                   type:    'timestamp',
                   default: 'now()'
                },
                {
                   name:    'updatedAt',
                   type:     'timestamp',
                   onUpdate: 'now()',
                   default:  'now()'
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('users', true)
    }
}
