import Banner from "@/components/Banner";
import DiscoverIdea from "@/components/DiscoverIdea";
import Footer from "@/components/Footer";
import SaveIdea from "@/components/SaveIdea";
import SearchIdea from "@/components/SearchIdea";
import ScrollContainer from "@/components/ScrollContainer";

export default function Home() {
  return (
    <ScrollContainer>
      <section className="scroll-section">
        <Banner />
      </section>
      <section className="scroll-section">
        <SearchIdea />
      </section>
      <section className="scroll-section">
        <SaveIdea />
      </section>
      <section className="scroll-section">
        <DiscoverIdea />
      </section>
      <section className="scroll-section">
        <Footer />
      </section>
    </ScrollContainer>
  );
}
