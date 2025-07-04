import { Package, ChefHat, Home, Sparkles } from "lucide-react";

const Categories = () => {
  const categories = [
    {
      name: "Furniture",
      icon: Package,
      description: "Modern & stylish furniture for every room",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      color: "from-amber-400 to-orange-500",
    },
    {
      name: "Cookware",
      icon: ChefHat,
      description: "Premium kitchen essentials & cookware",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      color: "from-amber-500 to-yellow-600",
    },
    {
      name: "Smart Home",
      icon: Home,
      description: "Intelligent automation for modern living",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      color: "from-amber-600 to-amber-700",
    },
    {
      name: "Cleaning",
      icon: Sparkles,
      description: "Advanced cleaning solutions & tools",
      image:
        "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop",
      color: "from-yellow-400 to-amber-500",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover our carefully curated collections designed to enhance your
            lifestyle
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Category Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}
                  ></div>

                  {/* Icon */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-amber-800 transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    {category.description}
                  </p>

                  {/* CTA Button */}
                  <button className="w-full bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                    Explore {category.name}
                  </button>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-300 transition-colors duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
