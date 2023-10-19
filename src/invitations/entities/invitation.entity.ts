import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity({name:'invitations'})
export class Invitation{

    @PrimaryGeneratedColumn()
    id: number

    @Column({select:false})
    token: string

    @Column()
    email: string

    @Column()
    used: boolean

    @ManyToOne(()=> User)
    owner: User

    @Column()
    updatedAt: Date

    @Column()
    createdAt: Date
}