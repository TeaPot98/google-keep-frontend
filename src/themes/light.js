import { createTheme } from "@mui/material/styles";

export const themeOptions = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#feefc3',
    },
    text: {
      primary: 'rgba(32, 33, 36, 0.71)',
      secondary: 'rgba(32, 33, 36, 0.54)',
      disabled: 'rgba(32, 33, 36, 0.38)',
      hint: 'rgba(32, 33, 36, 0.38)',
      accent: 'rgba(32, 33, 36, 1)'
    }, 
    button: {
      primary: 'rgb(95, 99, 104)',
      accent: 'rgb(32, 33, 36)',
      hover: 'rgba(0, 0, 0, 0.2)'
    },
    other: {
      purple: '#a142f4'
    }
  },
}) 
  