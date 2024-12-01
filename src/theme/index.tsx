import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      darkBlue: string;
      lightGray: string;
      mediumGray: string;
      accentYellow: string;
      danger: string;
      lineColor: string;
      black: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      darkBlue: string;
      lightGray: string;
      mediumGray: string;
      accentYellow: string;
      danger: string;
      lineColor: string;
      black: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#007BFF',
    },
    secondary: {
      main: '#FFC107',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
    custom: {
      darkBlue: '#2b2d42',
      lightGray: '#edf2f4',
      mediumGray: '#8d99ae',
      accentYellow: '#ffb703',
      danger: '#ff4d4f',
      lineColor: '#ccc',
      black: '#000',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
