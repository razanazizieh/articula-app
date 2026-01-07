import { useState, useEffect } from "react";

const useFetch = (apiFunction, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const callApi = () => {
      setLoading(true);
      setError(null);

      apiFunction()
        .then((result) => {
          if (isMounted) {
            setData(result);
          }
        })
        .catch((err) => {
          if (isMounted) {
            setError(err.message || "An unknown error occurred.");
            setData(initialData);
          }
        })
        .finally(() => {
          if (isMounted) {
            setLoading(false);
            console.log("fetch ended");
          }
        });
    };

    callApi();

    return () => {
      isMounted = false;
    };
  }, []);
  return { data, loading, error };
};

export default useFetch;
