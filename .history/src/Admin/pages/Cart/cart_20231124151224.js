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
          ></span>
        </div>
      </section>
    </>
  );
};

export default HOC(Cart);
