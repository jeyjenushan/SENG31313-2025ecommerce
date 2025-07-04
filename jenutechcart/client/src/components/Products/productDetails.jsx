import { useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { Link } from "react-router-dom";

// Dummy data for the product
const product = {
  _id: "1",
  name: "Modern Wooden Coffee Table",
  description:
    "Handcrafted wooden coffee table with sleek modern design. Perfect for contemporary living spaces. Features a durable finish that resists scratches and stains.",
  category: "Furniture",
  material: "Solid Oak Wood",
  room: "Living Room",
  brand: "FurniCraft",
  price: 199.99,
  originalPrice: 249.99,
  rating: 4.5,
  numReviews: 32,
  images: [
    {
      url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
      altText: "Wooden coffee table front view",
    },
    {
      url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c",
      altText: "Wooden coffee table side view",
    },
    {
      url: "https://images.unsplash.com/photo-1583845112203-454c5e27a055",
      altText: "Wooden coffee table top view",
    },
    {
      url: "https://images.unsplash.com/photo-1592078615290-033ee584e267",
      altText: "Wooden coffee table in living room",
    },
  ],
  countInStock: 15,
  colors: ["#8B4513", "#000000"], // Brown and Black
  dimensions: "120cm × 60cm × 45cm",
  weight: 25.5,
  countryOfOrigin: "United States",
  warranty: "2 years",
};

// Dummy similar products
const similarProducts = [
  {
    _id: "2",
    name: "Minimalist Side Table",
    price: 149.99,
    images: [
      {
        url: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9",
        altText: "Minimalist side table",
      },
    ],
  },
  {
    _id: "3",
    name: "Modern Console Table",
    price: 299.99,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
        altText: "Modern console table",
      },
    ],
  },
  {
    _id: "4",
    name: "Industrial Coffee Table",
    price: 229.99,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
        altText: "Industrial coffee table",
      },
    ],
  },
  {
    _id: "5",
    name: "Scandinavian End Table",
    price: 179.99,
    images: [
      {
        url: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6",
        altText: "Scandinavian end table",
      },
    ],
  },
];

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(product.images[0].url);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    setIsButtonDisabled(true);
    toast.success(`${product.name} added to cart!`, {
      duration: 1000,
    });
    setTimeout(() => setIsButtonDisabled(false), 1000);
  };

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="text-sm font-medium text-gray-700 hover:text-amber-600"
              >
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link
                  to="/furniture"
                  className="text-sm font-medium text-gray-700 hover:text-amber-600"
                >
                  Furniture
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm font-medium text-amber-600">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Product Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image Gallery */}
            <div className="md:w-1/2 p-6">
              <div className="hidden md:flex flex-col space-y-4 mr-6 float-left">
                {product.images.map((image, index) => (
                  <img
                    src={image.url}
                    key={index}
                    alt={image.altText}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                      mainImage === image.url
                        ? "border-amber-500"
                        : "border-gray-200"
                    }`}
                    onClick={() => setMainImage(image.url)}
                  />
                ))}
              </div>

              {/* Main Image */}
              <div className="md:ml-28">
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="w-full h-96 object-contain rounded-lg"
                />
              </div>

              {/* Mobile Thumbnails */}
              <div className="md:hidden flex space-x-4 mt-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <img
                    src={image.url}
                    key={index}
                    alt={image.altText}
                    className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                      mainImage === image.url
                        ? "border-amber-500"
                        : "border-gray-200"
                    }`}
                    onClick={() => setMainImage(image.url)}
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-6 border-l border-gray-100">
              <div className="mb-4">
                <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {product.brand}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                  {product.name}
                </h1>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-amber-400"
                            : "text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                    <span className="text-gray-600 text-sm ml-1">
                      {product.rating} ({product.numReviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through mr-2">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="ml-2 text-sm bg-red-100 text-red-800 px-2 py-0.5 rounded">
                    {Math.round(
                      (1 - product.price / product.originalPrice) * 100
                    )}
                    % OFF
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Color
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-amber-500"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Quantity
                </h3>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange("minus")}
                    className="p-2 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="px-4 py-2 border-t border-b border-gray-300 bg-white text-center w-12">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("plus")}
                    className="p-2 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {product.countInStock > 0
                    ? `${product.countInStock} available in stock`
                    : "Out of stock"}
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`w-full py-3 px-4 rounded-md font-medium text-white ${
                  isButtonDisabled
                    ? "bg-amber-400 cursor-not-allowed"
                    : "bg-amber-600 hover:bg-amber-700"
                } transition-colors shadow-sm`}
              >
                {isButtonDisabled ? "Adding..." : "Add to Cart"}
              </button>

              {/* Product Details */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Product Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Category</p>
                    <p className="text-gray-900">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Material</p>
                    <p className="text-gray-900">{product.material}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Dimensions</p>
                    <p className="text-gray-900">{product.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Weight</p>
                    <p className="text-gray-900">{product.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Origin</p>
                    <p className="text-gray-900">{product.countryOfOrigin}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Warranty</p>
                    <p className="text-gray-900">{product.warranty}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            You May Also Like
          </h2>
          <ProductGrid
            products={similarProducts}
            loading={false}
            error={null}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
