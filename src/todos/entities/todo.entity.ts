import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 500 })
    description: string;

    @Column()
    done: boolean;
}