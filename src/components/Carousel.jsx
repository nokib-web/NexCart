"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";

const heroBanners = [
  {
    id: 1,
    src: "/hero1.jpg",
    alt: "40% Off Hoodies Promotion",
    title: "Winter Warmth Sale",
    subtitle: "Grab your favorite hoodies at up to 40% OFF.",
  },
  {
    id: 2,
    src: "/hero2.jpg",
    alt: "New Collection Drop",
    title: "The Next Cart Collection",
    subtitle: "Experience comfort with our new, premium fabrics.",
  },
  {
    id: 3,
    src: "/hero3.jpg",
    alt: "Free Shipping Offer",
    title: "Free Shipping on All Orders",
    subtitle: "Limited time offer. Shop now and save more.",
  },
  {
    id: 4,
    src: "/hero-4.jpg",
    alt: "New Arrivals for 2025",
    title: "Fresh Styles Just Landed",
    subtitle: "Explore the latest designs added this season.",
  },
  {
    id: 5,
    src: "/hero5.jpg",
    alt: "Premium Comfort",
    title: "Soft. Stylish. Sustainable.",
    subtitle: "Feel the comfort of premium cotton fabrics.",
  },
  {
    id: 6,
    src: "/hero6.jpg",
    alt: "Mega Sale",
    title: "Exclusive Online Offers",
    subtitle: "Save big! Deals available for a limited time only.",
  },
];


const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % heroBanners.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">

      {/* Responsive Wrapper */}
      <div
        className="
          relative w-full 
          h-40       
          sm:h-60   
          md:h-70  
          lg:h-80   
          xl:h-100  
          overflow-hidden rounded-xl shadow-xl
        "
      >
        {heroBanners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${banner.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center p-4 sm:p-8 md:p-12">
              <div className="text-white max-w-lg">

                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                  {banner.title}
                </h1>

                <p className="mt-2 sm:mt-4 text-sm sm:text-lg md:text-xl lg:text-2xl font-medium">
                  {banner.subtitle.split("40% OFF").map((part, i) =>
                    i === 0 ? (
                      part
                    ) : (
                      <React.Fragment key={i}>
                        <span className="text-primary font-bold ml-1">
                          40% OFF
                        </span>
                        {part}
                      </React.Fragment>
                    )
                  )}
                </p>

                <Link href='/products'><button className="btn btn-primary  mt-4 sm:mt-6 btn-sm sm:btn-md rounded-lg">
                  Shop Now!
                </button></Link>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {heroBanners.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-primary scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default Carousel;























// "use client";



// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import Image from "next/image";

// export default function Carousel() {
//     return (
//         <Swiper
//             spaceBetween={20}
//             slidesPerView={1}
//             modules={[Autoplay]}
//             autoplay={{ delay: 2500, disableOnInteraction: false }}
//         >
//              <SwiperSlide>
//                 <div className="swiper-image-wrapper aspect-video rounded-xl relative ">
//                     <Image
//                         src="/hero2.jpg"
//                         alt="Banner 2"
//                         fill
//                         style={{ objectFit: 'cover' }}
//                         sizes="(max-width: 1200px) 100vw, 1200px"
//                     />
//                 </div>
//             </SwiperSlide>
//             <SwiperSlide>
//                 {/* 1. Add a wrapper div with a class for styling.
//                   2. Make the wrapper position: relative for 'fill' to work.
//                 */}
//                 <div className="swiper-image-wrapper relative aspect-video ">
//                     <Image
//                         src="/hero1.jpg"
//                         alt="Banner 1"
//                         fill // 👈 Use 'fill' instead of fixed width/height
//                         priority // Optional: For the first image, if it's above the fold
//                         style={{ objectFit: 'cover' }} // 👈 Ensures the image covers the container
//                         sizes="(max-width: 1200px) 100vw, 1200px" // Optimization for screen sizes
//                     />
//                 </div>
//             </SwiperSlide>
//             <SwiperSlide>
//                 <div className="swiper-image-wrapper aspect-video rounded-xl relative ">
//                     <Image
//                         src="/hero2.jpg"
//                         alt="Banner 2"
//                         fill
//                         style={{ objectFit: 'cover' }}
//                         sizes="(max-width: 1200px) 100vw, 1200px"
//                     />
//                 </div>
//             </SwiperSlide>
//             <SwiperSlide>
//                 <div className="swiper-image-wrapper relative aspect-video">
//                     <Image
//                         src="/hero3.jpg"
//                         alt="Banner 3"
//                         fill
//                         style={{ objectFit: 'cover' }}
//                         sizes="(max-width: 1200px) 100vw, 1200px"
//                     />
//                 </div>
//             </SwiperSlide>
//              <SwiperSlide>
//                 {/* 1. Add a wrapper div with a class for styling.
//                   2. Make the wrapper position: relative for 'fill' to work.
//                 */}
//                 <div className="swiper-image-wrapper relative aspect-video ">
//                     <Image
//                         src="/hero1.jpg"
//                         alt="Banner 1"
//                         fill // 👈 Use 'fill' instead of fixed width/height
//                         priority // Optional: For the first image, if it's above the fold
//                         style={{ objectFit: 'cover' }} // 👈 Ensures the image covers the container
//                         sizes="(max-width: 1200px) 100vw, 1200px" // Optimization for screen sizes
//                     />
//                 </div>
//             </SwiperSlide>
//         </Swiper>
//     );
// }
