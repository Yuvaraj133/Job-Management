'use client';

import { useEffect, useState } from 'react';
import {
  Container,
  Button,
  Divider,
  Title,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import Navbar from './components/Navbar';
import JobCard from './components/JobCard';
import JobFormModal from './components/JobFormModal';
import FilterBar from './components/FilterBar';

type Job = {
  id: number;
  title: string;
  companyName: string;
  location: string;
  jobType: string;
  salaryRange: string;
  description: string;
  applicationDeadline: string;
};

type Filters = {
  title: string;
  location: string;
  jobType: string;
  salaryRange: [number, number];
};

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<Filters>({
    title: '',
    location: '',
    jobType: '',
    salaryRange: [50000, 80000],
  });

  const [opened, { open, close }] = useDisclosure(false);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:3001/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobCreate = async (data: Job) => {
    try {
      await axios.post('http://localhost:3001/jobs', data);
      fetchJobs();
    } catch (err) {
      console.error('Error creating job:', err);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.title
      .toLowerCase()
      .includes(filters.title.toLowerCase());

    const locationMatch = filters.location
      ? job.location.toLowerCase() === filters.location.toLowerCase()
      : true;

    const jobTypeMatch = filters.jobType
      ? job.jobType.toLowerCase() === filters.jobType.toLowerCase()
      : true;

    const minFilter = filters.salaryRange[0];
    const maxFilter = filters.salaryRange[1];

    let jobSalaryMin = 0;
    let jobSalaryMax = 0;

    if (job.salaryRange.includes('-')) {
      const parts = job.salaryRange
        .replace(/₹/g, '')
        .split('-')
        .map((s) => parseInt(s.trim()));
      jobSalaryMin = parts[0];
      jobSalaryMax = parts[1];
    } else {
      jobSalaryMin = parseInt(job.salaryRange.replace(/₹/g, '').trim());
      jobSalaryMax = jobSalaryMin;
    }

    const salaryMatch =
      (jobSalaryMin >= minFilter && jobSalaryMin <= maxFilter) ||
      (jobSalaryMax >= minFilter && jobSalaryMax <= maxFilter) ||
      (jobSalaryMin <= minFilter && jobSalaryMax >= maxFilter);

    return titleMatch && locationMatch && jobTypeMatch && salaryMatch;
  });

  return (
    <Container size="xl" py="lg">
      <Navbar onCreateClick={open} />
      <FilterBar filters={filters} setFilters={setFilters} />
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 1200, cols: 3 },
          { maxWidth: 900, cols: 2 },
          { maxWidth: 600, cols: 1 },
        ]}
      >
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <Text>No jobs match the selected filters.</Text>
        )}
      </SimpleGrid>

      <JobFormModal opened={opened} close={close} onSubmit={handleJobCreate} />
    </Container>
  );
}
