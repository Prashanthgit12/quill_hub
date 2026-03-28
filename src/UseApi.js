import { useEffect, useState } from 'react';
import axios from 'axios';

const useApi = (endPoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://quillhub-backend-latest-2.onrender.com/${endPoint}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [endPoint]);

  return { data, loading };
};

export default useApi;