import { blue } from '@mui/material/colors';

// Custom theme template
export const customizations = (mode) => ({
  palette: {
    mode: mode,
    // palette according to mode
    ...(mode === 'light'
      ? {
          primary: blue,
          background: {
            default: '#fff',
            paper: '#fff',
          },
        }
      : {
          primary: blue,
          background: {
            default: '#001e3c',
            paper: '0a1929',
          },
        }),
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
});
