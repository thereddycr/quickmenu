import React from "react";
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
} from "@mui/material";

const menuData = {
  brand: {
    name: "Sunset Rolls",
    subtitle: "Deliciously Yours",
    logo: "/assets/images/CrispyChicken.jpg",
  },
  menuItems: [
    {
      category: "Shawarma's",
      items: [
        { name: "Regular Shawarma", price: 110 },
        { name: "Without Salad", price: 120 },
        { name: "Pakoda Shawarma", price: 140 },
        { name: "Special Shawarma", price: 150 },
      ],
      image: "/assets/images/Shawarma.jpg",
    },
    {
      category: "Wrap's",
      items: [
        { name: "Chicken Wrap", price: 110 },
        { name: "Spicy Chicken Wrap", price: 130 },
        { name: "Veg Nuggets Wrap", price: 100 },
        { name: "Special Veg Wrap", price: 110 },
      ],
      image: "/assets/images/Wrap.jpg",
    },
    {
      category: "Frankie's",
      items: [
        { name: "Egg Frankie", price: 70 },
        { name: "Classic Chicken Frankie", price: 90 },
        { name: "Special Chicken Frankie", price: 100 },
        { name: "Veg Frankie", price: 90 },
        { name: "Veg Cheese Frankie", price: 100 },
      ],
      image: "/assets/images/Frankie.jpg",
    },
    {
      category: "Momo's",
      items: [
        { name: "Chicken Momo's Steam (6 pieces)", price: 80 },
        { name: "Chicken Momo's Fry (6 pieces)", price: 90 },
        { name: "Veg Momo's Steam (6 pieces)", price: 70 },
        { name: "Veg Momo's Fry (6 pieces)", price: 80 },
      ],
      image: "/assets/images/Momos.jpg",
    },
    {
      category: "Crispy Chicken",
      items: [{ name: "Crispy Chicken (6 pieces)", price: 150 }],
      image: "/assets/images/CrispyChicken.jpg",
    },
  ],
};

const DigitalMenu = () => {
  const { brand, menuItems } = menuData;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        backgroundColor: "#fff8e1",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* AppBar */}
      <AppBar position="sticky" sx={{ backgroundColor: "#ff7043" }}>
        <Toolbar>
          <Box
            component="img"
            src={brand.logo}
            alt="Brand Logo"
            sx={{
              width: 35,
              height: 35,
              borderRadius: "50%",
              marginRight: 2,
              border: "2px solid #fff",
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: "bold", flexGrow: 1 }}>
            {brand.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontStyle: "italic", color: "#fff8e1" }}
          >
            {brand.subtitle}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ paddingY: 4, flexGrow: 1 }}>
        <Stack spacing={4}>
          {menuItems.map((section, index) => (
            <Card
              key={index}
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 2,
                boxShadow: 5,
                borderRadius: 3,
                backgroundColor: "#fff3e0",
                maxWidth: isMobile ? "100%" : 700,
                margin: "auto",
              }}
            >
              {/* Image Section */}
              <CardMedia
                component="img"
                sx={{
                  width: isMobile ? "100%" : 250,
                  height: isMobile ? 200 : 180,
                  objectFit: "cover",
                  borderRadius: 3,
                  marginBottom: isMobile ? 2 : 0,
                  border: "2px solid #ffe0b2",
                }}
                image={section.image}
                alt={section.category}
              />
              {/* Content Section */}
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  textAlign: "left",
                  paddingX: isMobile ? 0 : 2,
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    color: "#e65100",
                    fontWeight: "bold",
                  }}
                >
                  {section.category}
                </Typography>
                {section.items.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      marginBottom: "8px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#333333",
                        flex: 1,
                        marginRight: "10px",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#43a047",
                        fontWeight: "bold",
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
          backgroundColor: "#333",
          color: "#fff",
          textAlign: "center",
          paddingY: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", color: "#f0a500" }}
        >
          Powered by QuickMenu
        </Typography>
        <Typography variant="body2" sx={{ color: "#ccc" }}>
          © {new Date().getFullYear()} All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default DigitalMenu;
