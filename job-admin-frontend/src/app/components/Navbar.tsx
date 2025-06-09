'use client';

import { Box, Button, Group, Image } from '@mantine/core';
import Link from 'next/link';
import styles from './NavBar.module.css';

export default function Navbar({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <Box
      mx="auto"
      my="lg"
      px="sm"
      py="sm"
      bg="white"
      style={{
        borderRadius: 50,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        maxWidth: 800,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      {/* Logo */}
      <Group gap="xs">
        <Image src="/cmwlogo.svg" alt="Logo" width={32} height={32} />
      </Group>

      {/* Nav Links */}
      <Group gap="lg" ml="lg">
        <Link href="#" className={styles.navLink}>Home</Link>
        <Link href="#" className={styles.navLink}>Find Jobs</Link>
        <Link href="#" className={styles.navLink}>Find Talents</Link>
        <Link href="#" className={styles.navLink}>About us</Link>
        <Link href="#" className={styles.navLink}>Testimonials</Link>
      </Group>

      {/* CTA Button */}
      <Button
        variant="gradient"
        gradient={{ from: '#A94EFF', to: '#8000FF', deg: 90 }}
        radius="xl"
        px="lg"
        onClick={onCreateClick}
      >
        Create Jobs
      </Button>
    </Box>
  );
}
