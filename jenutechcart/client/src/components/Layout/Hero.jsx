import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1200",
      alt: "Modern smart home living room",
      title: "Transform Your Home",
      subtitle:
        "Discover the future of smart living with our premium collection",
    },
    {
      url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200",
      alt: "Smart home automation",
      title: "Smart Solutions",
      subtitle: "Innovative technology for every room in your home",
    },
    {
      url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=1200",
      alt: "Connected home devices",
      title: "Connected Living",
      subtitle: "Experience seamless integration of all your smart devices",
    },
    {
      url: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1200",
      alt: "Modern home interior",
      title: "Modern Comfort",
      subtitle: "Elevate your lifestyle with intelligent home solutions",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const goToPrevious = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? heroImages.length - 1 : currentImageIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex(
      currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1
    );
  };

  const currentImage = heroImages[currentImageIndex];

  return (
    <div className="relative h-[600px] overflow-hidden bg-gradient-to-r from-amber-50 to-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentImage.url}
          alt={currentImage.alt}
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/70 to-amber-800/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            {currentImage.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-amber-100 animate-fade-in">
            {currentImage.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg">
              Shop Now
            </button>
            <button className="border-white text-white hover:bg-white hover:text-amber-800 px-8 py-3 text-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentImageIndex
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
