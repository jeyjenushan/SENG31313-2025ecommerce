import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";


import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FilterSideBar from "../../components/Products/FilterSidebar";
import ProductGrid from "../../components/Products/ProductGrid";
import SortOptions from "../../components/Products/SortOptions";
import { fetchProductsByFilters } from "../../redux/slices/product.slice";

const CollectionPage = () => {
  const { collections } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries(searchParams.entries());
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collections, ...queryParams }));
  }, [dispatch, collections, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  const handleBackdropClick = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

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
              className="lg:hidden border border-gray-300 p-2 flex justify-center items-center rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <FaFilter className="mr-2" />
              <span>Filters</span>
            </button>
            <SortOptions />
          </div>

          {/* Backdrop overlay for mobile */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 lg:hidden"
              onClick={handleBackdropClick}
            />
          )}

          {/* Filter sidebar */}
          <div
            ref={sidebarRef}
            className={`${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } 
            fixed inset-y-0 z-50 left-0 w-72 shadow-xl overflow-y-auto
            transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-20 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto lg:shadow-none bg-gray-50
            `}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-amber-800">Filters</h3>
              </div>
              <FilterSideBar />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-grow lg:w-3/4">
            <div className="hidden lg:block mb-6">
              <SortOptions />
            </div>

            {/* Product Grid */}
            {products.length > 0 ? (
              <ProductGrid
                products={products}
                loading={loading}
                error={error}
              />
            ) : (
              <h3
                className="text-brown-700 hover:text-brown-900 fixed top-1/2 right-0 transform -translate-y-1/2 w-3/4  pr-10 text-xl font-semibold text-center p4"
                style={{ backgroundColor: "#fdf5e6" }}
              >
                No Products available in this condition
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
