"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

type HeroBackgroundProps = {
  desktopImg: string;
  mobileImg?: string; // optional
  gradientClass?: string;
  className?: string;
  priority?: boolean;
};

const HeroBackground = ({
  desktopImg,
  mobileImg,
  gradientClass = "bg-black/40",
  className,
  priority = true,
}: HeroBackgroundProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={clsx("absolute inset-0 -z-10 overflow-hidden", className)}>
      {/*  Gradient */}
      <div
        className={clsx(
          "absolute inset-0 transition-opacity duration-700 bg-gradient-to-r from-myBrown to-myCream ",
          gradientClass,
          loaded ? "opacity-0" : "opacity-100",
        )}
      />

      {/*  Mobile Image */}
      {mobileImg && (
        <Image
          src={mobileImg}
          alt="hero mobile"
          fill
          priority={priority}
          onLoad={() => setLoaded(true)}
          className={clsx(
            "object-cover transition-opacity duration-700 block lg:hidden",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      )}

      {/* ✅ Desktop Image */}
      <Image
        src={desktopImg}
        alt="hero desktop"
        fill
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={clsx(
          " transition-opacity duration-700 hidden lg:block ",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
};

export default HeroBackground;