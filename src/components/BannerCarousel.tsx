// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
// import { Link } from "react-router-dom";
// import banner1 from "@/assets/banner1.jpg";
// import banner2 from "@/assets/banner2.jpg";
// import banner3 from "@/assets/banner3.jpg";
// import { Button } from "@/components/ui/button";

// // Define interface for Banner data
// interface BannerData {
//   id?: number | string;
//   image: string;
//   title: string;
//   subtitle: string;
// }

// // Fallback default banners
// const DEFAULT_BANNERS: BannerData[] = [
//   {
//     image: banner1,
//     title: "Exquisite Diamond Collection",
//     subtitle: "18K Gold Elegance",
//   },
//   {
//     image: banner2,
//     title: "Timeless Rings",
//     subtitle: "Celebrate Every Moment",
//   },
//   {
//     image: banner3,
//     title: "Luxury Bracelets",
//     subtitle: "Crafted with Precision",
//   },
// ];

// const BannerCarousel = () => {
//   const [banners, setBanners] = useState<BannerData[]>(DEFAULT_BANNERS);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Helper to ensure image URL is absolute
//   const getBannerUrl = (imagePath: string) => {
//     if (!imagePath) return "";
//     if (
//       imagePath.startsWith("http") ||
//       imagePath.startsWith("data:") ||
//       imagePath.startsWith("/src")
//     ) {
//       return imagePath;
//     }
//     // Prepend backend URL to relative paths
//     const baseUrl = "http://127.0.0.1:8000";
//     const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
//     return `${baseUrl}${cleanPath}`;
//   };

//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         console.log("Fetching banners from API...");
//         const response = await fetch("http://127.0.0.1:8000/api/banners/");

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const backendBanners = await response.json();
//         console.log("Banners received:", backendBanners);

//         if (Array.isArray(backendBanners) && backendBanners.length > 0) {
//           // Create a new array combining backend banners with defaults if needed
//           const combinedBanners = [...backendBanners];

//           // If backend provided fewer than 3 banners, fill remaining slots with defaults
//           if (combinedBanners.length < 3) {
//             for (let i = combinedBanners.length; i < 3; i++) {
//               // Use modulo to cycle through defaults if we run out
//               combinedBanners.push(DEFAULT_BANNERS[i % DEFAULT_BANNERS.length]);
//             }
//           }

//           setBanners(combinedBanners);
//         } else {
//           console.log("No active banners found in backend, using defaults.");
//         }
//       } catch (error) {
//         console.error(
//           "Failed to fetch banners (Check CORS or Network):",
//           error
//         );
//         // Keep defaults
//       }
//     };

//     fetchBanners();
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [banners.length]);

//   const goToPrevious = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
//     );
//   };

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
//   };

//   if (!banners.length) return null;

//   return (
//     <div className="relative w-full h-[500px] md:h-[700px] overflow-hidden rounded-2xl shadow-2xl">
//       {banners.map((banner, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-all duration-1000 ${
//             index === currentIndex
//               ? "opacity-100 scale-100"
//               : "opacity-0 scale-105"
//           }`}
//         >
//           {/* Image Layer */}
//           <img
//             src={getBannerUrl(banner.image)}
//             alt={banner.title}
//             className="w-full h-full object-cover object-center"
//             onError={(e) => {
//               console.error(`Failed to load image: ${banner.image}`);
//               e.currentTarget.src = banner1; // Fallback if image link is broken
//             }}
//           />

//           {/* Dark Gradient Overlay for text readability */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

//           {/* Text Content Layer */}
//           <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16">
//             <div className="max-w-3xl">
//               <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-3 md:mb-4 animate-fade-in tracking-tight drop-shadow-lg">
//                 {banner.title}
//               </h2>
//               <p className="text-lg sm:text-xl md:text-3xl text-gray-200 mb-6 md:mb-8 animate-fade-in font-light drop-shadow-md">
//                 {banner.subtitle}
//               </p>

//               {/* Button is now explicitly part of every slide */}
//               <Link to="/collections">
//                 <Button
//                   size="lg"
//                   className="w-fit group shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90 text-primary-foreground border-none"
//                 >
//                   <Sparkles className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
//                   Explore Collections
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))}

//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={goToPrevious}
//         className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110"
//         aria-label="Previous banner"
//       >
//         <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
//       </Button>

//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={goToNext}
//         className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110"
//         aria-label="Next banner"
//       >
//         <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
//       </Button>

//       <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 backdrop-blur-sm bg-black/20 px-3 py-2 rounded-full">
//         {banners.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`h-2 rounded-full transition-all ${
//               index === currentIndex
//                 ? "bg-primary w-8"
//                 : "bg-white/50 w-2 hover:bg-white"
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BannerCarousel;
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner2.jpg";
import banner3 from "@/assets/banner3.jpg";
import { Button } from "@/components/ui/button";

// Define interface for Banner data
interface BannerData {
  id?: number | string;
  image: string;
  title: string;
  subtitle: string;
}

// Fallback default banners
const DEFAULT_BANNERS: BannerData[] = [
  {
    image: banner1,
    title: "Exquisite Diamond Collection",
    subtitle: "18K Gold Elegance",
  },
  {
    image: banner2,
    title: "Timeless Rings",
    subtitle: "Celebrate Every Moment",
  },
  {
    image: banner3,
    title: "Luxury Bracelets",
    subtitle: "Crafted with Precision",
  },
];

const BannerCarousel = () => {
  const [banners, setBanners] = useState<BannerData[]>(DEFAULT_BANNERS);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Swipe state
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Helper to ensure image URL is absolute
  const getBannerUrl = (imagePath: string) => {
    if (!imagePath) return "";
    if (
      imagePath.startsWith("http") ||
      imagePath.startsWith("data:") ||
      imagePath.startsWith("/src")
    ) {
      return imagePath;
    }
    const baseUrl = "https://api.finetaraa.com";
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return `${baseUrl}${cleanPath}`;
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("https://api.finetaraa.com/api/banners/");
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const backendBanners = await response.json();

        if (Array.isArray(backendBanners) && backendBanners.length > 0) {
          const combinedBanners = [...backendBanners];
          if (combinedBanners.length < 3) {
            for (let i = combinedBanners.length; i < 3; i++) {
              combinedBanners.push(DEFAULT_BANNERS[i % DEFAULT_BANNERS.length]);
            }
          }
          setBanners(combinedBanners);
        }
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, banners.length]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  // Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      // Threshold of 50px
      if (diff > 0) goToNext(); // Swipe Left
      else goToPrevious(); // Swipe Right
    }
  };

  if (!banners.length) return null;

  return (
    <div
      className="relative w-full h-[500px] md:h-[700px] overflow-hidden rounded-2xl shadow-2xl touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          {/* Image Layer */}
          <img
            src={getBannerUrl(banner.image)}
            alt={banner.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.currentTarget.src = banner1;
            }}
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Text Content Layer */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16">
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-3 md:mb-4 animate-fade-in tracking-tight drop-shadow-lg leading-tight">
                {banner.title}
              </h2>
              <p className="text-lg sm:text-xl md:text-3xl text-gray-200 mb-6 md:mb-8 animate-fade-in font-light drop-shadow-md">
                {banner.subtitle}
              </p>

              <Link to="/collections">
                <Button
                  size="lg"
                  className="w-fit group shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90 text-primary-foreground border-none"
                >
                  <Sparkles className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                  Explore Collections
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons - Added "hidden md:flex" to hide on mobile */}
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevious}
        className="hidden md:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110"
        aria-label="Previous banner"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={goToNext}
        className="hidden md:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110"
        aria-label="Next banner"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 backdrop-blur-sm bg-black/20 px-3 py-2 rounded-full">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-white/50 w-2 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
