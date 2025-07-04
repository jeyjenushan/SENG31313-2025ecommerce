import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowLeft,
  Smartphone,
  Camera,
  Upload,
  Loader2,
} from "lucide-react";
import { registerUser } from "../../redux/slices/auth.slice";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [image, setimage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!", {
        description: "Please make sure both passwords are identical.",
        duration: 4000,
      });
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password too short!", {
        description: "Password must be at least 6 characters long.",
        duration: 4000,
      });
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Name is required!", {
        description: "Please enter your full name.",
        duration: 4000,
      });
      return;
    }

    // Start loading
    setIsLoading(true);

    // Show loading toast
    const loadingToastId = toast.loading("Creating your account...", {
      description: "Please wait while we set up your SmartHome account.",
    });

    try {
      const resultAction = await dispatch(registerUser(formData));

      if (registerUser.fulfilled.match(resultAction)) {
        toast.dismiss(loadingToastId);
        toast.success("Account created successfully! 🎉", {
          description: "Welcome to SmartHome! You can now start shopping.",
          duration: 5000,
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          image: "",
        });
        setimage(null);
      } else {
        toast.error("Registration failed!", {
          description: "Something went wrong. Please try again.",
          duration: 4000,
        });
      }
    } catch (error) {
      // Dismiss loading toast and show error
      toast.dismiss(loadingToastId);
      toast.error("Registration failed!", {
        description: "Something went wrong. Please try again.",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large!", {
          description: "Please select an image smaller than 5MB.",
          duration: 4000,
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast.error("Invalid file type!", {
          description: "Please select a valid image file (JPG, PNG, etc.).",
          duration: 4000,
        });
        return;
      }

      setFormData({
        ...formData,
        image: file,
      });

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setimage(event.target?.result);
      };
      reader.readAsDataURL(file);

      // Success toast for image upload
      toast.success("Profile picture uploaded!", {
        description: "Your profile image looks great!",
        duration: 3000,
      });
    }
  };

  const removeImage = () => {
    setimage(null);
    setFormData({
      ...formData,
      image: null,
    });

    toast.info("Profile picture removed", {
      description: "You can upload a new one anytime.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-slate-900/70 to-black/80 backdrop-blur-sm"></div>

      {/* Transparent Smart Product Elements */}
      <div className="absolute top-16 right-8 opacity-20">
        <img
          src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=300"
          alt="Smart coffee table"
          className="w-36 h-36 object-cover rounded-lg"
        />
      </div>
      <div className="absolute bottom-16 left-8 opacity-20">
        <img
          src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=300"
          alt="Modern sofa"
          className="w-44 h-44 object-cover rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-8">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          {/* Registration Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-amber-200/20">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-4">
                <Smartphone className="w-10 h-10 text-amber-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Create Account
              </h1>
              <p className="text-white/80">
                Join SmartHome for smart living solutions
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Profile Image Upload */}
              <div className="text-center">
                <label className="block text-white/90 text-sm font-medium mb-3">
                  Profile Picture
                </label>
                <div className="flex flex-col items-center">
                  {image ? (
                    <div className="relative">
                      <img
                        src={image}
                        alt="Profile preview"
                        className="w-20 h-20 rounded-full object-cover border-3 border-amber-400/50 shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        disabled={isLoading}
                        className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition-colors duration-200"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-dashed border-amber-300/50 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-amber-300/70" />
                    </div>
                  )}
                  <label className="mt-3 cursor-pointer">
                    <span className="inline-flex items-center px-3 py-1.5 bg-amber-800/80 hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm rounded-lg transition-colors duration-200">
                      <Upload className="w-4 h-4 mr-1.5" />
                      {image ? "Change Photo" : "Upload Photo"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isLoading}
                      className="hidden"
                    />
                  </label>
                  <p className="text-white/60 text-xs mt-1">Max 5MB, JPG/PNG</p>
                </div>
              </div>

              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-300/80 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-amber-200/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

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
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-amber-200/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    disabled={isLoading}
                    className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-amber-200/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-300/80 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-300/80 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-amber-200/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-300/80 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  disabled={isLoading}
                  className="mr-3 mt-1 rounded border-amber-200/30 bg-white/10 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
                <label htmlFor="terms" className="text-white/80 text-sm">
                  I agree to the{" "}
                  <Link
                    to=""
                    className="text-amber-400 hover:text-amber-300 transition-colors duration-200"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to=""
                    className="text-amber-400 hover:text-amber-300 transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-800 hover:bg-amber-900 disabled:bg-amber-800/50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-transparent flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/80">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors duration-200"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
