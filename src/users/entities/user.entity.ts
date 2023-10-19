import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name:'users'})
export class User{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({select: false})
    password: string

    @Column({default: false})
    verified: boolean

    @Column({select: false})
    verifyToken: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}