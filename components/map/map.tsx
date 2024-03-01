import {
  APIProvider,
  Map,
  AdvancedMarker,
  MapMouseEvent,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { Input } from "@/components/ui/input";
import { CSSProperties, useEffect, useRef, useState } from "react";

export type BaseAddress = { name: string; lat: number; lng: number };

type MapViewProps = {
  style: CSSProperties;
  address: BaseAddress;
  onClick: (arg: { lat: number; lng: number }) => void;
};

export function MapView(props: MapViewProps) {
  const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
  const inputRef = useRef<HTMLInputElement>(null);

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
      props.onClick({
        lat: (coords.lat as number) || 0,
        lng: (coords.lng as number) || 0,
      });
  };

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY || ""}
      libraries={["places"]}
      onLoad={() => {
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
          const place = autoCompleteRef.current.getPlace();
          const coords = place?.geometry?.location as any;
          const coordsJson = {
            lat: coords?.lat(),
            lng: coords?.lng(),
          };
          setMarkerPos(coordsJson);
          setMapCenter(coordsJson);
        });
      }}
    >
      <Input
        ref={inputRef}
        defaultValue={props.address?.name}
        type="text"
        placeholder="Enter Your Address"
        className="bg-background mb-4"
      />
      <Map
        id={"solar-quote-map"}
        mapId={"8c1c10c3cc4d248b"}
        onClick={(event) => handleClick(event)}
        style={props.style}
        center={mapCenter}
        defaultZoom={15}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <AdvancedMarker ref={markerRef} position={markerPos} />
      </Map>
    </APIProvider>
  );
}
