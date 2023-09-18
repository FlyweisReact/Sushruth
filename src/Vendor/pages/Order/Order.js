/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Order = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(token)

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/vendor/Orders",
        Auth
      );
      setData(data.data);
      setTotal(data.data.length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <section>
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Orders ( Total : {total} )
          </span>
        </div>

        <section className="sectionCont">
          {data?.length === 0 || !data ? (
            <Alert>Order Not Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>OrderId</th>
                      <th>User</th>
                      <th>Product</th>
                      <th>Unit</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Phone Number</th>
                      <th>Payment Option</th>
                      <th>Order status</th>
                      <th>Payment Status</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td> {i.orderId} </td>
                        <td> {i.userId?.fullName} </td>
                        <td> {i.productId?.productName} </td>
                        <td> {i.unitInwords} </td>
                        <td> {i.productPrice} </td>
                        <td> {i.quantity} </td>
                        <td> {i.total} </td>
                        <td> {i.phone} </td>
                        <td> {i.paymentOption} </td>
                        <td> {i.orderStatus} </td>
                        <td> {i.paymentStatus} </td>
                        <td>
                          <Link to={`/vendor/order/${i._id}`}>
                            <i className="fa-solid fa-eye" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(Order);
