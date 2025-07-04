import { Toaster } from "sonner";
import UserLayout from "./components/Layout/UserLayout";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Provider } from "react-redux";
import store from "./redux/store";
import About from "./pages/About/about";
import Contact from "./pages/Contact/contact";
import Home from "./pages/Home/Home";
import ProductDetails from "./components/Products/productDetails";
import CollectionPage from "./pages/Collections/Collections";
const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route
              path="collections/:collection"
              element={<CollectionPage />}
            />
          </Route>
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
