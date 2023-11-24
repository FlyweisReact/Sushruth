/** @format */

import React from "react";
import HOC from "../../layout/HOC";

const ViewProduct = () => {
  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/product/${id}`);
      setData(data?.product);
    } catch {}
  };

  useEffect(() => {
    fetchHandler();
  }, []);
  return <div>ViewProduct</div>;
};

export default HOC(ViewProduct);
