import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateFoodListingPage from "./pages/CreateListing";
import DonarPage from "./pages/RegisterDonar";
import Home from "./pages/Home";
import FoodDetails from "./pages/FoodDetail";
import RegisterReceiver from "./pages/RegisterReceiver";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register/donar" element={<DonarPage />} />
            <Route path="/createlisting" element={<CreateFoodListingPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/fooddetails/:id" element={<FoodDetails />} />
            <Route path="/register/receiver" element={<RegisterReceiver />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
