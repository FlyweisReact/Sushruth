/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { Store } from "react-notifications-component";

const Aboutus = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const Baseurl = `https://mr-sushruth-backend-ecommerce.vercel.app/`;

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/aboutUs`);
      setData(data.aboutus);
      setTotal(data.aboutus?.length);
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
      const data = await axios.delete(`${Baseurl}api/v1/api/v1/aboutU/${id}`, Auth);
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
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [title, setTitle] = useState("");

    const payload = {
      title,
    };

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(`${Baseurl}api/v1/aboutUs`, payload);
        Store.addNotification({
          title: "",
          message: "Created Successfully",
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

        props.onHide();
        fetchData();
      } catch {}
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Button
              style={{
                backgroundColor: "#0c0c0c",
                borderRadius: "0",
                border: "1px solid #0c0c0c",
              }}
              type="submit"
            >
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
              About us ( Total : {total} )
            </span>
            <button
              onClick={() => {
                setModalShow(true);
              }}
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
            >
              Create new
            </button>
          </div>

          {loading ? (
            <Spinner animation="border" role="status" className="loadingSpin" />
          ) : data?.length === 0 || !data ? (
            <Alert>Not Found</Alert>
          ) : (
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {data?.map((i, index) => (
                    <tr key={index}>
                      <td>{i.title}</td>
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
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(Aboutus);