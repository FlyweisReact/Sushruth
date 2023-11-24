/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { Table, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Store } from "react-notifications-component";

const Cart = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const Baseurl = process.env.React_App_BASEURL;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/cart/user/65363b3e767e1582f80568c9`,
        Auth
      );
      console.log(data.data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <>
      <section className="sectionCont">
        <div className="pb-4   w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.2rem" }}
          >
          </span>
    
        </div>

        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input
            type="search"
            placeholder="Start typing to search for Product"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading === true ? (
          <Alert>
            {" "}
            Fetching Products Wait <Spinner animation="border" size="lg" />
          </Alert>
        ) : data?.length === 0 || !data ? (
          <Alert>Product Not Found</Alert>
        ) : (
          <>
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>MRP</th>
                    <th>Stock</th>
                    <th>Created At</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {data?.map((i, index) => (
                    <tr key={index}>
                      <td>#{index + 1} </td>
                      <td>
                        <img
                          src={i.images?.[0]?.img}
                          alt=""
                          style={{ maxWidth: "80px" }}
                        />
                      </td>
                      <td>{i.name}</td>
                      <td>₹{i.price}</td>
                      <td>{i.Stock}</td>
                      <td>{i.createdAt?.slice(0, 10)}</td>
                      <td>
                        <span className="flexCont">
                          <Link to={`/edit-product/${i._id}`}>
                            <i className="fa-solid fa-pen-to-square" />
                          </Link>
                          <Link to={`/product/${i._id}`}>
                            <i className="fa-solid fa-eye"></i>
                          </Link>
                          <i
                            className="fa-sharp fa-solid fa-trash"
                            onClick={() => deleteHandler(i._id)}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HOC(Cart);
