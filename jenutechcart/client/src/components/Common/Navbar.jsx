import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
const Navbar = () => {
  return (
    <nav className="container mx-auto flex items-center justify-between py-4 px-6">
      {/*Left Logo */}
      <div>
        <Link to="/" className="text-2xl font-medium">
          ShopSmart
        </Link>
      </div>

      {/*Center Navigation Tools */}
      <div className="hidden md:flex gap-3">
        <Link
          to="/"
          className="text-gray-700 hover:text-black text-sm font-medium
          uppercase
          "
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-gray-700 hover:text-black text-sm font-medium
          uppercase
          "
        >
          About
        </Link>
        <Link
          to="/products"
          className="text-gray-700 hover:text-black text-sm font-medium
          uppercase
          "
        >
          Products
        </Link>
        <Link
          to="/contact"
          className="text-gray-700 hover:text-black text-sm font-medium
          uppercase
          "
        >
          Contact
        </Link>
      </div>

      {/*Right Side Icons */}
      <div className="flex items-center space-x-4">
        {/*User profile */}
        <Link to="/profile" className="hover:text-black">
          <HiOutlineUser className="h-6 w-6 text-gray-700" />
        </Link>

        {/*Cart */}
        <button>
          <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
        </button>
        {/*Search Bar */}
        <div className="overflow-hidden">
          <SearchBar />
        </div>

        {/*Mobile view */}
        <button className="md:hidden">
          <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/*Cart Drawer */}

      {/*Mobile application Navigation Bar */}
    </nav>
  );
};

export default Navbar;
