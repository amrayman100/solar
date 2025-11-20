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
      <div className="w-full flex justify-center">
        <form
          className="flex flex-col gap-0 w-full max-w-[371px]"
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
            className="bg-white h-[2.75rem] md:h-[3.25rem] w-full rounded-[5.75rem] px-4 md:px-6 text-base md:text-[1.5rem] border-0 shadow-sm text-[#797979] placeholder:text-[#797979] text-center placeholder:text-center"
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
                  className="bg-white h-[2.75rem] md:h-[3.25rem] w-full rounded-[5.75rem] px-4 md:px-6 text-base md:text-[1.5rem] border-0 shadow-sm text-[#797979] placeholder:text-[#797979] text-center placeholder:text-center mt-3 md:mt-[1.0625rem]"
                  placeholder="Monthly Consumption"
                />
              </>
            )}
          />
          <Button variant="default" type="submit" className="h-[3.125rem] md:h-[4.0625rem] w-full rounded-[7.8125rem] p-2 md:p-[0.625rem] text-lg md:text-[2rem] font-bold whitespace-nowrap bg-[#00bd70] hover:bg-[#00bd70]/90 text-white mt-3 md:mt-[1.1875rem]">
            Calculate My Fee
          </Button>
        </form>
      </div>
    </APIProvider>
  );
}
