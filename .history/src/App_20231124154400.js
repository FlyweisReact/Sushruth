/** @format */

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminLogin from "./Admin/forms/AdminLogin";
import AdminSubCategory from "./Admin/pages/subcategory/AdminSubCategory";
import AdminCategory from "./Admin/pages/category/AdminCategory";
import AdminProduct from "./Admin/pages/Product/AdminProduct";
import AdminOrder from "./Admin/pages/Order/AdminOrder";
import User from "./Admin/pages/User/User";
import CreateProduct from "./Admin/pages/Product/CreateProduct";
import { ReactNotifications } from "react-notifications-component";
import Dashboard from "./Admin/pages/Dashboard/AdminDashboard";
import Help from "./Admin/pages/Help";
import Banner from "./Admin/pages/Banner";
import Terms from "./Admin/pages/Terms";
import Privacy from "./Admin/pages/Privacy";
import Coupon from "./Admin/pages/Coupon";
import Aboutus from "./Admin/pages/Aboutus";
import Contact from "./Admin/pages/Contact";
import Notification from "./Admin/pages/Notification";
import EditProduct from "./Admin/pages/Product/EditProduct";
import ViewProduct from "./Admin/pages/Product/ViewProduct";
import Cart from "./Admin/pages/Cart/Cart";

function App() {
  return (
    <>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ReactNotifications />

      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/user-list" element={<User />} />
        <Route path="/admin/category" element={<AdminCategory />} />
        <Route path="/admin/sub-category" element={<AdminSubCategory />} />
        <Route path="/admin/product" element={<AdminProduct />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/product/:id" element={<ViewProduct />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/admin/order" element={<AdminOrder />} />
        <Route path="/help" element={<Help />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />


        <Route path="/dashboard" element={<Dashboard />} />

       
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </>
  );
}

export default App;
