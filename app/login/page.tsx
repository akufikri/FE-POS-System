import { Button } from "@/components/ui/button";

import { loginAction } from "./actions";

export default function LoginPage() {
  return (
    <main className="mx-auto mt-20 w-full max-w-sm px-5">
      <h1 className="text-2xl font-bold">Login Kasir</h1>
      <p className="mt-1 text-sm text-gray-500">
        Masuk untuk mengakses dashboard POS.
      </p>

      <form action={loginAction} className="mt-6 space-y-3">
        <input
          name="username"
          placeholder="username"
          required
          autoComplete="username"
          className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        <Button type="submit" className="w-full">
          Masuk
        </Button>
      </form>
    </main>
  );
}
