import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
  IconButton,
  Avatar,
  Button,
  Grid2,
  Container,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { MenuData, MenuCategory } from '../types/DigitalMenuTypes';
import Header from '../layouts/header';
import Footer from '../layouts/footer';

interface CategoryListProps {
  menuData: MenuData;
}

const CategoryList: React.FC<CategoryListProps> = ({ menuData }) => {
  const theme = useTheme();
  const { clientName, category } = useParams<{ clientName: string; category: string }>();
  const navigate = useNavigate();
  const clientData = clientName ? menuData[clientName] : undefined;

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
          The menu for {clientName} is not available.
        </Typography>
      </Box>
    );
  }

  const { brand, menuItems } = clientData;

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
    navigate(`/${clientName}`);
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/${clientName}/${category}`);
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
      <Header brand={brand} />

      {/* Search Bar */}
      <Container sx={{ my: 1, display: 'flex', alignItems: 'center' }}>
        <IconButton
          onClick={handleBack}
          sx={{
            mr: 1,
            backgroundColor: 'background.paper',
            boxShadow: 2,
            ':hover': { backgroundColor: 'background.paper' },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          placeholder="Search for food..."
          value={category}
          defaultValue={category}
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 2,
          }}
        />
      </Container>

      {/* Categories List */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
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
              variant="caption"
              sx={{
                position: 'relative',
                fontWeight: section.category === category ? 'bold' : 'normal',
                color: section.category === category ? 'primary.main' : 'custom.black',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
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

      {/* Category Items */}
      <Box sx={{ padding: 2 }}>
        <Grid2 container spacing={4}>
          {categoryData.items.map((item, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s',
                  ':hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={item?.image}
                  alt={item.name}
                  sx={{
                    height: 200,
                    borderRadius: '4px 4px 0 0',
                  }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {item?.description}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      mb: 2,
                      color: 'primary.main',
                    }}
                  >
                    ₹{item.price}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton
                        sx={{
                          backgroundColor: 'background.default',
                          ':hover': { backgroundColor: theme.palette.custom.lightGray },
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography
                        variant="body1"
                        sx={{
                          mx: 2,
                          fontWeight: 'bold',
                          fontSize: '1.1rem',
                        }}
                      >
                        0
                      </Typography>
                      <IconButton
                        sx={{
                          backgroundColor: 'background.default',
                          ':hover': { backgroundColor: theme.palette.custom.lightGray },
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'background.paper',
                        ':hover': { backgroundColor: 'primary.main' },
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default CategoryList;
