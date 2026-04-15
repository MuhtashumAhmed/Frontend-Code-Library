"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const GoToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 w-8 h-8 bg-myBrown text-white flex items-center opacity-25 hover:opacity-100 justify-center rounded-full shadow-2xl cursor-pointer  transition-all ease-linear"
    >
      <ArrowUp />
    </button>
  );
};

export default GoToTopButton;