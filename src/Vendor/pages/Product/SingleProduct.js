/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";

const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const BaseUrl = "https://ecommerce-backend-ochre-phi.vercel.app/";

  const getOrder = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}api/v1/vendor/Product/view/${id}`
      );
      setData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  function ValueChecker(holder, string) {
    return holder ? (
      <Form.Group className="mb-3">
        <Form.Label> {string} </Form.Label>
        <Form.Control placeholder={holder} disabled />
      </Form.Group>
    ) : (
      ""
    );
  }

  return (
    <>
      <section>
        <p className="headP">Dashboard / {data?.name}</p>
        <section className="sectionCont">
          <Form>
            <div className="img-cont">
              {data?.productImage?.map((i, index) => (
                <img src={i} alt="" className="centerImage" key={index} />
              ))}
            </div>
            {ValueChecker(data?.productName, "Product Name")}
            {ValueChecker(data?.description, "Description")}
            {ValueChecker(data?.categoryId?.name, "Category")}
            {ValueChecker(data?.subcategoryId?.name, "Sub-Category")}
            {ValueChecker(data?.originalPrice, "MRP")}
            {ValueChecker(data?.discountPrice, "Selling Price")}
            {ValueChecker(data?.discount, "Discount")}
            {ValueChecker(data?.returnPolicy, "Return Policy")}
            {ValueChecker(data?.stock, "Stock")}
            {ValueChecker(data?.stockStatus, "Stock Status")}
            {ValueChecker(data?.viewOnwebsite, "Active on Website")}
            {ValueChecker(data?.createdAt?.slice(0, 10), "Created At")}

            <Link to="/Product">
              <Button variant="dark">Back</Button>
            </Link>
          </Form>
        </section>
      </section>
    </>
  );
};

export default HOC(SingleProduct);
