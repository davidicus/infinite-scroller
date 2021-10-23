import { useState, useRef, useCallback } from 'react';
import Alert from '@mui/material/Alert';

import AppBar from './components/AppBar/AppBar';
import List from './components/List/List';
import useQuery from './useQuery';

import './App.scss';

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
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(pageToken);
          console.log(entries[0]);
        }
      });
      if (node) {
        observer.current?.observe(node);
      } else {
        observer.current?.disconnect();
      }
    },
    [loading, pageToken]
  );

  return (
    <div className="App">
      <AppBar itemsCount={items.length} dismissed={items.length} />
      {error ? (
        <Alert severity="error" sx={{ width: '60%', margin: '0 auto 1rem' }}>
          ERROR: {error.message}
        </Alert>
      ) : null}
      <List items={items} lastItemRef={lastItem} loadMore={pageToken} />
    </div>
  );
}

export default App;
