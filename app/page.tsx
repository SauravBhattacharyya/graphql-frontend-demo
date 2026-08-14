import Link from "next/link";

const linkClassName =
  "block rounded-lg border border-current px-5 py-3.5 text-center font-semibold text-inherit no-underline transition-colors hover:bg-foreground hover:text-background";

export default function Home() {
  const togglePagesRouter = false;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="m-0 text-center text-4xl font-bold tracking-tight">
        GraphQL Live Demos
      </h1>
      <ul className="m-0 flex w-full max-w-sm list-none flex-col gap-3 p-0">
        {!togglePagesRouter && (
          <>
            <li>
              <Link href="/server-demo" className={linkClassName}>
                Server Component Demo
              </Link>
            </li>
            <li>
              <Link href="/client-demo" className={linkClassName}>
                Client Component Demo
              </Link>
            </li>
          </>
        )}
        {togglePagesRouter && (
          <>
            <li>
              <Link href="/pages-server-demo" className={linkClassName}>
                Pages Server Demo
              </Link>
            </li>
            <li>
              <Link href="/pages-client-demo" className={linkClassName}>
                Pages Client Demo
              </Link>
            </li>
          </>
        )}
      </ul>
    </main>
  );
}
