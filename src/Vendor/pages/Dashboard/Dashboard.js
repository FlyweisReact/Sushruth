/** @format */

import HOC from "../../layout/HOC";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const Dashboard = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState({});
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchCount = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/vendor/dashboard`,
        Auth
      );
      const data = response.data.data;
      setCount(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  const card = [
    {
      progress: "bg-green-400",
      title: "All Product",
      number: count.product,
      icon: (
        <i className="fa-solid fa-cart-shopping text-2xl text-[#3c335d]"></i>
      ),
      bg: "#3c335d",
      link: "/Product",
    },
    {
      progress: "bg-green-400",
      title: "All Category",
      number: count?.category,
      icon: <i className="fa-solid fa-clipboard text-2xl text-[#023b5b]"></i>,
      bg: "#023b5b",
      link: "/Category",
    },
    {
      progress: "bg-green-400",
      title: "All Order",
      number: count?.order,
      icon: <i className="fa-solid fa-folder text-2xl text-[#72909e]"></i>,
      bg: "#72909e",
      link: "/vendor-order",
    },
  ];
  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status" className="loadingSpin"  />
      ) : (
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
      )}
    </>
  );
};

export default HOC(Dashboard);
