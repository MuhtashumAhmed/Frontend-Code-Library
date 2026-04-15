// ========= complete gallery paeg jsut same like pinterest and unsplash etc
//  also supporst video and images both --- just want to use type ="image and type ="video"


"use client";
import { useState, useMemo } from "react";
import { Image as ImageIcon, Grid3x3, Columns3 } from "lucide-react";
import { imagesData, imagesWithId } from "@/data/images";
import Image from "next/image";

export default function Gallery() {
  const [columns, setColumns] = useState<2 | 3 | 4>(3);

  const getColumnClass = () => {
    switch (columns) {
      case 2:
        return "sm:columns-2";
      case 3:
        return "sm:columns-2 lg:columns-3";
      case 4:
        return "sm:columns-2 lg:columns-3 xl:columns-4";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-myCream to-myBrown mb-12">
      <header className="bg-white  sticky top-0 z-10 ">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"> */}
        <div className="  px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-myBrown p-2 rounded-lg">
                <ImageIcon className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  <span className="text-myBrown font-merriweather text-4xl   ">
                    Image Gallery
                  </span>
                </h1>
              </div>
            </div>

            <div className=" hidden lg:flex  items-center gap-2">
              <button
                onClick={() => setColumns(2)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  columns === 2
                    ? "bg-myBrown text-myWhite"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title="2 columns"
              >
                <Columns3 size={20} className="rotate-90" />
              </button>
              <button
                onClick={() => setColumns(3)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  columns === 3
                    ? "bg-myBrown text-myWhite"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title="3 columns"
              >
                <Grid3x3 size={20} />
              </button>
              <button
                onClick={() => setColumns(4)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  columns === 4
                    ? "bg-myBrown text-myWhite"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title="4 columns"
              >
                <Grid3x3 size={20} className="scale-75" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className=" px-4 sm:px-6 lg:px-8 py-8">
        {/* <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> */}
        {imagesData.length === 0 ? (
          <div className="text-center py-20">
            <ImageIcon className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No images found
            </h2>
          </div>
        ) : (
          <div className={`columns-1 ${getColumnClass()} gap-4 space-y-4`}>
            {imagesWithId.map((item) => (
              <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white">
                {item.type === "image" ? (
                  <Image
                    src={item.url}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    width={800}
                    height={600}
                  />
                ) : (
                  <video
                    src={item.url}
                    controls
                    className="w-full h-auto object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}