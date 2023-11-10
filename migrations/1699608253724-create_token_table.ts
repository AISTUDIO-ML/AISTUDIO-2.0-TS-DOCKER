import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTokenTable1699608253724 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
             name: 'tokens',
             columns:[
                {
                    name:'id',
                    type:'bigint',
                    isPrimary:   true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name:      'token',
                    type:      'varchar',
                    isUnique:   true,
                    isNullable: false
                },
                {
                    name:      'email',
                    type:      'varchar',
                    isUnique:   true,
                    isNullable: false
                },
                {
                    name:'createdAt',
                    type:'timestamp',
                    isNullable: false,
                    default: 'now()'
                },
                {
                    name:'updatedAt',
                    type:'timestamp',
                    isNullable: false,
                    default: 'now()',
                    onUpdate:'now()'
                }
             ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(new Table({
             name: 'users'
        }),true);
    }

}
