import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import banner1 from '@/assets/banner1.jpg';
import banner2 from '@/assets/banner2.jpg';
import banner3 from '@/assets/banner3.jpg';
import { Button } from '@/components/ui/button';

const banners = [
  { image: banner1, title: 'Exquisite Diamond Collection', subtitle: '18K Gold Elegance' },
  { image: banner2, title: 'Timeless Rings', subtitle: 'Celebrate Every Moment' },
  { image: banner3, title: 'Luxury Bracelets', subtitle: 'Crafted with Precision' },
];

const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[700px] overflow-hidden rounded-2xl shadow-2xl">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16">
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-3 md:mb-4 animate-fade-in tracking-tight">
                {banner.title}
              </h2>
              <p className="text-lg sm:text-xl md:text-3xl text-muted-foreground mb-6 md:mb-8 animate-fade-in font-light">
                {banner.subtitle}
              </p>
              <Link to="/collections">
                <Button size="lg" className="w-fit group shadow-lg hover:shadow-xl transition-all">
                  <Sparkles className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                  Explore Collections
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-background/30 hover:bg-background/60 backdrop-blur-md border border-border/50 transition-all hover:scale-110"
        aria-label="Previous banner"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-background/30 hover:bg-background/60 backdrop-blur-md border border-border/50 transition-all hover:scale-110"
        aria-label="Next banner"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 backdrop-blur-sm bg-background/20 px-3 py-2 rounded-full">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-primary w-8' : 'bg-muted/60 w-2 hover:bg-muted'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
