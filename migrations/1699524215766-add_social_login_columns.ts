import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddSocialLoginColumns1699524215766 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumns('users',[
            new TableColumn({
                name: 'profileId',
                type: 'varchar',
                isNullable: true,
            }),
            new TableColumn({
                name: 'provider',
                type: 'varchar',
                isNullable: true,
             })
          ]
        )
        await queryRunner.changeColumn('users',
            new TableColumn({
                name: 'username',
                type: 'varchar',
                isNullable: false
            }), 
            new TableColumn({
                name: 'username',
                type: 'varchar',
                isNullable: true
            })
        )
        await queryRunner.changeColumn('users',
            new TableColumn({
                name: 'password',
                type: 'varchar',
                isNullable: false
            }), 
            new TableColumn({
                name: 'password',
                type: 'varchar',
                isNullable: true
            })
        )
        await queryRunner.changeColumn('users',
            new TableColumn({
                name: 'verifyToken',
                type: 'varchar',
                isNullable: false
            }), 
            new TableColumn({
                name: 'verifyToken',
                type: 'varchar',
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropColumns('users',[
            'profileId',
            'provider'
        ]);
        await queryRunner.changeColumn('users',
            new TableColumn({
                name: 'username',
                type: 'varchar',
                isNullable: true
            }), 
            new TableColumn({
                name: 'username',
                type: 'varchar',
                isNullable: false
            })
        )
        await queryRunner.changeColumn('users',
            new TableColumn({
                name: 'password',
                type: 'varchar',
                isNullable: true
            }), 
            new TableColumn({
                name: 'password',
                type: 'varchar',
                isNullable: false
            })
        )
        await queryRunner.changeColumn('users',
            new TableColumn({
                name: 'verifyToken',
                type: 'varchar',
                isNullable: false
            }), 
            new TableColumn({
                name: 'verifyToken',
                type: 'varchar',
                isNullable: true
            })
        )
    }

}
