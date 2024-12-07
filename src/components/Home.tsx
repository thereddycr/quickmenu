import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SplashLogo } from '../assets/images/splash.svg';

// -------------------------------------------------------------------
const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        height: '100dvh',
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
          color: 'custom.mediumGray',
          textAlign: 'center',
          fontSize: isMobile ? '0.9rem' : '1.2rem',
          lineHeight: 1.5,
          maxWidth: '600px',
          marginBottom: isMobile ? 2 : 4,
        }}
      >
        A seamless way to access and order from digital menus.
      </Typography>
      {/* <Button
        variant="contained"
        color="primary"
        size={isMobile ? 'small' : 'medium'}
        onClick={() => navigate('/sunset-rolls')}
        sx={{
          padding: isMobile ? '6px 16px' : '10px 24px',
          fontSize: isMobile ? '0.875rem' : '1rem',
        }}
      >
        Explore Menu
      </Button> */}
      <button className="button" onClick={() => navigate('/sunset-rolls')}>
        <svg
          className="svgIcon"
          viewBox="0 0 512 512"
          height="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
        </svg>
        Explore Menu
      </button>
      <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          bottom: isMobile ? 16 : 32,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'primary.main',
          fontSize: isMobile ? '0.8rem' : '1.5rem',
          textAlign: 'center',
          fontFamily: 'MaisonArtisan',
        }}
      >
        Welcome to QuickMenu
      </Typography>
    </Box>
  );
};

export default Home;
