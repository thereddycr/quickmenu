import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        backgroundColor: '#2b2d42',
        color: '#edf2f4',
        textAlign: 'center',
        paddingY: 2,
        position: 'relative',
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ffb703' }}>
        Powered by QuickMenu
      </Typography>
      <Typography variant="body2" sx={{ color: '#8d99ae' }}>
        © {new Date().getFullYear()} All Rights Reserved
      </Typography>
      <Typography
        variant="caption"
        sx={{
          fontSize: isMobile ? '0.5rem' : '0.8rem',
          color: '#8d99ae',
          position: 'absolute',
          bottom: '4px',
          right: '8px',
        }}
      >
        Version 0.1.2
      </Typography>
    </Box>
  );
};

export default Footer;
