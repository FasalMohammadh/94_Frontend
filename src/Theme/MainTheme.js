import { createTheme } from '@mui/material';

import {
  PRIMARY,
  WHITE,
  LIGHT,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from '../Constants/COLORS';
import { POPPINS } from '../Constants/FONTS';

const mainTheme = createTheme({
  typography: {
    fontFamily: POPPINS,
  },
  palette: {
    primary: { main: PRIMARY },
    white: { main: WHITE },
    light: { main: LIGHT },
    text: { primary: TEXT_PRIMARY, secondary: TEXT_SECONDARY },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 700 },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: false,
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: TEXT_PRIMARY,
        },
      },
    },
  },
});

export default mainTheme;
