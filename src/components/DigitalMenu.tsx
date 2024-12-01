import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Card,
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { MenuData, MenuItem } from '../types/DigitalMenuTypes';
import Header from '../layouts/header';
import Footer from '../layouts/footer';

import OfferImage from '../assets/images/11669587_20943817.svg';

interface DigitalMenuProps {
  menuData: MenuData;
}

const DigitalMenu: React.FC<DigitalMenuProps> = ({ menuData }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { clientName } = useParams<{ clientName: string }>();
  const clientData = clientName ? menuData[clientName] : undefined;

  // State for the selected item and drawer visibility
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const handleCategoryClick = (category: string) => {
    navigate(`/${clientName}/${category}`);
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

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {/* Search Bar */}
        <Container sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Search for food..."
            size="small"
            sx={{ backgroundColor: 'background.paper', borderRadius: 2, boxShadow: 2 }}
          />
        </Container>

        {/* Offers Section */}
        <Container sx={{ marginY: 1 }}>
          <Card
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 2,
            }}
          >
            <CardMedia component="img" image={OfferImage} alt="Offer Image" />
          </Card>
        </Container>

        {/* Categories */}
        <Container>
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
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  minWidth: 80,
                  cursor: 'pointer',
                }}
                onClick={() => handleCategoryClick(section.category)}
              >
                <Avatar
                  src={section.image}
                  alt={section.category}
                  sx={{ width: 56, height: 56, marginBottom: 1 }}
                />
                <Typography variant="caption">{section.category}</Typography>
              </Box>
            ))}
          </Box>
        </Container>

        {/* All Items Section */}
        <Container sx={{ mt: 2 }}>
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
              All Items
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
              overflowY: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {allItems.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                  mb: 1,
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                }}
                onClick={() => handleItemClick(item)}
              >
                <ListItemAvatar>
                  <Avatar src={item.image} alt={item.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`₹${item.price}`}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
              </ListItem>
            ))}
          </List>
        </Container>
      </Box>

      {/* Drawer for Item Details */}
      <Drawer
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
                height: 200,
                borderRadius: '4px 4px 0 0',
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
      </Drawer>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default DigitalMenu;
