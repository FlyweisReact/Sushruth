/** @format */

import axios from "axios";
import React from "react";
import HOC from "../../layout/HOC";

const ViewProduct = () => {
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

  
  return <div>ViewProduct</div>;
};

export default HOC(ViewProduct);
