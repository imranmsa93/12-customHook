import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
import { useFetch } from '../hooks/userFetch.js'

async function fetchToSortPlaces() {
  try {
  const availablePlaces = await fetchAvailablePlaces();
  const sortedPlaces = new Promise((resolve,reject) => {
    navigator.geolocation.getCurrentPosition(position => {
       const sortedPlaces = sortPlacesByDistance(
            availablePlaces,
            position.coords.latitude,
            position.coords.longitude
          );
        resolve(sortedPlaces);  
    }, error => {
      reject(error);
    } );
  });
  return sortedPlaces;
}catch(error) {
  console.error("Error in fetchToSortPlaces:", error);
  throw error;
}
}

export default function AvailablePlaces({ onSelectPlace }) {
  
  const {
       fetchData:availablePlaces,
        isFetching,
        error,
     } = useFetch(fetchToSortPlaces,[]); 

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
