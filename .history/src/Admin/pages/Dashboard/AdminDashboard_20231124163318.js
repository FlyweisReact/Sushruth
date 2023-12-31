/** @format */

import HOC from "../../layout/HOC";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(0);
  const [category, setCategory] = useState(0);
  const [subCategory, setSubCategory] = useState(0);
  const [user, setUser] = useState(0);
  const [order, setOrder] = useState(0);

  const Baseurl = process.env.React_App_BASEURL;
  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/product/admin/products`
      );

      const data = response.data.products;
      setProduct(data?.length);
    } catch {}
  };

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/catg`);
      setCategory(data.categories.length);
    } catch {}
  };

  const fetchSubCategory = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/catg/subcategory/get`);
      setSubCategory(data.length);
    } catch {}
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/user/all`);
      setUser(data.users.length);
    } catch {}
  };

  const fetchOrder = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/order/admin/orders`,
        Auth
      );
      setOrder(data.orders.length);
    } catch {}
  };

  useEffect(() => {
    fetchProduct();
    fetchCategory();
    fetchSubCategory();
    fetchUser();
    fetchOrder();
  }, []);

  const card = [
    {
      progress: "bg-green-400",
      title: "All Product",
      number: product,
      icon: (
        <i className="fa-solid fa-cart-shopping text-2xl text-[#3c335d]"></i>
      ),
      bg: "#3c335d",
      link: "/admin/product",
    },
    {
      progress: "bg-green-400",
      title: "All Category",
      number: category,
      icon: <i className="fa-solid fa-clipboard text-2xl text-[#023b5b]"></i>,
      bg: "#023b5b",
      link: "/admin/category",
    },
    {
      progress: "bg-green-400",
      title: "All Sub-Category",
      number: subCategory,
      icon: <i className="fa-solid fa-folder text-2xl text-[#72909e]"></i>,
      bg: "#72909e",
      link: "/admin/sub-category",
    },
    {
      progress: "bg-green-400",
      title: "All User",
      number: user,
      icon: <i className="fa-solid fa-user text-2xl text-[#2f6967]"></i>,
      bg: "#2f6967",
      link: "/user-list",
    },
    {
      progress: "bg-green-400",
      title: "All Orders",
      number: order,
      icon: (
        <i className="fa-solid fa-bag-shopping text-2xl text-[#04649b]"></i>
      ),
      bg: "#04649b",
      link: "/admin/order",
    },
  ];
  return (
    <>
      <section className="HomeGrid">
        {card.map((card, index) => {
          return (
            <div
              className="px-5 py-8 bg-slate-200 space-y-2 shadow-xl flex flex-col  rounded-md cardDiv"
              key={index}
              style={{
                backgroundColor: `${card.bg}`,
                textTransform: "uppercase",
              }}
              onClick={() => navigate(`${card.link}`)}
            >
              <div className="grid  justify-between grid-cols-4">
                <div className="flex flex-col col-span-3 space-y-1">
                  <span
                    className="tracking-widest text-gray-900"
                    style={{ color: "#fff" }}
                  >
                    {card.title}
                  </span>
                  <span
                    className="tracking-wider text-gray-700 text-xl md:text-2xl font-semibold"
                    style={{ color: "#fff" }}
                  >
                    {card.number}
                  </span>
                </div>
                <div className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center iCOn">
                  {card.icon}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default HOC(Dashboard);
