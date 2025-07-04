import React from "react";
import { Link } from "react-router-dom";
import { Home, Users, Award, ShoppingBag } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-amber-900">
                About SmartHome
              </h1>
              <p className="text-amber-700 mt-2">
                Your trusted partner in smart living
              </p>
            </div>
            <Link to="/">
              <button className="border border-amber-300 text-amber-700 hover:bg-amber-100 px-4 py-2 rounded-md transition-colors">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-900 mb-6">
            Transforming Homes, Enhancing Lives
          </h2>
          <p className="text-lg text-amber-700 max-w-3xl mx-auto leading-relaxed">
            At SmartHome, we believe that technology should make your life
            easier, more comfortable, and more efficient. We're passionate about
            bringing the latest in smart home technology to families everywhere,
            creating spaces that are not just houses, but intelligent homes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="border border-amber-200 bg-white rounded-lg overflow-hidden">
            <div className="p-6 text-center">
              <Home className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                Smart Solutions
              </h3>
              <p className="text-amber-600">
                Cutting-edge technology for modern homes
              </p>
            </div>
          </div>

          <div className="border border-amber-200 bg-white rounded-lg overflow-hidden">
            <div className="p-6 text-center">
              <Users className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                Expert Support
              </h3>
              <p className="text-amber-600">
                Dedicated team to help you every step of the way
              </p>
            </div>
          </div>

          <div className="border border-amber-200 bg-white rounded-lg overflow-hidden">
            <div className="p-6 text-center">
              <Award className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                Quality Assured
              </h3>
              <p className="text-amber-600">
                Premium products from trusted manufacturers
              </p>
            </div>
          </div>

          <div className="border border-amber-200 bg-white rounded-lg overflow-hidden">
            <div className="p-6 text-center">
              <ShoppingBag className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                Easy Shopping
              </h3>
              <p className="text-amber-600">
                Seamless online experience with fast delivery
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-lg shadow-sm border border-amber-200 p-8 mb-12">
          <h3 className="text-2xl font-bold text-amber-900 mb-6">Our Story</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-amber-700 mb-4">
                Founded in 2020, SmartHome began with a simple mission: to make
                smart home technology accessible to everyone. Our founders, tech
                enthusiasts and home automation experts, recognized that while
                smart home technology was advancing rapidly, many consumers
                found it overwhelming and difficult to implement.
              </p>
              <p className="text-amber-700">
                We started by carefully curating a selection of the best smart
                home products, focusing on reliability, ease of use, and genuine
                value for homeowners.
              </p>
            </div>
            <div>
              <p className="text-amber-700 mb-4">
                Today, we've helped thousands of families transform their homes
                into smart, efficient, and secure spaces. Our team of experts
                continues to research and test the latest innovations, ensuring
                that every product we offer meets our high standards for quality
                and performance.
              </p>
              <p className="text-amber-700">
                We're not just a retailer – we're your partner in creating the
                smart home of your dreams.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-amber-200 bg-white rounded-lg overflow-hidden">
            <div className="px-6 pt-6">
              <h3 className="text-xl font-bold text-amber-900">Our Mission</h3>
            </div>
            <div className="p-6">
              <p className="text-amber-700">
                To democratize smart home technology by providing carefully
                curated, high-quality products with exceptional customer
                support, making it easy for anyone to create a more comfortable,
                efficient, and secure home.
              </p>
            </div>
          </div>

          <div className="border border-amber-200 bg-white rounded-lg overflow-hidden">
            <div className="px-6 pt-6">
              <h3 className="text-xl font-bold text-amber-900">Our Vision</h3>
            </div>
            <div className="p-6">
              <p className="text-amber-700">
                To be the leading destination for smart home solutions, where
                innovation meets simplicity, and where every customer feels
                confident in their smart home journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
