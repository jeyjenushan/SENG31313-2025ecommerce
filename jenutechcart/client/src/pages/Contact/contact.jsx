import  { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-8">
              Get in Touch
            </h2>

            <div className="space-y-6 mb-8">
              <div className="border border-amber-200 bg-white rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-amber-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-amber-900">Phone</h3>
                      <p className="text-amber-700">+1 (555) 123-4567</p>
                      <p className="text-sm text-amber-600">
                        Monday - Friday, 9AM - 6PM EST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-amber-200 bg-white rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-amber-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-amber-900">Email</h3>
                      <p className="text-amber-700">support@smarthome.com</p>
                      <p className="text-sm text-amber-600">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-amber-200 bg-white rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-amber-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-amber-900">Address</h3>
                      <p className="text-amber-700">
                        123 Smart Street
                        <br />
                        Tech City, TC 12345
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-amber-200 bg-white rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-amber-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-amber-900">
                        Business Hours
                      </h3>
                      <div className="text-amber-700">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="border border-amber-200 bg-white rounded-lg overflow-hidden">
              <div className="px-6 pt-6">
                <h3 className="text-xl font-bold text-amber-900">
                  Send us a Message
                </h3>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-amber-800 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-amber-800 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-amber-800 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-amber-800 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="border border-amber-200 bg-white rounded-lg overflow-hidden mt-8">
              <div className="px-6 pt-6">
                <h3 className="text-xl font-bold text-amber-900">
                  Frequently Asked Questions
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="font-semibold text-amber-800">
                    What's your return policy?
                  </h4>
                  <p className="text-amber-600 text-sm">
                    We offer a 30-day return policy on all products in original
                    condition.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800">
                    Do you offer installation services?
                  </h4>
                  <p className="text-amber-600 text-sm">
                    Yes, we partner with certified installers in most major
                    cities.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800">
                    How long is shipping?
                  </h4>
                  <p className="text-amber-600 text-sm">
                    Standard shipping is 3-5 business days, express shipping is
                    1-2 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
