/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Form, Alert, Button, Spinner } from "react-bootstrap";
import HOC from "../../layout/HOC";
import { toast } from "react-toastify";

const VendorKyc = () => {
  const [data, setData] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const BaseUrl = "https://ecommerce-backend-ochre-phi.vercel.app/";

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}api/v1/kyc/KycList`, Auth);
      setData(response.data.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  function ValueChecker(holder, string) {
    return holder ? (
      <Form.Group className="mb-3">
        <Form.Label> {string} </Form.Label>
        <Form.Control placeholder={holder} disabled />
      </Form.Group>
    ) : (
      ""
    );
  }

  function MyVerticallyCenteredModal(props) {
    const [passPort, setPassPort] = useState(null);
    const [socialSecurityCard, setSecurity] = useState(null);
    const [dL, setDL] = useState(null);
    const [voterIdentityCard, setVoter] = useState(null);
    const [addressProof, setAddressProof] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const fd = new FormData();
    fd.append("passPort", passPort);
    fd.append("socialSecurityCard", socialSecurityCard);
    fd.append("dL", dL);
    fd.append("voterIdentityCard", voterIdentityCard);
    fd.append("addressProof", addressProof);

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const { data } = await axios.post(
          "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/kyc/addKYC",
          fd,
          Auth
        );
        toast.success(data.message);
        props.onHide();
        getOrder();
        setSubmitLoading(false);
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
            Upload Kyc
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

          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Passport </Form.Label>
              <Form.Control
                type="file"
                required
                onChange={(e) => setPassPort(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>security Proof</Form.Label>
              <Form.Control
                type="file"
                required
                onChange={(e) => setSecurity(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>DL</Form.Label>
              <Form.Control
                type="file"
                required
                onChange={(e) => setDL(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Voter Identity Card</Form.Label>
              <Form.Control
                type="file"
                required
                onChange={(e) => setVoter(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address Proof</Form.Label>
              <Form.Control
                type="file"
                required
                onChange={(e) => setAddressProof(e.target.files[0])}
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
      <section>
        {loading ? (
          <Spinner animation="border" role="status" className="loadingSpin" />
        ) : (
          <section className="sectionCont">
            <div
              className="pb-4   w-full flex justify-between items-center"
              style={{ width: "98%", marginLeft: "2%" }}
            >
              <span></span>
              <button
                className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
                onClick={() => setModalShow(true)}
              >
                Upload Kyc
              </button>
            </div>

            {!data ? (
              <Alert>Upload You'r KYC to access other resources </Alert>
            ) : (
              <Form>
                <div className="img-cont">
                  <img
                    src={data?.addressProof}
                    alt=""
                    className="centerImage"
                  />
                  <img src={data?.dL} alt="" className="centerImage" />
                  <img src={data?.passPort} alt="" className="centerImage" />
                  <img
                    src={data?.socialSecurityCard}
                    alt=""
                    className="centerImage"
                  />
                  <img
                    src={data?.voterIdentityCard}
                    alt=""
                    className="centerImage"
                  />
                </div>
                {ValueChecker(data?.kycStatus, "KYC Status")}
              </Form>
            )}
          </section>
        )}
      </section>
    </>
  );
};

export default HOC(VendorKyc);
