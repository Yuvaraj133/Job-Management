import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { CreateJob } from './create-job.dto';

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Job)
        private jobRepository:Repository<Job>
    ){}
    create(CreateJob:CreateJob):Promise<Job>{
        const job=this.jobRepository.create(CreateJob);
        return this.jobRepository.save(job)
    }

    findAll():Promise<Job[]>{
        return this.jobRepository.find()
    }

    findOne(id:number):Promise<Job | null>{
        return this.jobRepository.findOneBy({id});
    }

    async remove(id: number): Promise<void> {
        await this.jobRepository.delete(id);
    }
}
