import Head from "next/head";
import Discover from "@/components/Discover";

export default function Home() {
  return (
    <>
      <Head><title>Music Discover</title></Head>
      <header>
      </header>    
      <main className="flex flex-col w-full">
        <Discover />
      </main>
      <footer>
      </footer>
    </>
  );
}
