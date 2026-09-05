"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useRef, useState } from "react";
import { useScript } from "usehooks-ts";

type PlacesSearchProps = {
  defaultTextValue: string;
  onChange: (place: google.maps.places.PlaceResult) => void;
};

export function PlacesSearch(props: PlacesSearchProps) {
  const [address, setAddress] = useState<google.maps.places.PlaceResult>();
  const scriptStatus = useScript(
    `https://maps.googleapis.com/maps/api/js?language=en&key=${process.env.NEXT_PUBLIC_MAP_API_KEY}&libraries=places`
  );

  const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
  const inputRef = useRef<HTMLInputElement>(null);

  const options = useMemo(
    () => ({
      componentRestrictions: { country: "eg" },
      fields: ["address_components", "geometry", "name"],
      types: ["establishment"],
    }),
    []
  );

  useEffect(() => {
    if (
      autoCompleteRef.current ||
      scriptStatus === "loading" ||
      !inputRef.current ||
      !window.google ||
      !window.google.maps ||
      !window.google.maps.places
    ) {
      return;
    }
    if (scriptStatus === "error") {
      // Report error
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

      setAddress(autoCompleteRef.current.getPlace());
    });
  }, [scriptStatus, options]);

  return (
    <Input
      defaultValue={props.defaultTextValue}
      ref={inputRef}
      type="text"
      placeholder="Enter Your Address"
      className="bg-background"
    />
  );
}
