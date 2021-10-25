import * as React from 'react';
import Alert from '@mui/material/Alert';

import AppBar from './components/AppBar/AppBar';
import List from './components/List/List';
import useQuery from './useQuery';

import './app.scss';

const api = `http://message-list.appspot.com/messages`;

function App() {
  const [pageNumber, setPageNumber] = React.useState(1);
  // Initial call to api and initialization of list state
  const { loading, error, items, pageToken, setItems } = useQuery(
    api,
    pageNumber
  );

  const observer = React.useRef();
  const lastItem = React.useCallback(
    (node) => {
      // If loading just return
      if (loading) {
        return;
      }
      // Disconnect from any old observers
      if (observer.current) {
        observer.current.disconnect();
      }
      // Create a new observer
      observer.current = new IntersectionObserver((entries) => {
        // If lastItem is in veiwport & we have a pageToken
        // trigger a new GET by updating pageToken state
        if (entries[0].isIntersecting && pageToken !== null) {
          setPageNumber(pageToken);
        }
      });
      // Once component mounts tell our observer to observe it
      if (node) {
        observer.current?.observe(node);
      } else {
        // Disconnect once component unmounts
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
      <List
        items={items}
        lastItemRef={lastItem}
        loadMore={pageToken}
        handleDismissal={setItems}
      />
    </div>
  );
}

export default App;
