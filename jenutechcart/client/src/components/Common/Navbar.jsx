import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Smartphone,
  Search,
  ShoppingCart,
  User,
  LogOut,
  LogIn,
  UserPlus,
  X,
  Menu,
  Home,
  Package,
  Info,
  Phone,
} from "lucide-react";

import {
  getProfileInformation,
  logoutUser,
} from "../../redux/slices/auth.slice";
import CartSidebar from "../Cart/CartSidebar";
import {
  fetchProductsByFilters,
  setFilters,
} from "../../redux/slices/product.slice";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const profileDropdownRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  //USE SELECTOR USING
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated, isInitialized } = useSelector(
    (state) => state.auth
  );

  // Replace your current initialization useEffect with this:
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser && !user) {
      dispatch(getProfileInformation());
    }
  }, [dispatch, user]);

  //Cart Item Count
  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Products", path: "/collections/all", icon: Package },
    { name: "About", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser && !user) {
        try {
          await dispatch(getProfileInformation()).unwrap();
        } catch (error) {
          localStorage.removeItem("userInfo");
          dispatch(resetAuthState());
        }
      }
    };

    initializeAuth();
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsProfileDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      dispatch(setFilters({ search: searchQuery }));
      dispatch(fetchProductsByFilters({ search: searchQuery }));
      navigate(`/collections/all?search=${searchQuery}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const isActivePage = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md border-b border-amber-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <Smartphone className="w-8 h-8 text-amber-800 group-hover:text-amber-900 transition-colors duration-200" />
              <span className="text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors duration-200">
                SmartHome
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePage(item.path);

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? "text-amber-800"
                        : "text-slate-700 hover:text-amber-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>

                    {/* Animated underline */}
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-amber-800 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div ref={searchRef} className="relative">
                {isSearchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-48 px-3 py-2 text-sm border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="ml-2 p-1 text-slate-500 hover:text-slate-700 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 text-slate-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-all duration-200"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-all duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && user && (
                  <span className="absolute -top-1 -right-1 bg-amber-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </button>

              {/* Profile / Auth */}
              <div ref={profileDropdownRef} className="relative">
                {isAuthenticated && user ? (
                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="flex items-center space-x-2 p-1 rounded-lg hover:bg-amber-50 transition-all duration-200"
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover border-2 border-amber-200"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-amber-800" />
                      </div>
                    )}
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link
                      to="/login"
                      className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-amber-800 transition-colors duration-200"
                    >
                      <LogIn className="w-4 h-4" />
                      <span className="hidden sm:inline">Login</span>
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center space-x-1 px-3 py-2 text-sm font-medium bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors duration-200"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span className="hidden sm:inline">Register</span>
                    </Link>
                  </div>
                )}

                {/* Profile Dropdown */}
                {isAuthenticated && isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-amber-200/50 py-2 z-50">
                    <div className="px-4 py-2 border-b border-amber-100">
                      <p className="text-sm font-medium text-slate-900">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-all duration-200"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-amber-200/50 py-4">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePage(item.path);

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-amber-800 bg-amber-50"
                          : "text-slate-700 hover:text-amber-800 hover:bg-amber-50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
