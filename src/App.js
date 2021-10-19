import { useState, useRef, useCallback } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

import AppBar from './components/AppBar/AppBar';
import List from './components/List/List';
import useQuery from './useQuery';

import './App.scss';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#5f41b0',
      },
      secondary: {
        main: '#f44336',
      },
    },
  });
  const [pageNumber, setPageNumber] = useState(1);

  const api = `http://message-list.appspot.com/messages`;
  const { loading, error, items, hasMore, pageToken } = useQuery(
    api,
    pageNumber
  );
  const observer = useRef();
  const lastItem = useCallback(
    (node) => {
      console.log('Hellllllll', observer.current);
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(pageToken);
        }
      });
      if (node) {
        console.log('Hellllllll why', observer);
        observer.current?.observe(node);
      } else {
        observer.current?.disconnect();
      }
    },
    [loading, hasMore]
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar />
        <h1>Messages: {items.length}</h1>
        <List items={items} lastItemRef={lastItem} loadMore={loading} />
        {error && 'Error...'}
      </div>
    </ThemeProvider>
  );
}

export default App;
