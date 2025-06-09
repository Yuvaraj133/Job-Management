'use client';

import { Box, Group, Image, Text, Title, Button } from '@mantine/core';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InventoryIcon from '@mui/icons-material/Inventory';

export default function JobCard({ job }: any) {
  const logoSrc =
    job.companyName?.toLowerCase() === 'swiggy'
      ? '/swiggy.svg'
      : job.companyName?.toLowerCase() === 'amazon'
      ? '/amazon.svg'
      : job.companyName?.toLowerCase() === 'microsoft'
      ? '/microsoft.svg'
      : '/default.svg';

  return (
    <Box
      style={{
        padding: '16px',
        backgroundColor: 'white',
        maxWidth: 280,
        borderRadius: 10,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Group justify="space-between" style={{ marginBottom: '8px' }}>
        <div
          style={{
            width: 48,
            height: 48,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
        >
          <Image
            src={logoSrc}
            width="70%"
            height="70%"
            fit="contain"
            alt="Logo"
          />
        </div>

        <Text
          size="xs"
          style={{
            backgroundColor: '#B0D9FF',
            padding: '4px 8px',
            borderRadius: 10,
            color: 'black',
            fontWeight: 500,
          }}
        >
          24h Ago
        </Text>
      </Group>

      <Title order={4} style={{ marginBottom: '8px', fontWeight: 500 }}>
        {job.title}
      </Title>

      <Text size="sm" c="dimmed" style={{ marginBottom: '8px' }}>
        <Group gap="xs" wrap="nowrap" align="center">
          <PersonIcon fontSize="small" />
          <span style={{ whiteSpace: 'nowrap' }}>1–3 yr Exp</span>
          <ApartmentIcon fontSize="small" />
          <span style={{ whiteSpace: 'nowrap' }}>Onsite</span>
          <InventoryIcon fontSize="small" />
          <span style={{ whiteSpace: 'nowrap' }}>12LPA</span>
        </Group>
      </Text>

      <Text size="xs" style={{ marginBottom: '12px', lineHeight: 1.4 }}>
        {job.description}
      </Text>

      <Button fullWidth radius="md" style={{ backgroundColor: '#00AAFF' }}>
        Apply Now
      </Button>
    </Box>
  );
}
