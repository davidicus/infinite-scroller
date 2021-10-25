import { useEffect, useState } from 'react';

export default function useQuery(query, page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageToken, setPageToken] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`${query}?pageToken=${page}&limit=10`)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setPageToken(res.pageToken);
        setItems((prevItems) => [...prevItems, ...res.messages]);
      })
      .catch((e) => {
        setLoading(false);
        setError(e);
        setPageToken(null);
      });
  }, [query, page]);

  return { loading, error, items, pageToken, setItems };
}
