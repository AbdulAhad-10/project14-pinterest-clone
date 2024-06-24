import Image from "next/image";
import { img11, img12 } from "../../public";

const DiscoverIdea = () => {
  return (
    <section className="relative gap-10 pr-10 flex items-center justify-between h-screen bg-[#FFE2EB]">
      <div className="relative w-full h-full max-w-3xl">
        <Image src={img11} alt="Image 1" layout="fill" objectFit="cover" />
        <div className="absolute right-0 z-20 overflow-hidden rounded-2xl h-96 top-20 left-20 w-60">
          <Image src={img12} alt="Image 2" layout="fill" objectFit="cover" />
        </div>
      </div>

      <div className="text-[#c32f00] flex flex-col items-center gap-5">
        <h1 className="text-6xl font-bold text-center">
          See it, make it, try it, do it
        </h1>
        <p className="w-3/4 text-2xl text-center">
          The best part of Pinterest is discovering new things and ideas from
          people around the world.
        </p>
      </div>
    </section>
  );
};

export default DiscoverIdea;
