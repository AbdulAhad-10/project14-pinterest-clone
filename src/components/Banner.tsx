"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { img1, img2, img3, img4, img9, img8 } from "../../public";
import { DownOutlined } from "@ant-design/icons";
import Link from "next/link";

const phrases = [
  "weeknight dinner idea",
  "home decor idea",
  "new look outfit",
  "green thumb idea",
];

const images1 = [img1, img2, img3, img4, img9, img8];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const clrs = [`#c28b00`, `#618c7b`, `#0076d3`, `#407a57`];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative flex flex-col items-center h-screen bg-white top-20">
      <h1 className="mt-8 text-6xl font-semibold">Get your next</h1>
      <h1
        className="mt-6 text-6xl font-semibold"
        style={{ color: clrs[currentIndex] }}
      >
        {phrases[currentIndex]}
      </h1>
      <div className="flex gap-2 mt-8">
        {phrases.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor:
                index === currentIndex ? clrs[currentIndex] : "#e0e0e0",
            }}
          />
        ))}
      </div>

      <div className="absolute left-0 right-0 flex items-end justify-between gap-4 overflow-hidden bottom-32">
        {images1.map((image, index) => (
          <div
            key={index}
            className={`relative w-56 ${
              index === 0 || index === images1.length - 1
                ? "h-[380px]"
                : index === 1 || index === images1.length - 2
                ? "h-[280px] top-16"
                : "h-[250px] top-32"
            }`}
          >
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>

      <Link
        href={"#SearchIdea"}
        className="bg-[#fffd92] h-16 absolute left-0 right-0 bottom-20 flex items-center justify-center "
      >
        <span className="font-semibold">{"Here's how it works"}</span>
        <DownOutlined className="ml-2" />
      </Link>
    </header>
  );
}
