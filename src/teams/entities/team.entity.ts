import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'teams'})
export class Team{

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=> User)
    leader: User

    @ManyToOne(()=> User)
    member: User

    @Column()
    updatedAt: Date

    @Column()
    createdAt: Date

}