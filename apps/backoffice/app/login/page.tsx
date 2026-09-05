"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@bolt-energy/ui/components/button";
import { Input } from "@bolt-energy/ui/components/inputs";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-(--border) bg-(--card) shadow-sm">
        <div className="h-2 bg-(--primary)" />
        <form
          className="space-y-5 p-8"
          onSubmit={async (event) => {
            event.preventDefault();
            setError("");
            setLoading(true);
            const result =
              mode === "signin"
                ? await authClient.signIn.email({ email, password })
                : await authClient.signUp.email({ email, password, name });
            setLoading(false);
            if (result.error) {
              setError(result.error.message ?? "Authentication failed");
              return;
            }
            router.replace("/");
          }}
        >
          <div>
            <h1 className="text-center text-2xl font-extrabold text-(--primary)">
              Bolt Energy
            </h1>
            <p className="mt-1 text-center text-sm text-(--muted-foreground)">
              {mode === "signin"
                ? "Sign in to the backoffice"
                : "Create the first staff account"}
            </p>
          </div>
          {error ? (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </p>
          ) : null}
          {mode === "signup" ? (
            <label className="block space-y-1 text-sm">
              <span>Name</span>
              <Input
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          ) : null}
          <label className="block space-y-1 text-sm">
            <span>Email</span>
            <Input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="block space-y-1 text-sm">
            <span>Password</span>
            <Input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? "Please wait…"
              : mode === "signin"
                ? "Sign in"
                : "Create account"}
          </Button>
          <button
            type="button"
            className="w-full text-center text-sm text-(--muted-foreground) underline-offset-4 hover:underline"
            onClick={() => {
              setError("");
              setMode(mode === "signin" ? "signup" : "signin");
            }}
          >
            {mode === "signin"
              ? "Need an account? Create one"
              : "Already have an account? Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
