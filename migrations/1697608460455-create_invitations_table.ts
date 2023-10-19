import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateInvitationsTable1697608460455 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.createTable(new Table({
            name: 'invitations',
            columns:[
                {
                    name:'id',
                    type:'bigint',
                    isPrimary:   true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name:'token',
                    type:'varchar',
                    isNullable: false,
                    isUnique:   true
                },
                {
                    name:'email',
                    type:'varchar',
                    isNullable: false,
                },
                {
                    name:'used',
                    type:'boolean',
                    isNullable: false,
                    default:    false
                },
                {
                    name:'ownerId',
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
        }))

        await queryRunner.createForeignKey('invitations',new TableForeignKey({
            columnNames:['ownerId'],
            referencedColumnNames:['id'],
            referencedTableName:'users',
            onDelete: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('invitations',true)

    }
}
