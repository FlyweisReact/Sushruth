/** @format */

import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { MdDashboardCustomize } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

const Sidebar = ({ hamb, setHamb }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  const token = localStorage.getItem("token");

  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // KYC STATUS
  const fetchKyc = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/vendor/getProfile",
        Auth
      );
      setProfile(response.data.data);
      if(response.data.data.kycStatus === "APPROVED" && response.data.data.kybStatus === "APPROVED" ){
        localStorage.setItem("profile_status" , "APPROVED")
      }
    } catch {}
  };

  useEffect(() => {
    fetchKyc();
  }, []);

  let nav = [];

  if (localStorage.getItem("profile_status") === "APPROVED") {
    nav = [
      {
        icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
        link: "/dashboard ",
        name: "Dashboard",
      },
      {
        icon: <i className="fa-solid fa-file text-xl mr-3 rounded-full " />,
        link: "/vendor/kyc ",
        name: "KYC",
      },
      {
        icon: <i className="fa-solid fa-book text-xl mr-3 rounded-full " />,
        link: "/vendor/kyb ",
        name: "KYB",
      },
      {
        icon:  <i className="fa-solid fa-clipboard text-xl mr-3 rounded-full " />,
        link: "/Category",
        name: "Category",
      },
      {
        icon: <i className="fa-solid fa-folder text-xl mr-3 rounded-full " />,
        link: "/SubCategory",
        name: "Sub-Category",
      },
      {
        icon: (
          <i className="fa-solid fa-cart-shopping text-xl mr-3 rounded-full"></i>
        ),
        link: "/Product",
        name: "Products",
      },

      {
        icon: <i className="fa-brands fa-unity  text-xl mr-3 rounded-full"></i>,
        link: "/vendor/unit/list",
        name: "Unit",
      },

      {
        icon: <i className="fa-solid fa-droplet  text-xl mr-3 rounded-full"></i>,
        link: "/vendor/colors",
        name: "Colors",
      },
      {
        icon: <i className="fa-solid fa-bag-shopping  text-xl mr-3 rounded-full"></i>,
        link: "/vendor-order",
        name: "Order",
      },
      {
        icon: <i className="fa-solid fa-bag-shopping  text-xl mr-3 rounded-full"></i>,
        link: "/vendor/return-order",
        name: "Return Order",
      },
    ];
  } else {
    nav = [
      {
        icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
        link: "/dashboard ",
        name: "Dashboard",
      },
      {
        icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
        link: "/vendor/kyc ",
        name: "KYC",
      },
      {
        icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
        link: "/vendor/kyb ",
        name: "KYB",
      },
    ];
  }

  const logOut = () => {
    localStorage.clear();
    navigate("/");
    toast.success("Logged Out");
  };

  return (
    <>
      <aside
        className="p-4 h-auto"
        style={{ backgroundColor: "#0c0c0c", minHeight: "100vh" }}
      >
        {/* Top */}
        <div className="w-full md:hidden relative  p-2 mb-4">
          <RiCloseLine
            onClick={() => setHamb(!hamb)}
            className="text-3xl  absolute top-2 sm:hover:rotate-[228deg] transition-transform font-bold right-2 sm:hover:text-[22px] text-[rgb(241,146,46)] cursor-pointer"
          />
        </div>{" "}
        <figure className="flex  flex-col items-center">
          <span
            className="font-bold text-[#fff]"
            style={{
              fontSize: "2rem",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {" "}
            VENDOR PANEL
          </span>
        </figure>
        <nav className="py-6">
          {nav.map((nav) => {
            return (
              <Link
                to={nav.link}
                key={nav.name}
                className=""
                style={{ textDecoration: "none", textTransform: "uppercase" }}
              >
                <span
                  className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm"
                  style={{ color: "#FFF" }}
                >
                  {nav.icon} {nav.name}
                </span>
              </Link>
            );
          })}
          <span
            className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm"
            onClick={() => logOut()}
            style={{ color: "#FFF", textTransform: "uppercase" }}
          >
            <BiLogOutCircle className="text-xl mr-3 rounded-full " /> LogOut
          </span>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
