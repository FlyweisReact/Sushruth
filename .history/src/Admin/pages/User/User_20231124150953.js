/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { Store } from "react-notifications-component";
import { showMessage } from "../../../Component/Message";
import { Link } from "react-router-dom";

const User = () => {
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/user/all`);
      setData(data.users.reverse());
      setTotal(data.users.length);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${Baseurl}api/v1/admin/${id}`, Auth);
      const msg = data.message;
      showMessage("Success", msg, "success");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const filterData = !search
    ? data
    : data?.filter((i) =>
        i?.name?.toLowerCase().includes(search?.toLowerCase())
      );

  return (
    <>
      <section>
        <section className="sectionCont">
          <div className="pb-4   w-full flex justify-between items-center">
            <span
              className="tracking-widest text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.2rem" }}
            >
              All User's ( Total : {total} )
            </span>
          </div>
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input
              type="search"
              placeholder="Start typing to search for User"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <Spinner animation="border" role="status" className="loadingSpin" />
          ) : total === 0 ? (
            <Alert>No User Created Yet !</Alert>
          ) : !data ? (
            <Alert> User's Not Found </Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>Sno.</th>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Email</th>
                      <th>Created At</th>
                      <th>Cart</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {filterData?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>{i.name}</td>
                        <td>{i.phone} </td>
                        <td>{i.email} </td>
                        <td> {i.createdAt?.substr(0, 10)} </td>
                        <td>
                        <Link to={``}
                          <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider">
                            Cart
                          </button>
                        </td>
                        <td>
                          <span className="flexCont">
                            <i
                              className="fa-solid fa-trash"
                              onClick={() => deleteHandler(i._id)}
                            />
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
      </section>
    </>
  );
};

export default HOC(User);
