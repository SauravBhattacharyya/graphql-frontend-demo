import Link from "next/link";
import { CountryPanel } from "@/components/country-panel";
import { getCountryFetchBody, type Country } from "@/lib/queries/get-country";

export default async function ServerDemoPage() {
  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(getCountryFetchBody("IN")),
    // cache: "no-store",
  });

  const { data } = await res.json();
  const country = data.country as Country;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-10 sm:px-8">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm text-foreground/60 no-underline transition-colors hover:text-foreground"
        >
          ← Back
        </Link>
        <span className="rounded-full border border-foreground/20 px-3 py-1 text-xs font-semibold tracking-wide uppercase">
          Server Component
        </span>
      </div>

      <CountryPanel
        country={country}
        lead={
          <>
            Native <code className="font-mono">fetch</code> · no Apollo · zero
            client JS for this request
          </>
        }
      />
    </main>
  );
}
