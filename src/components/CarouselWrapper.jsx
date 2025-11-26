"use client";

import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("./Carousel"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-60 sm:h-72 md:h-80 bg-gray-200 animate-pulse rounded-xl" />
  ), // optional skeleton loader
});

export default Carousel;


