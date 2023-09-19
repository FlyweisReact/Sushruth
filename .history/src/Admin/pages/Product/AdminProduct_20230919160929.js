/** @format */

import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  Alert,
  Spinner,
  Modal,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import axios from "axios";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Store } from "react-notifications-component";

const AdminProduct = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalshow, setModalshow] = useState(false);
  const [id, setId] = useState("");
  const [ editData , setEditData ] = useState({})

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const Baseurl = `https://mr-sushruth-backend-ecommerce.vercel.app/`;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/product/search?search=${search}`,
        Auth
      );
      setData(data.apiFeature.reverse());
      setTotal(data.apiFeature?.length);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/v1/product/delete/${id}`,
        Auth
      );
      Store.addNotification({
        title: "",
        message: "Deleted Successfully",
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
      fetchData();
    } catch (e) {}
  };

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState(editData?.name);
    const [description, setDescription] = useState(editData?.description);
    const [price, setPrice] = useState(editData?.price);
    const [size, setSize] = useState(editData?.size);
    const [category, setCategory] = useState(editData?.category?._id);
    const [subCategory, setSubCategory] = useState(editData?.subCategory?._id);
    const [categoryArr, setCategoryArr] = useState([]);
    const [subCatArr, setSubCatArr] = useState([]);
    const [Stock, setStock] = useState(editData?.Stock);
    const [image, setImage] = useState([]);
    

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
      if (props.show) {
        getCategory();
      }
    }, [props]);

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
          `${Baseurl}api/v1/product/update/${id}`,
          fd,
          Auth
        );
        Store.addNotification({
          title: "",
          message: "Product Updated Successfully",
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
      } catch {}
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createProduct}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
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
                  value={}
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
              <Form.Control
                type="text"
                onChange={(e) => setSize(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                min={0}
                onChange={(e) => setStock(e.target.value)}
              />
            </Form.Group>

            <div className="w-100 d-flex justify-content-between">
              <Button variant="success" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalshow}
        onHide={() => setModalshow(false)}
      />
      <section className="sectionCont">
        <div className="pb-4   w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.2rem" }}
          >
            All Products ( Total : {total} )
          </span>
          <Link to="/create-product">
            <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider">
              Create New
            </button>
          </Link>
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
                    <th>Category</th>
                    <th>Sub-Category</th>
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
                      <td>{i.category?.name}</td>
                      <td>{i.subCategory?.subCategory}</td>
                      <td>₹{i.price}</td>
                      <td>{i.Stock}</td>
                      <td>{i.createdAt?.slice(0, 10)}</td>
                      <td>
                        <span className="flexCont">
                          <i
                            className="fa-solid fa-pen-to-square"
                            onClick={() => {
                              setEditData(i)
                              setId(i._id);
                              setModalshow(true);
                            }}
                          />
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

export default HOC(AdminProduct);
