"use client";

import ImageGrid from "@/components/ImageGrid";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SearchContext } from "@/context/SearchContext";

const HomePage = () => {
  const [pins, setPins] = useState([]);
  const { searchResults } = useContext(SearchContext);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await axios.get("/api/getPins");
        setPins(response.data);
      } catch (error) {
        console.error("Error fetching pins:", error);
      }
    };

    fetchPins();
  }, []);

  const displayPins = searchResults.length > 0 ? searchResults : pins;

  return (
    <section className="relative min-h-screen px-5 pt-20">
      <ImageGrid pins={displayPins} />
    </section>
  );
};

export default HomePage;
