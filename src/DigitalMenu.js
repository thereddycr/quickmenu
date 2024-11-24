import React, { useState } from "react";
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
} from "@mui/material";

const menuData = {
  brand: {
    name: "Sunset Rolls",
    subtitle: "taste the sunset!",
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { brand, menuItems } = menuData;

  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (event, newValue) => {
    setActiveFilter(newValue);
  };

  const filteredItems =
    activeFilter === "all"
      ? menuItems
      : menuItems.filter((section) => section.category === activeFilter);

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* AppBar */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#2b2d42",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
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
              borderRadius: "50%",
              marginRight: 2,
              border: "2px solid #ffb703",
            }}
          />
          <Box>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                fontWeight: "bold",
                color: "#edf2f4",
                lineHeight: 1.2,
              }}
            >
              {brand.name}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#ffb703",
                fontSize: isMobile ? "0.5rem" : "0.8rem",
                fontStyle: "italic",
                fontWeight: "400",
              }}
            >
              {brand.subtitle}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Filters */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #2b2d42 0%, #8d99ae 100%)",
          paddingY: isMobile ? 1 : 2,
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
              "& .MuiTab-root": {
                color: "#edf2f4",
                fontWeight: isMobile ? "500" : "600",
                fontSize: isMobile ? "14px" : "16px",
                marginX: "8px",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#ffb703",
                  color: "#2b2d42",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#ffb703",
                height: "4px",
                borderRadius: "4px",
              },
            }}
          >
            <Tab label="All" value="all" />
            {menuItems.map((section, index) => (
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
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: isMobile ? 1.5 : 2,
                boxShadow: 5,
                borderRadius: 3,
                backgroundColor: "#ffffff",
                maxWidth: isMobile ? "100%" : 700,
                margin: "auto",
              }}
            >
              {/* Image Section */}
              <CardMedia
                component="img"
                sx={{
                  width: isMobile ? "100%" : 250,
                  height: isMobile ? 170 : 180,
                  objectFit: "cover",
                  borderRadius: 3,
                  marginBottom: isMobile ? 2 : 0,
                  border: "2px solid #8d99ae",
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
                  variant={isMobile ? "h6" : "h5"}
                  gutterBottom
                  sx={{
                    color: "#2b2d42",
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
                      fontSize: isMobile ? "0.9rem" : "1rem",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#4a4e69",
                        flex: 1,
                        marginRight: "10px",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#ef233c",
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
          backgroundColor: "#2b2d42",
          color: "#edf2f4",
          textAlign: "center",
          paddingY: 2,
          position: "relative",
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", color: "#ffb703" }}
        >
          Powered by QuickMenu
        </Typography>
        <Typography variant="body2" sx={{ color: "#8d99ae" }}>
          © {new Date().getFullYear()} All Rights Reserved
        </Typography>
        {/* Subtle Version Number */}
        <Typography
          variant="caption"
          sx={{
            fontSize: isMobile ? "0.5rem" : "0.8rem",
            color: "#8d99ae",
            position: "absolute",
            bottom: "4px",
            right: "8px",
          }}
        >
          Version 0.1.1
        </Typography>
      </Box>
    </Box>
  );
};

export default DigitalMenu;
