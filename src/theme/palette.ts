import { PaletteOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    custom: {
      pink: string;
      yellow: string;
      green: string;
      blue: string;
      lightPink: string;
      lightYellow: string;
      lightGreen: string;
      lightBlue: string;
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
      pink?: string;
      yellow?: string;
      green?: string;
      blue?: string;
      lightPink?: string;
      lightYellow?: string;
      lightGreen?: string;
      lightBlue?: string;
      darkBlue?: string;
      lightGray?: string;
      mediumGray?: string;
      accentYellow?: string;
      danger?: string;
      lineColor?: string;
      black?: string;
    };
  }
}

export const palette: PaletteOptions = {
  primary: {
    light: 'rgba(111, 202, 220, 0.75)', // Light Blue from logo
    main: 'rgba(61, 184, 143, 0.75)', // Green from logo
    dark: 'rgba(233, 169, 32, 0.75)', // Yellow from logo
    contrastText: '#FFFFFF', // White text for contrast
  },
  secondary: {
    light: 'rgba(225, 20, 98, 0.75)', // Pink from logo
    main: '#FFAA65', // Secondary Orange
    dark: '#FF784E', // Darker Orange
    contrastText: '#000000', // Black text for contrast
  },
  background: {
    default: '#FFFFFF',
    paper: '#FAFAFA',
  },
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
  custom: {
    pink: 'rgba(225, 20, 98, 0.75)', // Pink
    yellow: 'rgba(233, 169, 32, 0.75)', // Yellow
    green: 'rgba(61, 184, 143, 0.75)', // Green
    blue: 'rgba(111, 202, 220, 0.75)', // Blue
    lightPink: 'rgba(225, 20, 98, 0.15)', // Light Pink
    lightYellow: 'rgba(233, 169, 32, 0.15)', // Light Yellow
    lightGreen: 'rgba(61, 184, 143, 0.15)', // Light Green
    lightBlue: 'rgba(111, 202, 220, 0.15)', // Light Blue
    darkBlue: '#2b2d42', // Dark Blue
    lightGray: '#edf2f4', // Light Gray
    mediumGray: '#8d99ae', // Medium Gray
    accentYellow: '#ffb703', // Accent Yellow
    danger: '#ff4d4f', // Danger Red
    lineColor: '#ccc', // Line Color
    black: '#000', // Black
  },
};
