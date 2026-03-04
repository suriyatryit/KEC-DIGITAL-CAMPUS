import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CreationPaths } from "@/components/CreationPaths";
import { SolutionsGrid } from "@/components/SolutionsGrid";
import { Infrastructure } from "@/components/Infrastructure";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <CreationPaths />
        <SolutionsGrid />
        <Infrastructure />
      </main>
      <Footer />
    </>
  );
}
