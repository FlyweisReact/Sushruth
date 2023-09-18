/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Form, Alert, Button, Spinner } from "react-bootstrap";
import HOC from "../../layout/HOC";
import { toast } from "react-toastify";

const VendorKyb = () => {
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
      const response = await axios.get(`${BaseUrl}api/v1/kyc/KybList`, Auth);
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
    const [certIncorRegi, setCertIncorRegi] = useState(null);
    const [excerptStateCompanyRegi, setExcerptStateCompanyRegi] =
      useState(null);
    const [certIncorIncumbency, setCertIncorIncumbency] = useState(null);
    const [CertGoodStanding, setCertGoodStanding] = useState(null);
    const [memorandum, setMemorandum] = useState(null);
    const [UBOs, setUBOs] = useState(null);
    const [uboShareholderRegi, setUboShareholderRegi] = useState(null);
    const [uboStatOfInformation, setUboStatOfInformation] = useState(null);
    const [uboExcerptStateCompanyRegi, setUboExcerptStateCompanyRegi] =
      useState(null);
    const [uboCertIncorIncumbency, setUboCertIncorIncumbency] = useState(null);
    const [uboMemorandum, setUboMemorandum] = useState(null);
    const [uboTrustAgreement, setUboTrustAgreement] = useState(null);
    const [usEIN, setUsEIN] = useState(null);
    const [evidence, setEvidence] = useState(null);
    const [numberEIN, setNumberEIN] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const fd = new FormData();
    fd.append("certIncorRegi", certIncorRegi);
    fd.append("excerptStateCompanyRegi", excerptStateCompanyRegi);
    fd.append("certIncorIncumbency", certIncorIncumbency);
    fd.append("CertGoodStanding", CertGoodStanding);
    fd.append("memorandum", memorandum);
    fd.append("UBOs", UBOs);
    fd.append("uboShareholderRegi", uboShareholderRegi);
    fd.append("uboStatOfInformation", uboStatOfInformation);
    fd.append("uboExcerptStateCompanyRegi", uboExcerptStateCompanyRegi);
    fd.append("uboCertIncorIncumbency", uboCertIncorIncumbency);
    fd.append("uboMemorandum", uboMemorandum);
    fd.append("uboTrustAgreement", uboTrustAgreement);
    fd.append("usEIN", usEIN);
    fd.append("evidence", evidence);
    fd.append("numberEIN", numberEIN);

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const { data } = await axios.post(
          "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/kyc/addKYB",
          fd,
          Auth
        );
        toast.success(data.message);
        props.onHide();
        getOrder();
        setSubmitLoading(false);
      } catch (e) {
        setSubmitLoading(false);
        const msg = e.response.data.message;
        setErrMsg(msg);
      }
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
            Upload KYB
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
            <div className="row">
              <div className="col-lg-6">
                <Form.Group className="mb-3">
                  <Form.Label>UBOs</Form.Label>
                  <Form.Select onChange={(e) => setUBOs(e.target.value)}>
                    <option></option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>usEIN</Form.Label>
                  <Form.Select onChange={(e) => setUsEIN(e.target.value)}>
                    <option></option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>certIncorRegi</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setCertIncorRegi(e.target.files[0])}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>UboStatOfInformation</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setUboStatOfInformation(e.target.files[0])}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>excerptStateCompanyRegi</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) =>
                      setExcerptStateCompanyRegi(e.target.files[0])
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>certIncorIncumbency</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setCertIncorIncumbency(e.target.files[0])}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>CertGoodStanding</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setCertGoodStanding(e.target.files[0])}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>memorandum</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setMemorandum(e.target.files[0])}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group className="mb-3">
                  <Form.Label>uboShareholderRegi</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setUboShareholderRegi(e.target.files[0])}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>uboExcerptStateCompanyRegi</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) =>
                      setUboExcerptStateCompanyRegi(e.target.files[0])
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>uboCertIncorIncumbency</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) =>
                      setUboCertIncorIncumbency(e.target.files[0])
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>uboMemorandum</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setUboMemorandum(e.target.files[0])}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>uboTrustAgreement</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setUboTrustAgreement(e.target.files[0])}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>evidence</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setEvidence(e.target.files[0])}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>numberEIN</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setNumberEIN(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>

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
        <section className="sectionCont">
          {loading ? (
            <Spinner animation="border" role="status" className="loadingSpin" />
          ) : (
            <>
              <div
                className="pb-4   w-full flex justify-between items-center"
                style={{ width: "98%", marginLeft: "2%" }}
              >
                <span></span>
                <button
                  className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
                  onClick={() => setModalShow(true)}
                >
                  Upload KYB
                </button>
              </div>

              {!data ? (
                <Alert>Upload You'r KYB to access other resources </Alert>
              ) : (
                <Form>
                  <div className="img-cont">
                    <img
                      src={data?.CertGoodStanding}
                      alt=""
                      className="centerImage"
                    />
                    <img
                      src={data?.certIncorRegi}
                      alt=""
                      className="centerImage"
                    />
                    <img
                      src={data?.excerptStateCompanyRegi}
                      alt=""
                      className="centerImage"
                    />
                    <img
                      src={data?.certIncorIncumbency}
                      alt=""
                      className="centerImage"
                    />

                    <img
                      src={data?.memorandum}
                      alt=""
                      className="centerImage"
                    />
                    <img
                      src={data?.uboShareholderRegi}
                      alt=""
                      className="centerImage"
                    />
                    <img
                      src={data?.uboStatOfInformation}
                      alt=""
                      className="centerImage"
                    />
                    <img
                      src={data?.uboExcerptStateCompanyRegi}
                      alt=""
                      className="centerImage"
                    />
                    <img
                      src={data?.uboCertIncorIncumbency}
                      alt=""
                      className="centerImage"
                    />
                    <img
                      src={data?.uboMemorandum}
                      alt=""
                      className="centerImage"
                    />
                    <img
                      src={data?.uboTrustAgreement}
                      alt=""
                      className="centerImage"
                    />
                    <img src={data?.evidence} alt="" className="centerImage" />
                  </div>
                  {ValueChecker(data?.numberEIN, "EIN Number")}
                  {ValueChecker(data?.kybStatus, "KYC Status")}
                  {ValueChecker(data?.updatedAt, "Last Updated On")}
                  {ValueChecker(data?.status, "Status")}
                  {data?.usEIN ? (
                    <Form.Group className="mb-3">
                      <Form.Label> USEIN </Form.Label>
                      <Form.Control
                        placeholder={data?.usEIN === true ? "Yes" : "No"}
                        disabled
                      />
                    </Form.Group>
                  ) : (
                    ""
                  )}
                  {data?.UBOs ? (
                    <Form.Group className="mb-3">
                      <Form.Label> UBOS </Form.Label>
                      <Form.Control
                        placeholder={data?.UBOs === true ? "Yes" : "No"}
                        disabled
                      />
                    </Form.Group>
                  ) : (
                    ""
                  )}
                </Form>
              )}
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(VendorKyb);
