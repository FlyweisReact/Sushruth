/** @format */
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Link, useParams } from "react-router-dom";
import { Form, Button, FloatingLabel, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const [image, setImage] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [discountActive, setDicountActive] = useState(null);
  const [originalPrice, setOriginalPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [varient, setVariant] = useState(null);
  const [size, setSize] = useState(null);
  const [categoryArr, setCategoryArr] = useState([]);
  const [subCatArr, setSubCatArr] = useState([]);
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ productImages , setProductImages ] = useState([])
  const [ categoryName , setCategoryName ] = useState('')
  const [ subCategoryName , setsubCategoryName ] = useState('')

  const Baseurl = `https://ecommerce-backend-ochre-phi.vercel.app/`;

  const getProductDetail = async () => {
    try {
      const res = await axios.get(`${Baseurl}api/v1/vendor/Product/view/${id}`);
      setProductImages(res.data.data.productImage);
      setCategoryId(res.data.data.categoryId._id)
      setCategoryName(res.data.data.categoryId.name)
      setProductName(res.data.data.productName)
      subCategoryId(res.data.data?.subcategoryId?._id)
      setsubCategoryName(res.data.data?.subcategoryId?.name)
    } catch {}
  };


  const getCategory = async () => {
    try {
      const res = await axios.get(
        "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/Category/allCategory"
      );
      setCategoryArr(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getSubCategory = async (payload) => {
    try {
      const res = await axios.get(
        `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/SubCategory/allSubcategoryById/${payload}`
      );
      setSubCatArr(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategory();
    getProductDetail();
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
  fd.append("categoryId", categoryId);
  fd.append("subCategoryId", subCategoryId);
  fd.append("discountActive", discountActive);
  fd.append("originalPrice", originalPrice);
  fd.append("discount", discount);
  fd.append("productName", productName);
  fd.append("description", description);
  fd.append("varient", varient);
  fd.append("returnPolicy", returnPolicy);
  fd.append("size", size);
  fd.append("stock", stock);

  const createProduct = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/vendor/Product/add`,
        fd,
        Auth
      );
      toast.success(res.data.message);
      setLoading(false);
      setImage([]);
      setCategoryId("");
      setSubCategoryId("");
      setDicountActive(null);
      setDiscount("");
      setProductName("");
      setDescription("");
      setReturnPolicy("");
      setVariant(null);
      setSize(null);
      setStock(0);
    } catch (e) {
      const msg = e.response.data.message;
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <section>
      <p className="headP">Dashboard / Create New Product</p>
      <section className="sectionCont">
        <div className="img-cont">
          {productImages?.map((i, index) => (
            <img src={i} alt="" className="centerImage" key={index} />
          ))}
        </div>
        <Form onSubmit={createProduct}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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
            <Form.Label>Previous Category Name</Form.Label>
            <Form.Control
              type="text"
              required
              defaultValue={categoryName}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Choose Category</Form.Label>
            <Form.Select
              onChange={(e) => {
                setCategoryId(e.target.value);
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
            <Form.Label>Previous SubCategory</Form.Label>
            <Form.Control
              type="text"
              required
              defaultValue={subCategoryName}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Choose Sub-Category</Form.Label>
            <Form.Select
              onChange={(e) => setSubCategoryId(e.target.value)}
              required
            >
              <option>-- Select Sub-Category --</option>
              {subCatArr?.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
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
            <Form.Label>MRP</Form.Label>
            <Form.Control
              type="number"
              step={0.01}
              required
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Do you want activate discount in this product
            </Form.Label>
            <Form.Select
              onChange={(e) => setDicountActive(e.target.value)}
              required
            >
              <option></option>
              <option value={"true"}>Yes</option>
              <option value={"false"}>NO</option>
            </Form.Select>
          </Form.Group>

          {discountActive === "true" ? (
            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                step={0.01}
                min={0}
                max={100}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>
          ) : (
            ""
          )}

          <Form.Group className="mb-3">
            <Form.Label>Return Policy</Form.Label>
            <FloatingLabel>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                required
                onChange={(e) => setReturnPolicy(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Do you want add Varient in this product</Form.Label>
            <Form.Select onChange={(e) => setVariant(e.target.value)} required>
              <option></option>
              <option value={"true"}>Yes</option>
              <option value={"false"}>NO</option>
            </Form.Select>
          </Form.Group>
          {varient === "false" ? (
            <Form.Group className="mb-3">
              <Form.Label>Do you want add Size in this product</Form.Label>
              <Form.Select onChange={(e) => setSize(e.target.value)} required>
                <option></option>
                <option value={"true"}>Yes</option>
                <option value={"false"}>NO</option>
              </Form.Select>
            </Form.Group>
          ) : (
            ""
          )}

          {varient === "false" && size === "false" ? (
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                min={0}
                onChange={(e) => setStock(e.target.value)}
              />
            </Form.Group>
          ) : (
            ""
          )}

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
    </section>
  );
};

export default HOC(EditProduct);
