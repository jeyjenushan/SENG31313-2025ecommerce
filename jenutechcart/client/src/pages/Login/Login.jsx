import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Smartphone } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/auth.slice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data", formData);
    dispatch(loginUser(formData));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1200')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-slate-900/70 to-black/80 backdrop-blur-sm"></div>

      {/* Transparent Smart Product Elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <img
          src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=300"
          alt="Smart table"
          className="w-32 h-32 object-cover rounded-lg"
        />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <img
          src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300"
          alt="Smart fan"
          className="w-40 h-40 object-cover rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          {/* Login Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-amber-200/20">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Smartphone className="w-10 h-10 text-amber-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-white/80">Sign in to your SmartHome account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-300/80 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-amber-200/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-300/80 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-amber-200/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-300/80 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-800 hover:bg-amber-900 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-transparent"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-white/80">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors duration-200"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
