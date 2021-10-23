import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, pink } from '@mui/material/colors';

import './index.scss';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[600],
    },
    secondary: {
      main: pink[300],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
