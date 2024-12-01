import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.custom.darkBlue,
        color: theme.palette.custom.lightGray,
        textAlign: 'center',
        paddingY: 2,
        position: 'relative',
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
        Powered by QuickMenu
      </Typography>
      <Typography variant="body2" sx={{ color: theme.palette.custom.mediumGray }}>
        © {new Date().getFullYear()} All Rights Reserved
      </Typography>
      <Typography
        variant="caption"
        sx={{
          fontSize: isMobile ? '0.5rem' : '0.8rem',
          color: theme.palette.custom.mediumGray,
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
