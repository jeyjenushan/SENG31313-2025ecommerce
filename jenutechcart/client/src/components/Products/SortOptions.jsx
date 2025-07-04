import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    if (sortBy) {
      searchParams.set("sortBy", sortBy);
    } else {
      searchParams.delete("sortBy");
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center">
      <label htmlFor="sort" className="mr-2 text-brown-700 font-medium">
        Sort by:
      </label>
      <select
        id="sort"
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}
        className="border border-brown-300 rounded-md px-3 py-2 text-brown-800 bg-white focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
      >
        <option value="">Featured</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
        <option value="newest">Newest Arrivals</option>
      </select>
    </div>
  );
};

export default SortOptions;
