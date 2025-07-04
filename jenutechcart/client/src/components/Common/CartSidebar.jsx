import React, { useState } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";

const CartSidebar = ({ isOpen, onClose }) => {
  // Dummy cart data - replace with your actual state management later
  const [items, setItems] = useState([
    {
      id: "1",
      name: "Smart Coffee Table",
      price: 899,
      image:
        "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400",
      quantity: 1,
    },
    {
      id: "2",
      name: "Smart Fan Controller",
      price: 299,
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
      quantity: 2,
    },
  ]);

  // Calculate total from items
  const total = 3000;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
    } else {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setItems([]);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-amber-200/50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6 text-amber-800" />
              <h2 className="text-xl font-bold text-slate-900">
                Shopping Cart
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-slate-500 mb-6">
                  Add some products to get started!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-amber-50/50 rounded-lg border border-amber-200/30"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900">
                        {item.name}
                      </h3>
                      <p className="text-amber-800 font-semibold">
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="p-1 text-slate-500 hover:text-amber-800 hover:bg-amber-100 rounded transition-all duration-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="p-1 text-slate-500 hover:text-amber-800 hover:bg-amber-100 rounded transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded transition-all duration-200 ml-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-amber-200/50 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-slate-900">
                  Total:
                </span>
                <span className="text-2xl font-bold text-amber-800">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <button className="w-full bg-amber-800 text-white py-3 rounded-lg hover:bg-amber-900 transition-colors duration-200 font-medium">
                  Proceed to Checkout
                </button>
                <button
                  onClick={handleClearCart}
                  className="w-full border border-slate-300 text-slate-700 py-2 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
