import { useEffect, useState } from 'react';

export default function useQuery(query, page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageToken, setPageToken] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setPageToken(null);
    fetch(`${query}?pageToken=${page}&limit=5`)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setPageToken(res.pageToken);
        setItems((prevItems) => [...prevItems, ...res.messages]);
      })
      .catch((e) => {
        setLoading(false);
        setError(e);
      });
  }, [query, page]);

  return { loading, error, items, hasMore: pageToken !== null, pageToken };
}
