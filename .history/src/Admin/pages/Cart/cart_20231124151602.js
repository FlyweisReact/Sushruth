/** @format */

import React, {  useEffect, useState } from "react";
import axios from "axios";
import HOC from "../../layout/HOC";

const Cart = () => {
  const  [ user , setUser ] = useState({})
  const [ products , setProducts ] = useState([])

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const Baseurl = process.env.React_App_BASEURL;

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/cart/user/65363b3e767e1582f80568c9`,
        Auth
      );
      console.log(data.data);
      setUser(data?.data?.user)
      setProducts(data?.data?.products)
    } catch {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  function ValueChecker(holder, string) {
    return holder ? (
      <div className="Desc-Container">
        <p className="title"> {string} </p>
        <p className="desc"> {holder} </p>
      </div>
    ) : (
      ""
    );
  }

  return (
    <>
      <section className="sectionCont">
        <div className="pb-4   w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.2rem" }}
          ></span>
        </div>
      </section>
    </>
  );
};

export default HOC(Cart);
