import React from 'react';
import { Box } from '@mui/material';

// -------------------------------------------------------------------
export const VegIcon = () => (
  <Box
    sx={{
      width: 16,
      height: 16,
      borderRadius: 1,
      border: '1px solid green',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'green',
      }}
    />
  </Box>
);
