import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import PopularServices from "@/components/home/PopularServices";
import StatsAndFreelances from "@/components/home/StatsAndFreelances";
import HowItWorks from "@/components/home/HowItWorks";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        <Hero />
        <Categories />
        <PopularServices />
        <StatsAndFreelances />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
