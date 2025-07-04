import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { fetchArrivalProducts } from "../../redux/slices/product.slice";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);
  const { arrivalsProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const itemsPerView = 4;
  const maxIndex = Math.max(0, arrivalsProducts.length - itemsPerView);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    dispatch(fetchArrivalProducts());

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
              New Arrival Products
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
              width: `${(arrivalsProducts.length / itemsPerView) * 100}%`,
            }}
          >
            {arrivalsProducts.map((product) => (
              <div
                className="w-full flex-shrink-0 px-3"
                style={{ width: `${100 / arrivalsProducts.length}%` }}
              >
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="block"
                >
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
                      <img
                        src={product.images[0].url}
                        alt={product.images[0].altText || product.name}
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
                            {product.rating} ({product.num_reviews})
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
                </Link>
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
