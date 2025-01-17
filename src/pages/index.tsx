import Head from "next/head";
import Discover from "@/components/Discover";

export default function Home() {
  return (
    <>
      <Head><title>Music Discover</title></Head>
      <header>
      </header>    
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Discover />
      </main>
      <footer>
      </footer>
    </>
  );
}
