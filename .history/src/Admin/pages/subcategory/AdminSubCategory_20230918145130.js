/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Modal, Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Store } from "react-notifications-component";

const AdminSubCategory = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);

  const FinalFromDate =
    fromDate === null || fromDate?.length < 5
      ? null
      : `${fromDate}T00:00:00.000Z`;
  const FinalToDate =
    toDate === null || fromDate.length < 5 ? null : `${toDate}T23:59:59.000Z`;

  let pag = [];
  for (let i = 0; i < pages; i++) {
    pag.push(i);
  }

  function Prev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function Next() {
    if (page === pag?.length) {
    } else {
      setPage(page + 1);
    }
  }

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
      const { data } = await axios.get(`${Baseurl}api/v1/catg/subcategory/get`);
      setData(data);
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
        `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/SubCategory/deleteSubcategory/${id}`,
        Auth
      );
      toast.success("Deleted Successfully");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState(editData?.name);
    const [image, setImage] = useState(editData?.image);
    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [parentCategory, setParentCategory] = useState("");
    const [ categoryArr , setCategoryArr] = useState([])

    const fetchCategory = async () => {
      try{
        const response = await axios.get(`${Baseurl}api/v1/catg`)
        const data = response.data.categories
        setCategoryArr(data)
      }catch{}
    }

    useEffect(() => {
      if(props.show){
        fetchCategory()
      }
    },[])

    const payload = {
      name,
      parentCategory,
      image: {
        public_id: image,
      },
    };

    const ClodinaryPost = (value) => {
      setImageLoading(true);
      const data = new FormData();
      data.append("file", value);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url);
          setUploaded(true);
          setImageLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const { data } = await axios.post(
          `${Baseurl}api/v1/catg/subcategory`,
          payload,
          Auth
        );
        Store.addNotification({
          title: "",
          message: "Sub Category Created Successfully",
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
          `${Baseurl}api/v1/catg/update/${id}`,
          payload,
          Auth
        );
        Store.addNotification({
          title: "",
          message: "Category Updated Successfully",
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
            {edit ? `Edit ${name}` : " Create New Category"}
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
            {imageLoading ? (
              <Spinner size="sm" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              ""
            )}

            {uploaded ? <Alert variant="success">Image Uploaded</Alert> : ""}

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                required
                onChange={(e) => ClodinaryPost(e.target.files[0])}
              />
     
            </Form.Group>
     
            <Form.Group className="mb-3">
              <Form.Label>Parent Category</Form.Label>
            <Form.Select>
              <option></option>
              {categoryArr?.map((i , index) => (
                <option key={index} value={i._id} > {i.name}  </option>
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
              setEdit(false);
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
                      <img
                        src={i.image?.url}
                        alt=""
                        style={{ maxWidth: "80px" }}
                      />
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
