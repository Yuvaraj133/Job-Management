import { Controller,Get,Post,Body,Param,Delete } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJob } from './create-job.dto';
import { retry } from 'rxjs';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Post()
    create(@Body() CreateJob:CreateJob){
        return this.jobsService.create(CreateJob)
    }

    @Get()
    findAll(){
        return this.jobsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.jobsService.findOne(+id)
    }

    @Delete(':id')
    remove(@Param('id')id:string){
        return this.jobsService.remove(+id)
    }
}
