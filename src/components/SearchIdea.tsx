import Image from "next/image";
import { chicken1, chicken2, chicken3, chicken4 } from "../../public";
import { SearchOutlined } from "@ant-design/icons";

const images = [chicken1, chicken2, chicken3, chicken4];

const SearchIdea = () => {
  return (
    <section
      id="SearchIdea"
      className="relative flex items-center justify-between h-screen bg-[#fffd92] px-10"
    >
      <div className="relative w-full max-w-3xl h-96">
        <div className="absolute top-0 left-20 w-60 h-60 rounded-lg overflow-hidden transform rotate-[-15deg] z-10">
          <Image
            src={images[0]}
            alt="Image 1"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute top-4 right-20 w-60 h-60 rounded-lg overflow-hidden transform rotate-[10deg] z-20">
          <Image
            src={images[1]}
            alt="Image 2"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute bottom-4 left-20 w-60 h-60 rounded-lg overflow-hidden transform rotate-[-10deg] z-30">
          <Image
            src={images[2]}
            alt="Image 3"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute bottom-0 right-20 w-60 h-60 rounded-lg overflow-hidden transform rotate-[15deg] z-40">
          <Image
            src={images[3]}
            alt="Image 4"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute z-40 flex items-center justify-center w-56 h-16 overflow-hidden transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-3xl top-1/2 left-1/2">
          <span className="text-lg font-semibold text-purple-700">
            <SearchOutlined />
            easy chicken dinner
          </span>
        </div>
      </div>

      <div className="text-[#c31952] flex flex-col items-center gap-5">
        <h1 className="text-6xl font-bold text-center">Search for an idea</h1>
        <p className="w-3/4 text-2xl text-center">
          What do you want to try next? Think of something you’re into—like
          “easy chicken dinner”—and see what you find.
        </p>
      </div>
    </section>
  );
};

export default SearchIdea;
