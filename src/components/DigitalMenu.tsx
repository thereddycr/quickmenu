import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Avatar,
  Container,
  CardMedia,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Drawer,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { MenuData, MenuItem } from '../types/DigitalMenuTypes';
import Header from '../layouts/header';
import Footer from '../layouts/footer';

import OfferImage from '../assets/images/rb_2148608943.png';
// import OfferImage from '../assets/images/32811.jpg';
// import OfferImage from '../assets/images/rb_6805.png';
// import OfferImage from '../assets/images/11669587_20943817.svg';
import { Iconify } from './iconify';
import { EmptyContent } from './empty-content';
import { VegIcon } from '../assets/icons/VegIcon';
import { NonVegIcon } from '../assets/icons/NonVegIcon';

interface DigitalMenuProps {
  menuData: MenuData;
}

// -------------------------------------------------------------------
const DigitalMenu: React.FC<DigitalMenuProps> = ({ menuData }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { menu } = useParams<{ menu: string }>();
  const clientData = menu ? menuData[menu] : undefined;

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (!clientData) return;

    const imageUrls = [
      clientData.brand.logo,
      ...clientData.menuItems.flatMap((section) => [
        section.image,
        ...section.items.map((item) => item.image),
      ]),
    ].filter((url): url is string => Boolean(url));

    const loadImage = (src: string) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = src;
      });

    Promise.all(imageUrls.map((url) => loadImage(url))).then(() => {
      setImagesLoaded(true);
    });
  }, [clientData]);

  if (!imagesLoaded) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <div className="loader"></div>
      </Box>
    );
  }

  if (!clientData) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4" sx={{ color: theme.palette.custom.danger }}>
          Menu Not Found
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.custom.mediumGray }}>
          The menu for {menu} is not available.
        </Typography>
      </Box>
    );
  }

  const { brand, menuItems } = clientData;

  const handleCategoryClick = (category: string) => {
    navigate(`/${menu}/${category}`);
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedItem(null);
  };

  // Merge all items into a single array
  const allItems = menuItems.flatMap((section) => section.items);

  // Filtered items based on the search query
  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const logoColors = [
    'custom.lightGreen', // Light Green
    'custom.lightYellow', // Light Yellow
    'custom.lightPink', // Light Pink
    'custom.lightBlue', // Light Blue
  ];

  const getColorByIndex = (index: number) => {
    return logoColors[index % logoColors.length];
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Header onClick={handleBack} />

      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          my: 1,
        }}
      >
        {/* Brand Section */}
        <Container>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography
              variant={isMobile ? 'h1' : 'h5'}
              sx={{
                color: theme.palette.common.black,
                fontSize: '1.2rem',
                letterSpacing: '-0.5px',
              }}
            >
              Welcome to {brand.name}
            </Typography>
            <div className="sun">
              <div className="center"></div>
              <div className="ray r-1"></div>
              <div className="ray r-2"></div>
              <div className="ray r-3"></div>
              <div className="ray r-4"></div>
              <div className="ray r-5"></div>
              <div className="ray r-6"></div>
              <div className="ray r-7"></div>
              <div className="ray r-8"></div>
            </div>
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.common.black,
              fontSize: isMobile ? '0.5rem' : '0.8rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <BoltIcon
              sx={{
                color: 'primary.main',
                fontSize: 'inherit',
              }}
            />
            {brand.subtitle}
          </Typography>
        </Container>
        {/* Search Bar */}
        <Container sx={{ mt: 1.5 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search for foods, drinks, e.t.c..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery.length > 0 && (
                  <InputAdornment position="end">
                    <IconButton size="small" edge="end" onClick={() => setSearchQuery('')}>
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />
        </Container>
        {searchQuery.length === 0 && (
          <>
            {/* Offers Section */}
            <Container
              sx={{
                p: 0,
                m: 0,
              }}
            >
              <CardMedia component="img" image={OfferImage} alt="Offer Image" />
            </Container>
            {/* Categories */}
            <Container>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    height: '1px',
                    backgroundColor: theme.palette.custom.lineColor,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    px: 2,
                    fontWeight: 'bold',
                    color: '#555',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    fontSize: 12,
                  }}
                >
                  {"WHAT'S ON YOUR MIND?"}
                </Typography>
                <Box
                  sx={{
                    flex: 1,
                    height: '1px',
                    backgroundColor: theme.palette.custom.lineColor,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  overflowX: 'auto',
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                  mt: 2,
                }}
              >
                {menuItems.map((section) => (
                  <Box
                    key={section.category}
                    onClick={() => handleCategoryClick(section.category)}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      minWidth: 80,
                      cursor: 'pointer',
                    }}
                  >
                    <Avatar
                      src={section.image}
                      alt={section.category}
                      sx={{ width: 56, height: 56, marginBottom: 1 }}
                    />
                    <Typography
                      variant="h1"
                      sx={{
                        color: theme.palette.common.black,
                        fontSize: isMobile ? '0.8rem' : '2rem',
                      }}
                    >
                      {section.category}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Container>
          </>
        )}
        {/* All Items Section */}
        <Container sx={{ mt: 2 }}>
          {filteredItems.length > 0 ? (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  mt: 2,
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    height: '1px',
                    backgroundColor: theme.palette.custom.lineColor,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    px: 2,
                    fontWeight: 'bold',
                    color: '#555',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    fontSize: 12,
                  }}
                >
                  {searchQuery.length === 0 ? 'All Items' : 'Your Picks'}
                </Typography>
                <Box
                  sx={{
                    flex: 1,
                    height: '1px',
                    backgroundColor: theme.palette.custom.lineColor,
                  }}
                />
              </Box>
              <List
                sx={{
                  display: 'grid',
                  gap: 2,
                  gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                  },
                }}
              >
                {filteredItems.map((item, index) => (
                  <ListItem
                    key={index}
                    onClick={() => handleItemClick(item)}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                      bgcolor: getColorByIndex(index),
                      cursor: 'pointer',
                      pb: 2,
                      mt: 4,
                    }}
                  >
                    {/* Avatar */}
                    <ListItemAvatar>
                      <Avatar
                        src={item.image}
                        alt={item.name}
                        sx={{
                          width: 70,
                          height: 70,
                          position: 'absolute',
                          top: '-32px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          border: '3px solid white',
                        }}
                      />
                    </ListItemAvatar>

                    {/* Content */}
                    <ListItemText
                      sx={{
                        mt: 4,
                        py: 2,
                      }}
                      primary={
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 1,
                          }}
                        >
                          {/* Veg or Non-Veg Icon */}
                          {item?.isVeg ? <VegIcon /> : <NonVegIcon />}
                          <Typography
                            variant="h1"
                            sx={{
                              color: 'common.black',
                              fontSize: isMobile ? '0.7rem' : '0.8rem',
                              pt: 0.1,
                              textAlign: 'left',
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <>
                          {/* Description */}
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'rgba(0, 0, 0, 0.6)',
                              fontSize: '0.6rem',
                              mt: 1,
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 2,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {item.description}
                          </Typography>
                          <Typography
                            component="div"
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              mt: 1,
                              gap: 0.5,
                            }}
                          >
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Box
                                key={index}
                                sx={{
                                  color:
                                    index < Math.floor(item.rating ?? 0)
                                      ? 'secondary.main'
                                      : '#D3D3D3',
                                  fontSize: '1rem',
                                }}
                              >
                                ★
                              </Box>
                            ))}
                          </Typography>

                          <Typography
                            variant="h1"
                            sx={{
                              color: 'primary.main',
                              fontSize: isMobile ? '0.9rem' : '1rem',
                              mt: 1,
                            }}
                          >
                            ₹{item.price}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <EmptyContent
              title=" Oops! We couldn’t find what you’re craving."
              description="Don’t worry, our menu is loaded with delicious surprises!"
              action={
                <Button variant="contained" onClick={() => setSearchQuery('')} sx={{ mt: 3 }}>
                  Explore All Items
                </Button>
              }
              sx={{ py: 10 }}
            />
          )}
        </Container>
      </Box>

      {/* Drawer for Item Details */}
      {/* <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            p: 2,
          },
        }}
      >
        {selectedItem && (
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {selectedItem.name}
              </Typography>
              <IconButton onClick={handleCloseDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>
            <CardMedia
              component="img"
              image={selectedItem.image}
              alt={selectedItem.name}
              sx={{
                height: 250,
                borderRadius: 3,
              }}
            />

            <Typography variant="body1" sx={{ mb: 1 }}>
              {selectedItem.description || 'No description available.'}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1976d2' }}>
              ₹{selectedItem.price}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={handleCloseDrawer}
              sx={{
                backgroundColor: 'primary.main',
                color: 'background.paper',
                ':hover': { backgroundColor: 'primary.dark' },
              }}
            >
              Add to Cart
            </Button>
          </Box>
        )}
      </Drawer> */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            p: 2,
            overflow: 'visible',
          },
        }}
      >
        {selectedItem && (
          <Box>
            {/* Image Section */}
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                image={selectedItem.image}
                alt={selectedItem.name}
                sx={{
                  width: '100%',
                  height: 250,
                  objectFit: 'cover',
                  borderRadius: 3,
                }}
              />
              <IconButton
                onClick={handleCloseDrawer}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  backgroundColor: 'white',
                  boxShadow: 2,
                  zIndex: 1,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ mt: 2, px: 2 }}>
              {/* Veg or Non-Veg Icon and Item Name */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {selectedItem.isVeg ? <VegIcon /> : <NonVegIcon />}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: 'common.black',
                    }}
                  >
                    {selectedItem.name}
                  </Typography>
                </Box>
                <IconButton
                  sx={{
                    color: 'secondary.main',
                    '&:hover': { color: 'secondary.dark' },
                  }}
                >
                  <TurnedInNotIcon />
                </IconButton>
              </Box>

              {/* Description */}
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  mb: 1,
                }}
              >
                {selectedItem.description || 'No description available.'}
              </Typography>

              {/* Ratings */}
              {/* <Typography
                sx={{
                  color: 'secondary.main',
                  fontWeight: 'medium',
                  mb: 2,
                }}
              >
                ★★★★☆
              </Typography> */}
              {/* Ratings */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    color: 'secondary.main',
                    fontWeight: 'medium',
                  }}
                >
                  ★ {selectedItem?.rating || 'N/A'}
                </Typography>
              </Box>

              {/* Quantity and Add to Cart Section */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {/* Quantity Buttons */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    border: '1px solid',
                    borderColor: 'grey.400',
                    borderRadius: 2,
                  }}
                >
                  <IconButton size="small">
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1">1</Typography>
                  <IconButton size="small">
                    <AddIcon />
                  </IconButton>
                </Box>

                {/* Add Item Button */}
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'background.paper',
                    px: 6,
                    borderRadius: 2,
                    textTransform: 'none',
                    ':hover': { backgroundColor: 'primary.dark' },
                  }}
                >
                  Add Item - ₹{selectedItem.price}
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Drawer>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default DigitalMenu;
