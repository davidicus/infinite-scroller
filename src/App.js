import { useState, useRef, useCallback } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import AppBar from './components/AppBar/AppBar';
import List from './components/List/List';
import useQuery from './useQuery';

import './app.scss';

const api = `http://message-list.appspot.com/messages`;

function App() {
  const [pageNumber, setPageNumber] = useState(1);

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
    [loading, pageToken]
  );

  function handleSwipe(index) {
    items.splice(index - 1, 1);
  }

  return (
    <div className="App">
      <AppBar itemsCount={items.length} />
      {error ? (
        <Alert severity="error" sx={{ width: '60%', margin: '0 auto 1rem' }}>
          ERROR: {error.message}
        </Alert>
      ) : null}
      <List
        items={items}
        lastItemRef={lastItem}
        loadMore={pageToken}
        handleSwipe={handleSwipe}
      />
    </div>
  );
}

export default App;
