/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Modal, Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { showMessage } from "../../../Component/Message";

const AdminSubCategory = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [id, setId] = useState(null);

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
      const { data } = await axios.get(`${Baseurl}api/v1/catg/subcategory/get`);
      setData(data?.reverse());
      setTotal(data.length);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (modalShow === false) {
      setEditData(null);
    }
  }, [modalShow]);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/v1/catg/delete/sub/category/${id}`,
        Auth
      );
      const msg = data.message;
      showMessage("Success", msg, "success");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [image, setImage] = useState("");
    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [parentCategory, setParentCategory] = useState("");
    const [categoryArr, setCategoryArr] = useState([]);
    const [subCategory, setSubCategory] = useState(edit?.subCategory);

    console.log(editData)

    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${Baseurl}api/v1/catg`);
        const data = response.data.categories;
        setCategoryArr(data);
      } catch {}
    };

    useEffect(() => {
      if (props.show) {
        fetchCategory();
      }
    }, [props]);

    const fd = new FormData();
    fd.append("parentCategory", parentCategory);
    fd.append("subCategory", subCategory);
    fd.append("image", image);

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const { data } = await axios.post(
          `${Baseurl}api/v1/catg/subcategory`,
          fd,
          Auth
        );
        const msg = data.message;
        showMessage("Success", msg, "success");
        setSubmitLoading(false);
        props.onHide();
        fetchData();
      } catch (e) {
        const msg = e.response.data.message;
        setErrMsg(msg);
        setSubmitLoading(false);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const { data } = await axios.put(
          `${Baseurl}api/v1/catg/update/sub/${id}`,
          fd,
          Auth
        );
        const msg = data.message;
        showMessage("Success", msg, "success");
        setSubmitLoading(false);
        props.onHide();
        fetchData();
      } catch (e) {
        const msg = e.response.data.message;
        setErrMsg(msg);
        setSubmitLoading(false);
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
            {" "}
            {edit ? `Edit  Sub Category` : " Create New Sub Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errMsg === null || !errMsg ? (
            ""
          ) : (
            <div className="dangerBox">
              <Alert variant="danger"> {errMsg} </Alert>
              <i class="fa-solid fa-x" onClick={() => setErrMsg(null)}></i>
            </div>
          )}

          <Form onSubmit={edit ? putHandler : postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setSubCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                required
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Parent Category</Form.Label>
              <Form.Select onChange={(e) => setParentCategory(e.target.value)}>
                <option></option>
                {categoryArr?.map((i, index) => (
                  <option key={index} value={i._id}>
                    {" "}
                    {i.name}{" "}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button
              style={{
                backgroundColor: "#0c0c0c",
                borderRadius: "0",
                border: "1px solid #0c0c0c",
              }}
              type="submit"
            >
              {submitLoading === true ? (
                <Spinner size="sm" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Submit"
              )}
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

      <section className="sectionCont">
        <div className="pb-4   w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.2rem" }}
          >
            All Sub-Category's ( Total : {total} )
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
          >
            Add Sub-Category
          </button>
        </div>

        {loading ? (
          <Spinner animation="border" role="status" className="loadingSpin" />
        ) : data?.length === 0 || !data ? (
          <Alert>Categories Not Found</Alert>
        ) : (
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Parent Category</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {data?.map((i, index) => (
                  <tr key={index}>
                    <td>#{index + 1} </td>
                    <td>
                      <img src={i.image} alt="" style={{ maxWidth: "80px" }} />
                    </td>
                    <td>{i.subCategory}</td>
                    <td>{i.parentCategory?.name} </td>
                    <td>
                      <span className="flexCont">
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => deleteHandler(i._id)}
                        />
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() => {
                            setEditData(i);
                            setEdit(true);
                            setId(i._id);
                            setModalShow(true);
                          }}
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
    </>
  );
};

export default HOC(AdminSubCategory);
