export function findPlaceFromQuery(
  searchText: string,
  map: google.maps.Map,
  callback: (
    a: google.maps.places.PlaceResult[] | null,
    b: google.maps.places.PlacesServiceStatus
  ) => void
) {
  let service: google.maps.places.PlacesService | null = null;
  const request = {
    query: searchText,
    fields: ["name", "geometry"],
  };

  service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, callback);
}

export function callback(
  map: google.maps.Map,
  // setPlaceResults: (places: google.maps.places.PlaceResult[]) => void
  setPosition: (newPosition: google.maps.LatLngLiteral) => void
): (
  a: google.maps.places.PlaceResult[] | null,
  b: google.maps.places.PlacesServiceStatus
) => void {
  return (
    results: google.maps.places.PlaceResult[] | null,
    status: google.maps.places.PlacesServiceStatus
  ) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      // setPlaceResults(results);
      const location = results[0].geometry!.location!;
      setPosition({ lat: location.lat(), lng: location.lng() });
      // const bounds = new window.google.maps.LatLngBounds({ lat: location.lat(), lng: location.lng() });
      // map.fitBounds(bounds);
      // map.setCenter(location);
    }
  };
}
