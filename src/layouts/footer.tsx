import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        color: theme.palette.custom.lightGray,
        textAlign: 'center',
        paddingY: 2,
        position: 'relative',
        borderTop: `0.1px solid ${theme.palette.custom.lineColor}`,
      }}
    >
      <Typography
        variant="h1"
        sx={{ color: 'secondary.main', fontSize: '0.7rem', lineHeight: 1.5 }}
      >
        Powered by QuickMenu
      </Typography>
      <Typography variant="h1" sx={{ color: theme.palette.custom.mediumGray, fontSize: '0.5rem' }}>
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
        version 0.1.3
      </Typography>
    </Box>
  );
};

export default Footer;
