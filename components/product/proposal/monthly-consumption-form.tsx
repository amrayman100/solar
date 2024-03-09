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

        router.push("/proposal");
      }
    },
  });

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
      <div className="m-auto h-full mt-12">
        <form.Provider>
          <form
            className="flex flex-col lg:flex-row md:flex:row gap-2"
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
              className="bg-background"
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
                    className="bg-background"
                    placeholder="Monthly Consumption"
                  />
                </>
              )}
            />
            <Button variant="default" type="submit">
              Calculate My Fee
            </Button>
          </form>
        </form.Provider>
      </div>
    </APIProvider>
  );
}
