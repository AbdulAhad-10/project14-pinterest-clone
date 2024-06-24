import Image from "next/image";
import Link from "next/link";

interface Pin {
  _id: string;
  image: string;
  title: string;
}

interface ImageGridProps {
  pins: Pin[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ pins }) => {
  return (
    <div className="p-4">
      <div className="gap-4 space-y-4 columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5">
        {pins.map((pin) => (
          <Link
            href={`/home/${pin._id}`}
            key={pin._id}
            className="mb-4 break-inside-avoid"
          >
            <Image
              src={pin.image}
              alt={pin.title}
              width={500}
              height={500}
              className="w-full mb-4 rounded-lg shadow-md"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
