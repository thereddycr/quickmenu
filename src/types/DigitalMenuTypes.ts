// Types for a single menu item
export type MenuItem = {
  name: string;
  price: number;
  image?: string;
  description?: string;
};

// Types for a menu category
export type MenuCategory = {
  category: string;
  items: MenuItem[];
  image: string;
};

// Types for the brand information
export type Brand = {
  name: string;
  subtitle?: string;
  logo: string;
};

// Types for client data
export type ClientData = {
  brand: Brand;
  menuItems: MenuCategory[];
};

// Types for the entire menu data
export type MenuData = {
  [key: string]: ClientData;
};
