import { useState,useEffect } from "react";
export function useFetch(fetchFunction, initialValue) {
   
    const [fetchData, setFetchData] = useState(initialValue);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

     useEffect(() => {
        async function fetchPlaces() {
          setIsFetching(true);
          try {
            const data = await fetchFunction();
            console.log("IMRAN ",data)
            setFetchData(data);
          } catch (error) {
            setError({ message: error.message || 'Failed to fetch user places.' });
          }
          setIsFetching(false);
        }
    
        fetchPlaces();
      }, [fetchFunction]);

    return {
        fetchData,
        isFetching,
        error,
        setFetchData,
        setIsFetching,
        setError,
    }  
}