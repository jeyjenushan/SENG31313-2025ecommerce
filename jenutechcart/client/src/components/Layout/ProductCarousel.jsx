import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Heart,
} from "lucide-react";

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);

  // Dummy product data
  const products = [
    {
      id: 1,
      name: "Smart LED Bulb Set",
      price: 89.99,
      originalPrice: 119.99,
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 124,
      category: "Smart Home",
      isNew: true,
    },
    {
      id: 2,
      name: "Premium Cookware Set",
      price: 299.99,
      originalPrice: 399.99,
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 89,
      category: "Cookware",
      isNew: false,
    },
    {
      id: 3,
      name: "Modern Office Chair",
      price: 449.99,
      originalPrice: 599.99,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 203,
      category: "Furniture",
      isNew: false,
    },
    {
      id: 4,
      name: "Robot Vacuum Cleaner",
      price: 199.99,
      originalPrice: 299.99,
      image:
        "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 156,
      category: "Cleaning",
      isNew: true,
    },
    {
      id: 5,
      name: "Smart Thermostat",
      price: 179.99,
      originalPrice: 229.99,
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 78,
      category: "Smart Home",
      isNew: false,
    },
    {
      id: 6,
      name: "Dining Table Set",
      price: 799.99,
      originalPrice: 999.99,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 45,
      category: "Furniture",
      isNew: true,
    },
    {
      id: 7,
      name: "Professional Knife Set",
      price: 149.99,
      originalPrice: 199.99,
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 167,
      category: "Cookware",
      isNew: false,
    },
    {
      id: 8,
      name: "Steam Cleaner Pro",
      price: 259.99,
      originalPrice: 329.99,
      image:
        "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 92,
      category: "Cleaning",
      isNew: false,
    },
  ];

  const itemsPerView = 4;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-slate-600">
              Discover our best-selling items and latest arrivals
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Product Carousel */}
        <div
          ref={carouselRef}
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              width: `${(products.length / itemsPerView) * 100}%`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="w-full flex-shrink-0 px-3"
                style={{ width: `${100 / products.length}%` }}
              >
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {product.isNew && (
                        <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          New
                        </span>
                      )}
                      {product.originalPrice > product.price && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors duration-200">
                        <Heart className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full shadow-md transition-colors duration-200">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-slate-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-amber-800 transition-colors duration-200">
                      {product.name}
                    </h3>

                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-slate-900">
                        ${product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-slate-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 5000);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-amber-500 scale-110"
                  : "bg-amber-200 hover:bg-amber-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
