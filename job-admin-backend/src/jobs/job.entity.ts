import {Entity,PrimaryGeneratedColumn,Column} from 'typeorm';
@Entity()
export class Job{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    companyName:string;

    @Column()
    location:string;

    @Column()
    jobType:string;

    @Column()
    salaryRange:string;

    @Column('text')
    description: string;

    @Column()
    applicationDeadline: Date;
}