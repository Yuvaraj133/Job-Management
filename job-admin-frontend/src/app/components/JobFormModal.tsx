'use client';

import React, { useState } from 'react';
import {
  Modal,
  Stack,
  TextInput,
  Textarea,
  Select,
  Button,
  Grid,
  Group,
  Box,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function JobFormModal({ opened, close, onSubmit }: any) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const theme = useMantineTheme();

  // Local state for controlled salary inputs
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');

  // Format value as currency string (e.g. ₹1,23,456)
  const formatCurrency = (value: string | number) => {
    if (typeof value === 'number') value = value.toString();
    if (!value) return '';
    const num = Number(value.replace(/[₹,]/g, ''));
    if (isNaN(num)) return '';
    return `₹${num.toLocaleString('en-IN')}`;
  };

  // Remove formatting and return raw number string
  const parseCurrency = (value: string) => {
    return value.replace(/[₹,]/g, '');
  };

  // Update state and react-hook-form value for salary min
  const handleSalaryMinChange = (value: string) => {
    setSalaryMin(formatCurrency(value));
    setValue('salaryMin', parseCurrency(value));
  };

  // Update state and react-hook-form value for salary max
  const handleSalaryMaxChange = (value: string) => {
    setSalaryMax(formatCurrency(value));
    setValue('salaryMax', parseCurrency(value));
  };

  const handleFormSubmit = (data: any) => {
    data.salaryMin = Number(data.salaryMin) || 0;
    data.salaryMax = Number(data.salaryMax) || 0;

    data.salaryRangeStr =
      data.salaryMin && data.salaryMax
        ? `₹${data.salaryMin} - ₹${data.salaryMax}`
        : data.salaryMin
        ? `₹${data.salaryMin}`
        : data.salaryMax
        ? `₹${data.salaryMax}`
        : '';

    onSubmit(data);
    reset();
    setSalaryMin('');
    setSalaryMax('');
    close();
  };

  const sharedStyles = {
    label: { fontWeight: 500 },
    input: {
      '&:focus': {
        borderColor: 'black',
        boxShadow: '0 0 0 1px black',
      },
    },
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      size="lg"
      centered
      radius="md"
      title={
        <div style={{ width: '100%', textAlign: 'center', fontWeight: 600 }}>
          Create Job Opening
        </div>
      }
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack gap="md" style={{ padding: theme.spacing.sm }}>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Job Title"
                placeholder="Full Stack Developer"
                {...register('title', { required: true })}
                styles={sharedStyles}
                withAsterisk={false}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Company Name"
                placeholder="Amazon, Microsoft, Swiggy"
                {...register('companyName', { required: true })}
                styles={sharedStyles}
                withAsterisk={false}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                label="Location"
                placeholder="Choose Preferred Location"
                data={['Chennai', 'Bangalore', 'Remote']}
                {...register('location', { required: true })}
                styles={sharedStyles}
                withAsterisk={false}
                rightSection={<KeyboardArrowDownIcon fontSize="small" />}
                onChange={(value) => setValue('location', value || '')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Job Type"
                data={['Full-time', 'Part-time', 'Contract', 'Internship']}
                {...register('jobType', { required: true })}
                styles={sharedStyles}
                withAsterisk={false}
                rightSection={<KeyboardArrowDownIcon fontSize="small" />}
                onChange={(value) => setValue('jobType', value || '')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Grid gutter="sm">
                <Grid.Col span={6}>
                  <TextInput
                    label="Salary Min"
                    placeholder="₹0"
                    value={salaryMin}
                    onChange={(e) => handleSalaryMinChange(e.currentTarget.value)}
                    styles={sharedStyles}
                    withAsterisk={false}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    label="Salary Max"
                    placeholder="₹12,00,000"
                    value={salaryMax}
                    onChange={(e) => handleSalaryMaxChange(e.currentTarget.value)}
                    styles={sharedStyles}
                    withAsterisk={false}
                  />
                </Grid.Col>
              </Grid>
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Application Deadline"
                type="date"
                {...register('applicationDeadline', { required: true })}
                styles={sharedStyles}
                withAsterisk={false}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Textarea
                label="Job Description"
                placeholder="Please share a description to let the candidate know more about the job role"
                minRows={3}
                autosize={false}
                styles={{
                  label: { fontWeight: 500 },
                  input: {
                    resize: 'vertical',
                    width: '100%',
                    '&:focus': {
                      borderColor: 'black',
                      boxShadow: '0 0 0 1px black',
                    },
                  },
                }}
                {...register('description', { required: true })}
                withAsterisk={false}
              />
            </Grid.Col>
          </Grid>

          <Group mt="md" grow>
            <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="outline"
                color="dark"
                style={{ borderColor: 'black', color: 'black' }}
                rightSection={<KeyboardArrowDownIcon fontSize="small" />}
              >
                Save Draft
              </Button>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant="filled" color="#00AAFF">
                Publish &raquo;
              </Button>
            </Box>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
