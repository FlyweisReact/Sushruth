/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Form, Button, FloatingLabel, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { Store } from "react-notifications-component";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [ratings, setRatings] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categoryArr, setCategoryArr] = useState([]);
  const [subCatArr, setSubCatArr] = useState([]);
  const [Stock, setStock] = useState(0);
  const [numOfReviews, setNumOfReviews] = useState("");
  const [codes, setCodes] = useState([]);
  const [deliveryPinCodes, setDeliveryPinCodes] = useState("");
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const Baseurl = process.env.React_App_BASEURL;

  const coder_adder = () => {
    setCodes((prev) => [...prev, deliveryPinCodes]);
    setDeliveryPinCodes("");
  };

  const codes_remover = (index) => {
    setCodes((prev) => prev.filter((_, i) => i !== index));
  };

  const getCategory = async () => {
    try {
      const res = await axios.get(`${Baseurl}api/v1/catg`);
      setCategoryArr(res.data.categories);
    } catch (e) {
      console.log(e);
    }
  };

  const getSubCategory = async (payload) => {
    try {
      const res = await axios.get(
        `${Baseurl}api/v1/catg/subcategoryId/${payload}`
      );
      setSubCatArr(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fd = new FormData();
  Array.from(image).forEach((img) => {
    fd.append("image", img);
  });
  fd.append("name", name);
  fd.append("description", description);
  fd.append("price", price);
  fd.append("size", size);
  fd.append("category", category);
  fd.append("subCategory", subCategory);
  fd.append("Stock", Stock);

  const createProduct = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        `${Baseurl}api/v1/product/admin/product/new`,
        fd,
        Auth
      );
      Store.addNotification({
        title: "",
        message: "Product Created Successfully",
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
      setLoading(false);
    } catch (e) {
      const msg = e.response.data.message;
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <section className="sectionCont">
      <div className="pb-4   w-full flex justify-between items-center">
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.2rem" }}
        >
          Create New Product
        </span>
      </div>

      <Form onSubmit={createProduct}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            multiple
            required
            onChange={(e) => setImage(e.target.files)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Choose Category</Form.Label>
          <Form.Select
            onChange={(e) => {
              setCategory(e.target.value);
              getSubCategory(e.target.value);
            }}
            required
          >
            <option>-- Select Category --</option>
            {categoryArr?.map((item) => (
              <option value={item._id} key={item._id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Choose Sub-Category</Form.Label>
          <Form.Select
            onChange={(e) => setSubCategory(e.target.value)}
            required
          >
            <option>-- Select Sub-Category --</option>
            {subCatArr?.map((item) => (
              <option value={item._id} key={item._id}>
                {item.subCategory}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <FloatingLabel>
            <Form.Control
              as="textarea"
              style={{ height: "100px" }}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            step={0.01}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Size</Form.Label>
          <Form.Control type="text" onChange={(e) => setSize(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            min={0}
            onChange={(e) => setStock(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            min={0}
            onChange={(e) => setRatings(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            min={0}
            onChange={(e) => setRatings(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Delivery code</Form.Label>

          <FloatingLabel>
            <Form.Control
              type="text"
              className="mb-3"
              value={deliveryPinCodes}
              onChange={(e) => setDeliveryPinCodes(e.target.value)}
            />
          </FloatingLabel>

          <Button variant="dark" onClick={() => coder_adder()}>
            Add
          </Button>
        </Form.Group>

        {codes?.map((i, index) => (
          <ul
            className="mt-2"
            style={{
              border: "1px solid #000",
              paddingTop: "10px",
              paddingBottom: "20px",
            }}
          >
            <li style={{ listStyle: "disc" }} className="mt-1">
              {i}
            </li>

            <li className="mt-3">
              <Button onClick={() => codes_remover(index)}>
                Remove This One
              </Button>
            </li>
          </ul>
        ))}

        <div className="w-100 d-flex justify-content-between">
          <Button variant="success" type="submit">
            {loading ? <Spinner animation="border" /> : "Submit"}
          </Button>

          <Link to="/Product">
            <Button variant="dark">Back</Button>
          </Link>
        </div>
      </Form>
    </section>
  );
};

export default HOC(CreateProduct);
