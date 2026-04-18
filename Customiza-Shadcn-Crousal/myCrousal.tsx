"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
const HomeSlider = () => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  const autoplay = useRef(Autoplay({ delay: 3500 , stopOnInteraction: true }));

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const sliderImages = [
    {
      url: "/dummyImages/image-1.png",
      alt: "our Location Image",
    },
    {
      url: "/dummyImages/image-5.jpg",
      alt: "our Location Image",
    },
  ];
  return (
    <div className="flex gap-1">
      <Carousel setApi={setApi} plugins={[autoplay.current]} className=" ">
        <CarouselContent>
          {sliderImages?.map((data, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Image
                  src={data?.url}
                  alt={data?.alt}
                  height={450}
                  width={300}
                  className="w-full  max-h-82 aspect-square rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/*  DOTS */}
      <div className="flex flex-col justify-center gap-2.5 ">
        {sliderImages?.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-2 w-2 rounded-full transition-all cursor-pointer ${
              current === index ? "bg-black w-2" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
export default HomeSlider;
