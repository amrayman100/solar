"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useRef } from "react";
import { useScript } from "usehooks-ts";

export function MonthlyConsumptionForm() {
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
      console.log(autoCompleteRef.current.getPlace());
    });
  }, [scriptStatus, options]);

  return (
    <div className="m-auto h-full mt-12 flex flex-col lg:flex-row md:flex:row gap-2">
      <Input
        ref={inputRef}
        type="text"
        // onChange={() => onChange(null)}
        placeholder="Enter Your Address"
        className="bg-background"
      />
      <Input className="bg-background" placeholder="Monthly Consumption" />
      <Button variant="default" onClick={() => console.log("hello")}>
        Calculate My Fee
      </Button>
    </div>
  );
}
