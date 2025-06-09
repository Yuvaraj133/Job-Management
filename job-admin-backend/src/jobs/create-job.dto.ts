import { IsString, IsDateString } from 'class-validator';

export class CreateJob{
    @IsString() title:string;
    @IsString() companyName: string;
    @IsString() location: string;
    @IsString() jobType: string;
    @IsString() salaryRange: string;
    @IsString() description: string;
    @IsDateString() applicationDeadline: string;
}