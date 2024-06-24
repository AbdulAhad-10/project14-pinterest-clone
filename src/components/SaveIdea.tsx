import Image from "next/image";
import { img1, img2, img3, img4, img9, img8 } from "../../public";

const images = [img1, img2, img3, img4, img9, img8];

const SaveIdea = () => {
  return (
    <section className="relative flex items-center justify-between h-screen bg-[#DAFFF6] px-10">
      <div className="text-[#006b6c] flex flex-col items-center gap-5">
        <h1 className="text-6xl font-bold text-center text-nowrap">
          Save ideas you like
        </h1>
        <p className="w-3/4 text-2xl text-center">
          Collect your favorites so you can get back to them later.
        </p>
      </div>

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
      </div>
    </section>
  );
};

export default SaveIdea;
