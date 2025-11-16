"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage, useScript } from "usehooks-ts";
import { createFormFactory } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { AddressDescription } from "@/components/map/map";
import { APIProvider } from "@vis.gl/react-google-maps";

type Form = {
  monthlyConsumption: number | string;
};

const formFactory = createFormFactory<Form>({
  defaultValues: {
    monthlyConsumption: "",
  },
});

export function MonthlyConsumptionForm() {
  const [address, setAddress] = useState<AddressDescription>();
  const [, setValue] = useLocalStorage("consumption-details", {});

  const router = useRouter();

  const [isPlacesAPILoaded, setIsPlacesAPILoaded] = useState(false);

  const form = formFactory.useForm({
    onSubmit: async ({ value }) => {
      if (address) {
        setValue({
          address,
          monthlyConsumption: value.monthlyConsumption,
        });

        router.push("/proposal/grid-tied");
      }
    },
  });

  const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
  const inputRef = useRef<HTMLInputElement>(null);

  function onLoad() {
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

      //Cairo Governorate,  Giza Governate

      if (autoCompleteRef?.current?.getPlace().address_components) {
        const cities = autoCompleteRef.current
          .getPlace()
          ?.address_components?.filter(
            (f) =>
              JSON.stringify(f.types) ===
              JSON.stringify(["administrative_area_level_1", "political"])
          );

        if (cities && cities?.length > 0) city = cities[0]?.long_name;
      }

      setAddress({
        fullAddress: autoCompleteRef?.current?.getPlace()?.name || "",
        lat:
          autoCompleteRef?.current?.getPlace()?.geometry?.location?.lat() || 30,
        lng:
          autoCompleteRef.current?.getPlace()?.geometry?.location?.lng() || 30,
        city: city,
      });
    });
  }

  useEffect(() => {
    isPlacesAPILoaded && onLoad();
  }, [isPlacesAPILoaded]);

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY || ""}
      libraries={["places"]}
      onLoad={() => {
        setIsPlacesAPILoaded(true);
      }}
    >
      <div className="w-full">
        <form
          className="flex flex-col lg:flex-row gap-3 w-full max-w-2xl"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <Input
            ref={inputRef}
            type="text"
            placeholder="Enter Your Address"
            className="bg-white rounded-2xl px-4 py-3 text-base flex-1 border-0 shadow-sm"
          />
          <form.Field
            name="monthlyConsumption"
            validators={{
              onChange: ({ value }) =>
                !value ? "address is required" : undefined,
            }}
            children={(field) => (
              <>
                <Input
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                  className="bg-white rounded-2xl px-4 py-3 text-base flex-1 border-0 shadow-sm"
                  placeholder="Monthly Consumption"
                />
              </>
            )}
          />
          <Button variant="default" type="submit" className="rounded-2xl px-6 py-3 text-base whitespace-nowrap bg-primary hover:bg-primary/90">
            Calculate My Fee
          </Button>
        </form>
      </div>
    </APIProvider>
  );
}
