import React from 'react';
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SplashLogo } from '../assets/images/splash.svg';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? 2 : 4,
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <SplashLogo
        style={{
          width: isMobile ? '200px' : '300px',
          height: isMobile ? '200px' : '300px',
          marginBottom: '16px',
        }}
      />

      <Typography
        variant="body1"
        sx={{
          color: '#8d99ae',
          textAlign: 'center',
          fontSize: isMobile ? '0.9rem' : '1.2rem',
          lineHeight: 1.5,
          maxWidth: '600px',
          marginBottom: isMobile ? 2 : 4,
        }}
      >
        A seamless way to access and order from digital menus.
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        size={isMobile ? 'small' : 'medium'}
        onClick={() => navigate('/sunset-rolls')}
        sx={{
          padding: isMobile ? '6px 16px' : '10px 24px',
          fontSize: isMobile ? '0.875rem' : '1rem',
        }}
      >
        Explore Menu
      </Button>

      <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          bottom: isMobile ? 16 : 32,
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#2b2d42',
          fontSize: isMobile ? '0.8rem' : '1.5rem',
          textAlign: 'center',
          fontFamily: 'CustomFont, sans-serif',
        }}
      >
        Welcome to QuickMenu
      </Typography>
    </Box>
  );
};

export default Home;