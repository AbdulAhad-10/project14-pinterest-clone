import { useState, useContext, useEffect } from "react";
import { Input } from "antd";
import { SearchContext } from "@/context/SearchContext";

const { Search } = Input;

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { performSearch } = useContext(SearchContext);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    performSearch(value);
  };

  useEffect(() => {
    performSearch(""); // Fetch all pins when component mounts
  }, [performSearch]);

  return (
    <Search
      placeholder="Search"
      enterButton={false}
      onSearch={handleSearch}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        if (e.target.value === "") {
          performSearch(""); // Fetch all pins when search is cleared
        }
      }}
      value={searchQuery}
      size="large"
      className="flex-grow max-w-full mx-5 rounded-full"
    />
  );
};

export default Searchbar;
