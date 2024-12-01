import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Brand } from 'src/types/DigitalMenuTypes';

interface HeaderProps {
  brand: Brand;
}

const Header: React.FC<HeaderProps> = ({ brand }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#2b2d42',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      }}
    >
      <Toolbar>
        <Box
          component="img"
          src={brand.logo}
          alt="Brand Logo"
          sx={{
            width: isMobile ? 30 : 40,
            height: isMobile ? 30 : 40,
            borderRadius: '50%',
            marginRight: 2,
            border: '2px solid #ffb703',
          }}
        />
        <Box>
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{
              fontWeight: 'bold',
              color: '#edf2f4',
              lineHeight: 1.2,
            }}
          >
            {brand.name}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: '#ffb703',
              fontSize: isMobile ? '0.5rem' : '0.8rem',
              fontStyle: 'italic',
              fontWeight: '400',
            }}
          >
            {brand.subtitle}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
