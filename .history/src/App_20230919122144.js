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
        <Route path="/admin/product" element={<AdminProduct />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/admin/category" element={<AdminCategory />} />
        <Route path="/admin/sub-category" element={<AdminSubCategory />} />
        <Route path="/user-list" element={<User />} />
        <Route path="/admin/order" element={<AdminOrder />} />
      </Routes>
    </>
  );
}

export default App;
