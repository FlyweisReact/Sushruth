/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import HOC from "../../layout/HOC";
import { Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const Cart = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);

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
        `${Baseurl}api/v1/cart/user/${id}`,
        Auth
      );
      setUser(data?.data?.user);
      setProducts(data?.data?.products);
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
      {products?.length > 0 ? 
      
      
      : ""}
        
      </section>
    </>
  );
};

export default HOC(Cart);
