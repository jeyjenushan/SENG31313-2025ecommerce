import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
