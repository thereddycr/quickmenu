import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  CardMedia,
  TextField,
  IconButton,
  Avatar,
  Button,
  Grid2,
  Container,
  useTheme,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { MenuData, MenuCategory } from '../types/DigitalMenuTypes';
import Header from '../layouts/header';
import Footer from '../layouts/footer';
import { Iconify } from './iconify';
import { VegIcon } from '../assets/icons/VegIcon';
import { NonVegIcon } from '../assets/icons/NonVegIcon';

interface CategoryListProps {
  menuData: MenuData;
}

const CategoryList: React.FC<CategoryListProps> = ({ menuData }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { menu, category } = useParams<{ menu: string; category: string }>();
  const clientData = menu ? menuData[menu] : undefined;

  const [searchQuery, setSearchQuery] = useState('');
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [expandedStates, setExpandedStates] = useState<{ [key: number]: boolean }>({});

  // Toggle the expanded state for a specific item
  const toggleExpanded = (index: number) => {
    setExpandedStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

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

  const { menuItems } = clientData;

  // Find the specific category data
  const categoryData = menuItems.find((item: MenuCategory) => item.category === category);

  if (!categoryData) {
    return (
      <Typography variant="h5" sx={{ textAlign: 'center', mt: 3 }}>
        Category not found.
      </Typography>
    );
  }

  const handleBack = () => {
    navigate(`/${menu}`);
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/${menu}/${category}`);
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
        {/* Search Bar */}
        <Container sx={{ mt: 1.5 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search for foods, drinks, e.t.c..."
            value={category}
            defaultValue={category}
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
            {/* Categories List */}
            <Container>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  overflowX: 'auto',
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': { display: 'none' },
                  mt: 1,
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
                      sx={{
                        width: 56,
                        height: 56,
                        marginBottom: 1,
                      }}
                    />
                    <Typography
                      variant="h1"
                      sx={{
                        color: theme.palette.common.black,
                        fontSize: isMobile ? '0.8rem' : '2rem',
                        position: 'relative',
                        fontWeight: section.category === category ? 'bold' : 'normal',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 2,
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          margin: '0 auto',
                          width: section.category === category ? '100%' : '0',
                          height: '2px',
                          backgroundColor: 'primary.main',
                          transition: 'width 0.3s ease',
                        },
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

        {/* Category Items */}
        <Container sx={{ mt: 2 }}>
          <Grid2 container spacing={4}>
            {categoryData.items.map((item, index) => (
              <Grid2 size={{ xs: 12 }} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'stretch',
                    borderBottom: '1px dashed rgba(0, 0, 0, 0.2)',
                    pb: 3,
                    mb: 3,
                    gap: 2,
                  }}
                >
                  {/* Left Content */}
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      flexShrink: 0,
                    }}
                  >
                    {/* Veg/Non-Veg Icon and Name */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                        flexWrap: 'wrap',
                      }}
                    >
                      {item.isVeg ? <VegIcon /> : <NonVegIcon />}
                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.palette.common.black,
                          lineHeight: 1.1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>

                    {/* Ratings and Number */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        mt: 1,
                      }}
                    >
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Box
                          key={index}
                          sx={{
                            color:
                              index < Math.floor(item.rating ?? 0) ? 'secondary.main' : '#D3D3D3',
                            fontSize: '1rem',
                          }}
                        >
                          ★
                        </Box>
                      ))}
                      <Typography
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.8rem',
                          fontWeight: 'medium',
                        }}
                      >
                        {item.rating?.toFixed(1) ?? 'N/A'}
                      </Typography>
                    </Box>

                    {/* Price */}
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

                    {/* Description */}
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          mt: 1,
                          lineHeight: '1.5',
                          display: 'inline',
                        }}
                      >
                        {expandedStates[index]
                          ? item.description
                          : `${item.description?.slice(0, 50) ?? ''}... `}
                      </Typography>
                      {item.description && item.description.length > 50 && (
                        <Button
                          size="small"
                          onClick={() => toggleExpanded(index)}
                          sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            color: 'primary.main',
                            display: 'inline',
                            minWidth: 'unset',
                            padding: 0,
                            margin: 0,
                            ':hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          {!expandedStates[index] && 'read more'}
                        </Button>
                      )}
                    </Box>

                    {/* Save Button */}
                    <Button
                      startIcon={<Iconify icon="eva:bookmark-outline" />}
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        width: 100,
                        mt: 1,
                        borderRadius: 3,
                      }}
                    >
                      Save
                    </Button>
                  </Box>

                  {/* Right Image and Button */}
                  <Box
                    sx={{
                      position: 'relative',
                      width: 180,
                      height: 170,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 3,
                    }}
                  >
                    {/* Image */}
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 3,
                      }}
                    />

                    {/* Add Button */}
                    <Button
                      variant="contained"
                      sx={{
                        width: 110,
                        position: 'absolute',
                        bottom: -15,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        textTransform: 'none',
                        ':hover': {
                          backgroundColor: 'primary.dark',
                        },
                      }}
                    >
                      ADD +
                    </Button>
                  </Box>
                </Box>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default CategoryList;
