"use client";

import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { CountryPanel } from "@/components/country-panel";
import { GET_COUNTRY } from "@/lib/queries/get-country";

export default function ClientDemoPage() {
  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { code: "IN" },
  });

  if (loading) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-10 sm:px-8">
        <DemoChrome />
        <p className="text-foreground/60">Loading with Apollo useQuery…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-10 sm:px-8">
        <DemoChrome />
        <p className="text-red-500">Error: {error.message}</p>
      </main>
    );
  }

  if (!data?.country) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-10 sm:px-8">
        <DemoChrome />
        <p className="text-foreground/60">No data</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-10 sm:px-8">
      <DemoChrome />
      <CountryPanel
        country={data.country}
        lead={
          <>
            Apollo <code className="font-mono">useQuery</code> · Client Component
            · loading / error states
          </>
        }
      />
    </main>
  );
}

function DemoChrome() {
  return (
    <div className="flex items-center justify-between gap-4">
      <Link
        href="/"
        className="text-sm text-foreground/60 no-underline transition-colors hover:text-foreground"
      >
        ← Back
      </Link>
      <span className="rounded-full bg-foreground px-3 py-1 text-xs font-semibold tracking-wide text-background uppercase">
        Client Component
      </span>
    </div>
  );
}
