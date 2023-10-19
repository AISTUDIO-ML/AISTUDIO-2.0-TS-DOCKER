import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTeamsTable1697631954370 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name:'teams',
            columns:[
                {
                    name:'id',
                    type:'bigint',
                    isPrimary:   true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },

                {
                    name:'leaderId',
                    type:'bigint',
                    isNullable: false
                },
                {
                    name:'memberId',
                    type:'bigint',
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
        })),
        await queryRunner.createForeignKey('teams',new TableForeignKey({
            columnNames:['leaderId'],
            referencedColumnNames:['id'],
            referencedTableName:'users',
            onDelete: 'CASCADE'
        }))
        await queryRunner.createForeignKey('teams',new TableForeignKey({
            columnNames:['memberId'],
            referencedColumnNames:['id'],
            referencedTableName:'users',
            onDelete: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('teams',true)
    }

}
