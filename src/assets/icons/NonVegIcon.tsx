import React from 'react';
import { Box } from '@mui/material';

// -------------------------------------------------------------------
export const NonVegIcon = () => (
  <Box
    sx={{
      width: 16,
      height: 16,
      borderRadius: 1,
      border: '1px solid red',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <Box
      sx={{
        width: 0,
        height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderBottom: '5px solid brown',
      }}
    />
  </Box>
);
