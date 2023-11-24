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

  return (
    <section className="sectionCont">
      <div className="pb-4   w-full flex justify-between items-center">
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.2rem" }}
        >
          Edit Product
        </span>
      </div>
    </section>
  );
};

export default HOC(ViewProduct);
