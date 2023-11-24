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
      {data?.images && (
        <div className="img-cont mb-3">
          {data?.images?.map((i) => (
            <img
              src={i.img}
              alt=""
              className="centerImage"
              key={`image ${i._id}`}
            />
          ))}
        </div>
      )}
      {ValueChecker(data?.name, " Product Name")}
      {ValueChecker(data?.description, "Product Description")}
      {ValueChecker(data?.Stock, "Stock")}
      {ValueChecker(data?.createdAt?.slice(0, 10), "Created At")}
      {ValueChecker(data?.numOfReviews, "Number of Reviews")}
      {ValueChecker(data?.price, "Price ")}
      {ValueChecker(data?.ratings, "Ratings")}
      {ValueChecker(data?.size, "Size")}
    </section>
  );
};

export default HOC(ViewProduct);
