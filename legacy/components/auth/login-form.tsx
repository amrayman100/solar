"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "@tanstack/react-form";
import { Zap } from "lucide-react";
import { ModeToggle } from "../shared/theme-button";
import { useMutation } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useRouter } from "next/navigation";

type Props = {
  signIn: (req: { email: string; password: string }) => Promise<any>;
};

export function LoginForm(props: Props) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (req: { email: string; password: string }) => {
      return props.signIn(req);
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      mutation
        .mutateAsync(value)
        .then(() => {
          router.push("/admin/product/grid-tied/settings");
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <>
      <div className="p-2">
        <ModeToggle />
      </div>
      <form
        className="mx-auto mt-10 border-solid p-10 px-30 rounded-xl border bg-card text-card-foreground shadow w-max"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <div>
          <div className="flex flex-col space-y-2 mb-4">
            <div className="flex gap-2 m-auto">
              <h3 className="font-semibold tracking-tight text-2xl text-center">
                Login
              </h3>
              <Zap className="h-6 w-6 self-center" />
            </div>
          </div>
          <form.Field
            name="email"
            validators={{
              onBlur: (val) =>
                val.value == "" ? "Please enter your email" : undefined,
            }}
            children={(field) => (
              <>
                <Label htmlFor="email">Email</Label>
                <Input
                  className="my-4"
                  type="email"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors ? (
                  <div>
                    <em role="alert" className=" text-red-400">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  </div>
                ) : null}
              </>
            )}
          />
          <form.Field
            name="password"
            validators={{
              onBlur: (val) =>
                val.value == "" ? "Please enter your password" : undefined,
            }}
            children={(field) => (
              <>
                <Label htmlFor="password">Password</Label>
                <Input
                  className="my-4"
                  type="password"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors ? (
                  <div>
                    <em role="alert" className=" text-red-400">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  </div>
                ) : null}
              </>
            )}
          />
          {mutation.error && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Wrong Email or Password.</AlertDescription>
            </Alert>
          )}
        </div>
        <div className="mx-auto flex mt-6">
          <Button className="mx-auto px-4 w-full" color="black" type="submit">
            Login
            {mutation.isPending && (
              <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
