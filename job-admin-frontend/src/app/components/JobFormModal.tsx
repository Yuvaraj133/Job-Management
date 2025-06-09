'use client';

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
  NumberInput,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function JobFormModal({ opened, close, onSubmit }: any) {
  const { register, handleSubmit, reset, setValue } = useForm();

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
        <Stack gap="md" style={{ padding: 'var(--mantine-spacing-sm)' }}>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Job Title"
                placeholder="Full Stack Developer"
                {...register('title')}
                required
                styles={sharedStyles}
                withAsterisk={false}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Company Name"
                placeholder="Amazon, Microsoft, Swiggy"
                {...register('companyName')}
                required
                styles={sharedStyles}
                withAsterisk={false}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                label="Location"
                placeholder="Choose Preferred Location"
                data={['Chennai', 'Bangalore', 'Remote']}
                {...register('location')}
                required
                styles={sharedStyles}
                withAsterisk={false}
                rightSection={<KeyboardArrowDownIcon fontSize="small" />}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Job Type"
                data={['Full-time', 'Part-time', 'Contract', 'Internship']}
                {...register('jobType')}
                required
                styles={sharedStyles}
                withAsterisk={false}
                rightSection={<KeyboardArrowDownIcon fontSize="small" />}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Grid gutter="sm">
                <Grid.Col span={6}>
                  <NumberInput
                    label="Salary Min"
                    placeholder="₹0"
                    prefix="₹"
                    {...register('salaryMin')}
                    hideControls
                    styles={sharedStyles}
                    withAsterisk={false}
                    parser={(value) => value?.replace(/₹\s?|(,*)/g, '')}
                    formatter={(value) =>
                      !Number.isNaN(parseFloat(value || ''))
                        ? `₹${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : '₹'
                    }
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <NumberInput
                    label="Salary Max"
                    placeholder="₹12,00,000"
                    prefix="₹"
                    {...register('salaryMax')}
                    hideControls
                    styles={sharedStyles}
                    withAsterisk={false}
                    parser={(value) => value?.replace(/₹\s?|(,*)/g, '')}
                    formatter={(value) =>
                      !Number.isNaN(parseFloat(value || ''))
                        ? `₹${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : '₹'
                    }
                  />
                </Grid.Col>
              </Grid>
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Application Deadline"
                type="date"
                {...register('applicationDeadline')}
                required
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
                {...register('description')}
                required
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
              <Button type="submit" variant="filled" style={{ backgroundColor: '#00AAFF' }}>
                Publish &raquo;
              </Button>
            </Box>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
