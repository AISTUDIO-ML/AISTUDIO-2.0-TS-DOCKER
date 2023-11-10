import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name:'tokens'})
export class Token{

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    token: string

    @Column({unique: true})
    email: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}