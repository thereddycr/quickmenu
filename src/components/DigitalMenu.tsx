import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  useMediaQuery,
  useTheme,
  Container,
  Tabs,
  Tab,
} from '@mui/material';
import { MenuData, MenuCategory } from '../types/DigitalMenuTypes';

interface DigitalMenuProps {
  menuData: MenuData;
}

// -------------------------------------------------------------------
const DigitalMenu: React.FC<DigitalMenuProps> = ({ menuData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { clientName } = useParams<{ clientName: string }>();
  const clientData = clientName ? menuData[clientName] : undefined;

  const [activeFilter, setActiveFilter] = useState<string>('all');

  if (!clientData) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100dvh',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4" sx={{ color: '#ff4d4f' }}>
          Menu Not Found
        </Typography>
        <Typography variant="body1" sx={{ color: '#8d99ae' }}>
          The menu for "{clientName}" is not available.
        </Typography>
      </Box>
    );
  }

  const { brand, menuItems } = clientData;

  const handleFilterChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setActiveFilter(newValue);
  };

  const filteredItems: MenuCategory[] =
    activeFilter === 'all'
      ? menuItems
      : menuItems.filter(
          (section: MenuCategory) => section.category === activeFilter
        );

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* AppBar */}
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
              {brand?.subtitle}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Filters */}
      <Box
        sx={{
          background: 'linear-gradient(90deg, #2b2d42 0%, #8d99ae 100%)',
          // paddingY: isMobile ? 1 : 2,
        }}
      >
        <Container>
          <Tabs
            value={activeFilter}
            onChange={handleFilterChange}
            variant="scrollable"
            scrollButtons="auto"
            textColor="inherit"
            indicatorColor="secondary"
            sx={{
              '& .MuiTab-root': {
                color: '#edf2f4',
                fontWeight: isMobile ? '500' : '600',
                fontSize: isMobile ? '10px' : '16px',
                marginX: '4px',
                borderRadius: '4px',
                // '&:hover': {
                //   backgroundColor: '#ffb703',
                //   color: '#2b2d42',
                //   transition: 'background-color 0.3s ease, color 0.3s ease',
                // },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#ffb703',
                height: '4px',
                borderRadius: '4px',
              },
            }}
          >
            <Tab label="All" value="all" />
            {menuItems.map((section: MenuCategory, index: number) => (
              <Tab
                key={index}
                label={section.category}
                value={section.category}
              />
            ))}
          </Tabs>
        </Container>
      </Box>

      {/* Main Content */}
      <Container sx={{ paddingY: isMobile ? 3 : 4, flexGrow: 1 }}>
        <Stack spacing={isMobile ? 3 : 4}>
          {filteredItems.map((section, index) => (
            <Card
              key={index}
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: isMobile ? 1.5 : 2,
                boxShadow: 5,
                borderRadius: 3,
                backgroundColor: '#ffffff',
                maxWidth: isMobile ? '100%' : 700,
                margin: 'auto',
              }}
            >
              {/* Image Section */}
              <CardMedia
                component="img"
                sx={{
                  width: isMobile ? '100%' : 250,
                  height: isMobile ? 170 : 180,
                  objectFit: 'cover',
                  borderRadius: 3,
                  marginBottom: isMobile ? 2 : 0,
                  border: '2px solid #8d99ae',
                }}
                image={section.image}
                alt={section.category}
              />
              {/* Content Section */}
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  paddingX: isMobile ? 0 : 2,
                }}
              >
                <Typography
                  variant={isMobile ? 'h6' : 'h5'}
                  gutterBottom
                  sx={{
                    color: '#2b2d42',
                    fontWeight: 'bold',
                  }}
                >
                  {section.category}
                </Typography>
                {section.items.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      marginBottom: '8px',
                      fontSize: isMobile ? '0.9rem' : '1rem',
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#4a4e69',
                        flex: 1,
                        marginRight: '10px',
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#ef233c',
                        fontWeight: 'bold',
                      }}
                    >
                      ₹{item.price}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: '#2b2d42',
          color: '#edf2f4',
          textAlign: 'center',
          paddingY: 2,
          position: 'relative',
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: 'bold', color: '#ffb703' }}
        >
          Powered by QuickMenu
        </Typography>
        <Typography variant="body2" sx={{ color: '#8d99ae' }}>
          © {new Date().getFullYear()} All Rights Reserved
        </Typography>
        {/* Subtle Version Number */}
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
    </Box>
  );
};

export default DigitalMenu;
