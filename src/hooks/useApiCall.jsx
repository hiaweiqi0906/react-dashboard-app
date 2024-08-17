import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios library

export default function useApiCall(type = "get", url, query = {}, body = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeApi = () => {
    setLoading(true);
    const requestBody = body.current ? body.current : body; // Use body.current if body is a ref

    axios({
      method: type,
      url: url,
      mode: 'no-cors',
      params: query,
      data: requestBody
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  return { data, loading, error, executeApi };
}