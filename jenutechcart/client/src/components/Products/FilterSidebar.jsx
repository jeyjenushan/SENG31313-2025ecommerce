import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    room: "",
    material: "",
    color: "",
    brand: [],
    minPrice: 0,
    maxPrice: 1000,
  });

  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categories = ["Furniture", "Cookware", "Smart Home", "Cleaning"];
  const rooms = ["Living Room", "Bedroom", "Kitchen", "Bathroom"];
  const materials = ["Wood", "Steel", "Ceramic", "Glass", "Plastic", "Bamboo"];
  const colors = ["Brown", "Black", "White", "Silver", "Gray", "Beige"];
  const brands = ["FurniCraft", "ChefMaster", "SmartLiving", "EcoClean"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      room: params.room || "",
      material: params.material || "",
      color: params.color || "",
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 1000,
    });
    setPriceRange([
      Number(params.minPrice) || 0,
      Number(params.maxPrice) || 1000,
    ]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e, index) => {
    const newValue = Number(e.target.value);
    const newPriceRange = [...priceRange];
    newPriceRange[index] = newValue;
    setPriceRange(newPriceRange);

    // Update filters only when user stops sliding (you might want to debounce this)
    const newFilters = {
      ...filters,
      minPrice: newPriceRange[0],
      maxPrice: newPriceRange[1],
    };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h4 className="text-lg font-semibold text-brown-800 mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                onChange={handleFilterChange}
                checked={filters.category === category}
                className="mr-2 h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300"
              />
              <span className="text-brown-700">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Room Filter */}
      <div>
        <h4 className="text-lg font-semibold text-brown-800 mb-3">Room</h4>
        <div className="space-y-2">
          {rooms.map((room) => (
            <div key={room} className="flex items-center">
              <input
                type="radio"
                name="room"
                value={room}
                onChange={handleFilterChange}
                checked={filters.room === room}
                className="mr-2 h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300"
              />
              <span className="text-brown-700">{room}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Material Filter */}
      <div>
        <h4 className="text-lg font-semibold text-brown-800 mb-3">Material</h4>
        <div className="space-y-2">
          {materials.map((material) => (
            <div key={material} className="flex items-center">
              <input
                type="radio"
                name="material"
                value={material}
                onChange={handleFilterChange}
                checked={filters.material === material}
                className="mr-2 h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300"
              />
              <span className="text-brown-700">{material}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h4 className="text-lg font-semibold text-brown-800 mb-3">Color</h4>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border-2 transition-all
                ${
                  filters.color === color
                    ? "border-brown-600 scale-110"
                    : "border-gray-200"
                }
              `}
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            ></button>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h4 className="text-lg font-semibold text-brown-800 mb-3">Brand</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center">
              <input
                type="checkbox"
                name="brand"
                value={brand}
                onChange={handleFilterChange}
                checked={filters.brand.includes(brand)}
                className="mr-2 h-4 w-4 text-brown-600 focus:ring-brown-500 border-brown-300 rounded"
              />
              <span className="text-brown-700">{brand}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="text-lg font-semibold text-brown-800 mb-3">
          Price Range
        </h4>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-brown-700">${priceRange[0]}</span>
            <span className="text-brown-700">${priceRange[1]}</span>
          </div>
          <div className="flex space-x-4">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-full h-2 bg-brown-200 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-full h-2 bg-brown-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
