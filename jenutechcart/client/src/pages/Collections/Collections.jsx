import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { fetchProductsByFilters } from "../../redux/store/product.slice";
import FilterSideBar from "../../components/Products/FilterSidebar";
import ProductGrid from "../../components/Products/ProductGrid";
import SortOptions from "../../components/Products/SortOptions";

const CollectionPage = () => {
  const { collections } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries(searchParams.entries());
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  /*
  useEffect(() => {
    dispatch(fetchProductsByFilters({ collections, ...queryParams }));
  }, [dispatch, collections, searchParams]);
*/
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brown-800 capitalize">
            {collections || "All Products"}
          </h1>
          <p className="text-brown-600 mt-2">
            Discover premium smart home products for your modern living
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter button */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <button
              onClick={toggleSidebar}
              className="flex items-center gap-2 px-4 py-2 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-colors"
            >
              <FaFilter />
              <span>Filters</span>
            </button>
            <SortOptions />
          </div>

          {/* Filter sidebar */}
          <div
            ref={sidebarRef}
            className={`${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } 
            fixed inset-y-0 z-50 left-0 w-72 bg-white shadow-xl overflow-y-auto
            transition-transform duration-300 lg:static lg:translate-x-0 lg:w-1/4
            `}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-brown-800">Filters</h3>
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden text-brown-700 hover:text-brown-900"
                >
                  <IoClose size={24} />
                </button>
              </div>
              <FilterSideBar />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-grow lg:w-3/4">
            {/* Desktop Sort Options */}
            <div className="hidden lg:block mb-6">
              <SortOptions />
            </div>

            {/* Product Grid */}
            <ProductGrid products={products} loading={loading} error={error} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
