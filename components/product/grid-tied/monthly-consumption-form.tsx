"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage, useScript } from "usehooks-ts";
import { createFormFactory } from "@tanstack/react-form";
import { useRouter } from "next/navigation";

type Form = {
  monthlyConsumption: number | string;
};

const formFactory = createFormFactory<Form>({
  defaultValues: {
    monthlyConsumption: "",
  },
});

export function MonthlyConsumptionForm() {
  const [address, setAddress] = useState<google.maps.places.PlaceResult>();
  const [, setValue] = useLocalStorage("consumption-details", {});

  const router = useRouter();

  const scriptStatus = useScript(
    `https://maps.googleapis.com/maps/api/js?language=en&key=${process.env.NEXT_PUBLIC_MAP_API_KEY}&libraries=places`
  );

  const form = formFactory.useForm({
    onSubmit: async ({ value }) => {
      debugger;
      if (address) {
        setValue({
          address,
          monthlyConsumption: value.monthlyConsumption,
        });

        router.push("/solar-quote");
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
  );
}
