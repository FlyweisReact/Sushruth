/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import HOC from "../../layout/HOC";
import { Alert, Table } from "react-bootstrap";
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
        {products?.length > 0 ? (
          <>
            <div className="pb-4   w-full flex justify-between items-center">
              <span
                className="tracking-widest text-slate-900 font-semibold uppercase"
                style={{ fontSize: "1.2rem" }}
              >
                {user?.name} Cart
              </span>
            </div>

            {ValueChecker(user?.name, "User Name")}
            {ValueChecker(user?.email, "User Email ")}
            {ValueChecker(user?.gender, "User Gender  ")}
            {ValueChecker(user?.phone, "User Phone Number  ")}

            <div className="pb-4 mt-5  w-full flex justify-between items-center">
              <span
                className="tracking-widest text-slate-900 font-semibold uppercase"
                style={{ fontSize: "1.2rem" }}
              >
                Product's
              </span>
            </div>
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Size</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {products?.map((i, index) => (
                    <tr key={index}>
                      <td>#{index + 1} </td>
                      <td>
                        <img
                          src={i?.product?.images?.[0]?.img}
                          alt=""
                          style={{ maxWidth: "80px" }}
                        />
                      </td>
                      <td>{i.product?.name}</td>
                      <td>₹{i?.product?.price}</td>
                      <td> {i.quantity} </td>
                      <td> {i.size} </td>
                      <td>
                        <span className="flexCont">
                          <Link to={`/product/${i?.product?._id}`}>
                            <i className="fa-solid fa-eye"></i>
                          </Link>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        ) : (
          <Alert>No Product In Cart Added Yet !</Alert>
        )}
      </section>
    </>
  );
};

export default HOC(Cart);