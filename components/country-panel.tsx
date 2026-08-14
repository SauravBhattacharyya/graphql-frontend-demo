import Image from "next/image";
import type { ReactNode } from "react";
import type { Country } from "@/lib/queries/get-country";

type CountryPanelProps = {
  country: Country;
  lead?: ReactNode;
};

function continentLabel(
  continent: Country["continent"],
): string | undefined {
  if (!continent) return undefined;
  const name = continent.name ?? undefined;
  const code = continent.code ?? undefined;
  if (name && code) return `${name} (${code})`;
  return name ?? code;
}

export function CountryPanel({ country, lead }: CountryPanelProps) {
  const continent = continentLabel(country.continent);
  const languages = country.languages?.filter(
    (language) => language.name || language.native || language.code,
  );
  const states = country.states?.filter((state) => state.name);
  const facts = [
    { label: "Capital", value: country.capital },
    { label: "Currency", value: country.currency },
    { label: "Phone code", value: country.phone ? `+${country.phone}` : null },
    { label: "Continent", value: continent },
  ];
  const visibleFacts = facts.filter((fact) => fact.value);

  return (
    <>
      <header className="space-y-5 border-b border-foreground/10 pb-8">
        {lead ? (
          <p className="text-sm font-medium text-foreground/60">{lead}</p>
        ) : null}
        <div className="flex items-center gap-5">
          {country.code ? (
            <Image
              src={`https://flagcdn.com/w160/${country.code.toLowerCase()}.png`}
              alt={country.name ? `Flag of ${country.name}` : "Country flag"}
              width={80}
              height={60}
              className="h-14 w-auto rounded-md border border-foreground/10 shadow-sm sm:h-16"
            />
          ) : null}
          <div className="min-w-0 space-y-1.5">
            {country.name || country.code ? (
              <div className="flex flex-wrap items-center gap-3">
                {country.name ? (
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    {country.name}
                  </h1>
                ) : null}
                {country.code ? (
                  <span className="rounded-md bg-foreground/10 px-2 py-0.5 font-mono text-sm font-semibold tracking-wider text-foreground/80">
                    {country.code}
                  </span>
                ) : null}
              </div>
            ) : null}
            {country.native ? (
              <p className="text-lg text-foreground/65">{country.native}</p>
            ) : null}
          </div>
        </div>
      </header>

      {visibleFacts.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2">
          {visibleFacts.map((fact) => (
            <Fact key={fact.label} label={fact.label} value={fact.value} />
          ))}
        </section>
      ) : null}

      {languages?.length ? (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold tracking-wide text-foreground/60 uppercase">
            Languages
          </h2>
          <ul className="flex flex-wrap gap-2">
            {languages.map((language, index) => (
              <li
                key={language.code ?? language.name ?? index}
                className="rounded-lg border border-foreground/15 px-3 py-2 text-sm"
              >
                {language.name ? (
                  <span className="font-medium">{language.name}</span>
                ) : null}
                {language.native ? (
                  <span className="text-foreground/55">
                    {language.name ? " · " : null}
                    {language.native}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {states?.length ? (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold tracking-wide text-foreground/60 uppercase">
            States & territories · {states.length}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {states.slice(0, 12).map((state, index) => (
              <li
                key={state.name ?? index}
                className="rounded-md bg-foreground/5 px-2.5 py-1 text-sm"
              >
                {state.name}
              </li>
            ))}
            {states.length > 12 ? (
              <li className="rounded-md px-2.5 py-1 text-sm text-foreground/55">
                +{states.length - 12} more
              </li>
            ) : null}
          </ul>
        </section>
      ) : null}
    </>
  );
}

function Fact({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  if (!value) return null;

  return (
    <div className="rounded-xl border border-foreground/10 px-4 py-3">
      <p className="text-xs font-semibold tracking-wide text-foreground/55 uppercase">
        {label}
      </p>
      <p className="mt-1 text-lg font-medium">{value}</p>
    </div>
  );
}
