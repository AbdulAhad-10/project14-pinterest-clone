"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import SaveButton from "@/components/SaveButton";
import { Avatar } from "antd";

interface Creator {
  _id: string;
  name: string;
  profilePicture: string;
}

interface Pin {
  _id: string;
  image: string;
  title: string;
  description: string;
  creator: Creator;
}

export default function PinDetails({ params }: { params: { id: string } }) {
  const [pin, setPin] = useState<Pin | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPin = async () => {
      try {
        const response = await fetch(`/api/getPins/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch pin");
        }
        const data = await response.json();
        setPin(data);
      } catch (err) {
        setError("Error fetching pin details");
      }
    };

    fetchPin();
  }, [params.id]);

  if (error) return <div>{error}</div>;
  if (!pin) return <div>Pin not found</div>;

  return (
    <div className="container relative left-0 min-h-screen px-4 py-8 mx-auto top-20">
      <div className="max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        <div className="relative h-96">
          <Image
            src={pin.image}
            alt={pin.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h1 className="mb-4 text-3xl font-bold">{pin.title}</h1>
            <SaveButton pinId={pin._id} />
          </div>
          <p className="mb-4 text-gray-600">{pin.description}</p>
          <div className="flex items-center mb-4">
            <Avatar
              src={pin.creator.profilePicture}
              className="w-10 h-10 mr-3"
            />
            <span className="font-semibold">{pin.creator.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
