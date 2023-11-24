/** @format */

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";

const ViewProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.React_App_BASEURL}api/v1/product/${id}`
      );
      setData(data?.product);
    } catch {}
  };

  useEffect(() => {
    fetchHandler();
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

  console.log(data);

  return (
    <section className="sectionCont">
      {ValueChecker(data?.name, " Product Name")}
      {ValueChecker(  data?.description , "Product Description")}
      {ValueChecker("Stock")}
      {ValueChecker("Created At", data?.createdAt?.slice(0, 10))}
    </section>
  );
};

export default HOC(ViewProduct);
