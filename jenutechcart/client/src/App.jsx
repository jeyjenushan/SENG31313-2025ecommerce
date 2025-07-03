import { Toaster } from "sonner";
import UserLayout from "./components/Layout/UserLayout";
import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}></Route>
      </Routes>
    </div>
  );
};

export default App;
