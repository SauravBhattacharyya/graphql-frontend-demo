import Link from "next/link";
import type { GetServerSideProps } from "next";
import { CountryPanel } from "@/components/country-panel";
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

      <CountryPanel
        country={country}
        lead={
          <>
            <code className="font-mono">getServerSideProps</code> · native{" "}
            <code className="font-mono">fetch</code> · no Apollo
          </>
        }
      />
    </main>
  );
}
