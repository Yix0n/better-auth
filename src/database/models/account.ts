import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    login: string

    @Column()
    username: string

    @Column('float')
    password_lat: number

    @Column('float')
    password_lng: number
    
    @Column({
        default: Date.now()
    })
    creationDate: number
}