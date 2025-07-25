import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  MapMouseEvent,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { Input } from "@/components/ui/input";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

export type AddressDescription = {
  fullAddress: string;
  lat: number;
  lng: number;
  city: string;
};

type MapViewProps = {
  actionButton: () => JSX.Element;
  style: CSSProperties;
  address: AddressDescription;
  setAddressDescription: (addressDescription: AddressDescription) => void;
};

function PlacesSearch({
  isPlacesAPILoaded,
  address,
  setAddressDescription,
}: {
  isPlacesAPILoaded: boolean;
  address: AddressDescription;
  setAddressDescription: (addressDescription: AddressDescription) => void;
}) {
  const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
  const inputRef = useRef<HTMLInputElement>(null);

  const map = useMap("solar-quote-map");

  function onLoad(
    setAddressDescription: (addressDescription: AddressDescription) => void
  ) {
    const options = {
      componentRestrictions: { country: "eg" },
      fields: ["address_components", "geometry", "name"],
      types: ["establishment"],
    };
    if (
      autoCompleteRef.current ||
      !inputRef.current ||
      !window.google ||
      !window.google.maps ||
      !window.google.maps.places
    ) {
      return;
    }

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autoCompleteRef.current.addListener("place_changed", () => {
      if (!autoCompleteRef.current) {
        return;
      }

      let city = "";

      if (autoCompleteRef.current.getPlace().address_components) {
        const cities = autoCompleteRef.current
          .getPlace()
          .address_components?.filter(
            (f) =>
              JSON.stringify(f.types) ===
              JSON.stringify(["administrative_area_level_1", "political"])
          );

        if (cities && cities?.length > 0) city = cities[0].long_name;
      }

      const place = autoCompleteRef.current.getPlace();
      const coords = place?.geometry?.location as any;
      const coordsJson = {
        lat: coords?.lat(),
        lng: coords?.lng(),
      };

      setAddressDescription({
        fullAddress: autoCompleteRef.current.getPlace().name || "",
        lat: coords?.lat(),
        lng: coords?.lng(),
        city: city,
      });

      map?.setCenter(coordsJson);
    });
  }

  useEffect(() => {
    isPlacesAPILoaded && onLoad(setAddressDescription);
  }, [isPlacesAPILoaded]);

  return (
    <Input
      ref={inputRef}
      defaultValue={address.fullAddress}
      type="text"
      placeholder="Enter Your Address"
      className="bg-background mb-4"
    />
  );
}

function LocateMeButton({
  isGeocodeAPILoaded,
  setAddressDescription,
}: {
  isGeocodeAPILoaded: boolean;

  setAddressDescription: (addressDescription: AddressDescription) => void;
}) {
  const map = useMap("solar-quote-map");

  const [geocodingService, setGeocodingService] =
    useState<google.maps.Geocoder | null>(null);

  function onLoad() {
    const geocoderService = new google.maps.Geocoder();
    setGeocodingService(geocoderService);
  }

  useEffect(() => {
    isGeocodeAPILoaded && onLoad();
  }, [isGeocodeAPILoaded]);

  return (
    <>
      {geocodingService && (
        <Button
          size={"lg"}
          onClick={() => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                const coords = {
                  lat,
                  lng,
                };

                console.log(coords);
                map?.setCenter(coords);
                geocodingService
                  .geocode({
                    location: {
                      lat,
                      lng,
                    },
                  })
                  .then((res) => {
                    debugger;
                    if (res.results.length <= 0) {
                      return;
                    }

                    let city = "";
                    const addressComponents = res.results[0].address_components;
                    const cities = addressComponents.filter(
                      (f) =>
                        JSON.stringify(f.types) ===
                        JSON.stringify([
                          "administrative_area_level_1",
                          "political",
                        ])
                    );

                    if (cities && cities?.length > 0)
                      city = cities[0]?.long_name;

                    setAddressDescription({
                      fullAddress: res.results[0].formatted_address,
                      lat,
                      lng,
                      city: city,
                    });
                  });
              },
              null,
              { enableHighAccuracy: true }
            );
          }}
          variant={"outline"}
        >
          Get My Current Location
        </Button>
      )}
    </>
  );
}

export function MapView(props: MapViewProps) {
  const [isPlacesAPILoaded, setIsPlacesAPILoaded] = useState(false);

  const [markerRef, marker] = useAdvancedMarkerRef();
  const [mapCenter, setMapCenter] = useState({
    lat: props.address?.lat || 0,
    lng: props.address?.lng || 0,
  });

  const [markerPos, setMarkerPos] = useState({
    lat: props.address?.lat || 0,
    lng: props.address?.lng || 0,
  });

  useEffect(() => {
    if (props.address) {
      const coordsJson = {
        lat: props.address?.lat || 0,
        lng: props.address?.lng || 0,
      };
      setMarkerPos(coordsJson);
      setMapCenter(coordsJson);
    }
  }, [props.address]);

  useEffect(() => {
    if (!marker) {
      return;
    }
  }, [marker]);

  const handleClick = (event: MapMouseEvent) => {
    const coords = event.detail.latLng as any;
    setMarkerPos({
      lat: (coords?.lat as number) || 0,
      lng: (coords?.lng as number) || 0,
    });
    coords &&
      props.setAddressDescription({
        ...props.address,
        lat: (coords.lat as number) || 0,
        lng: (coords.lng as number) || 0,
      });
  };

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY || ""}
      libraries={["places", "geocoding"]}
      onLoad={() => {
        setIsPlacesAPILoaded(true);
      }}
    >
      <PlacesSearch
        isPlacesAPILoaded={isPlacesAPILoaded}
        address={props.address}
        setAddressDescription={(addressDescription: AddressDescription) =>
          props.setAddressDescription(addressDescription)
        }
      />
      <Map
        mapTypeId={"satellite"}
        id={"solar-quote-map"}
        mapId={"8c1c10c3cc4d248b"}
        onClick={(event) => handleClick(event)}
        style={props.style}
        defaultCenter={mapCenter}
        defaultZoom={15}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <AdvancedMarker ref={markerRef} position={markerPos} />
      </Map>
      <div className="flex lg:flex-row flex-col mb-4 gap-2 pt-2">
        <LocateMeButton
          isGeocodeAPILoaded={isPlacesAPILoaded}
          setAddressDescription={(addressDescription: AddressDescription) =>
            props.setAddressDescription(addressDescription)
          }
        />
        <props.actionButton />
      </div>
    </APIProvider>
  );
}
