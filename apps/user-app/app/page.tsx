import FeaturedJobs from "@/components/FeaturedJobs";

import Hero from "@/components/Hero";
export default function Home() {
  return (
    <>
      <main className="flex-grow">
        <Hero />
        <FeaturedJobs />
      </main>
    </>
  );
}
