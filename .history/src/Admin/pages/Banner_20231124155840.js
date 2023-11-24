/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Modal, Alert, Spinner, Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import { Store } from "react-notifications-component";
import { showMessage } from "../../Component/Message";

const Banner = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
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
      const { data } = await axios.get(`${Baseurl}api/v1/bottom/get`, Auth);
      setData(data.banners);
      setTotal(data.banners.length);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/v1/banner/delete/${id}`
      );
      const msg = data?.message;
      showMessage("Success", msg, "success");
      fetchData();
    } catch {}
  };

  function MyVerticallyCenteredModal(props) {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    const fd = new FormData();
    fd.append("image", image);
    fd.append("type", type);

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          `${Baseurl}api/v1/banner/add/${name}`,
          fd
        );
        const msg = data?.message;
        showMessage("Success", msg, "success");
        props.onHide();
        fetchData();
      } catch (e) {
        const msg = e.response.data.message;
        Store.addNotification({
          title: "",
          message: msg,
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
      }
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Banner
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                required
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select onChange={(e) => setType(e.target.value)}>
                <option>Select Your Prefrence</option>
                <option value={"bottom"}> Bottom </option>
                <option value={"middle"}> Middle </option>
              </Form.Select>
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <section className="sectionCont">
          <div className="pb-4   w-full flex justify-between items-center">
            <span
              className="tracking-widest text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.2rem" }}
            >
              Banner ( Total : {total} )
            </span>
            <button
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
              onClick={() => setModalShow(true)}
            >
              Create New
            </button>
          </div>

          {loading ? (
            <Spinner animation="border" role="status" className="loadingSpin" />
          ) : data?.length === 0 || !data ? (
            <Alert>Help Not Found</Alert>
          ) : (
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
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(Banner);
