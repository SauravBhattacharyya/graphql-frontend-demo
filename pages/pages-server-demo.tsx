import Link from "next/link";
import type { GetServerSideProps } from "next";
import {
  getCountryFetchBody,
  type Country,
} from "@/lib/queries/get-country";

type Props = {
  country: Country;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(getCountryFetchBody("IN")),
  });

  const { data } = await res.json();

  return {
    props: {
      country: data.country as Country,
    },
  };
};

export default function PagesServerDemoPage({ country }: Props) {
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
          Pages Server
        </span>
      </div>

      <header className="space-y-5 border-b border-foreground/10 pb-8">
        <p className="text-sm font-medium text-foreground/60">
          <code className="font-mono">getServerSideProps</code> · native{" "}
          <code className="font-mono">fetch</code> · no Apollo
        </p>
        <div className="flex items-center gap-5">
          <img
            src={`https://flagcdn.com/w160/${country.code.toLowerCase()}.png`}
            alt=""
            width={80}
            height={60}
            className="h-14 w-auto rounded-md border border-foreground/10 shadow-sm sm:h-16"
          />
          <div className="min-w-0 space-y-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {country.name}
              </h1>
              <span className="rounded-md bg-foreground/10 px-2 py-0.5 font-mono text-sm font-semibold tracking-wider text-foreground/80">
                {country.code}
              </span>
            </div>
            <p className="text-lg text-foreground/65">{country.native}</p>
          </div>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <Fact label="Capital" value={country.capital} />
        <Fact label="Currency" value={country.currency} />
        <Fact label="Phone code" value={`+${country.phone}`} />
        <Fact
          label="Continent"
          value={`${country.continent.name} (${country.continent.code})`}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold tracking-wide text-foreground/60 uppercase">
          Languages
        </h2>
        <ul className="flex flex-wrap gap-2">
          {country.languages.map((language) => (
            <li
              key={language.code}
              className="rounded-lg border border-foreground/15 px-3 py-2 text-sm"
            >
              <span className="font-medium">{language.name}</span>
              <span className="text-foreground/55"> · {language.native}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold tracking-wide text-foreground/60 uppercase">
          States & territories · {country.states.length}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {country.states.slice(0, 12).map((state) => (
            <li
              key={state.name}
              className="rounded-md bg-foreground/5 px-2.5 py-1 text-sm"
            >
              {state.name}
            </li>
          ))}
          {country.states.length > 12 ? (
            <li className="rounded-md px-2.5 py-1 text-sm text-foreground/55">
              +{country.states.length - 12} more
            </li>
          ) : null}
        </ul>
      </section>
    </main>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-foreground/10 px-4 py-3">
      <p className="text-xs font-semibold tracking-wide text-foreground/55 uppercase">
        {label}
      </p>
      <p className="mt-1 text-lg font-medium">{value}</p>
    </div>
  );
}
