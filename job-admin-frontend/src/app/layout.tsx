// app/layout.tsx
'use client'; // only if you have client code here (usually not needed in layout)

import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
    
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
        >
        <body>{children}</body>
        </MantineProvider>
    </html>
  );
}
