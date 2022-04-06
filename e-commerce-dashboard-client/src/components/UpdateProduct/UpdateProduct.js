import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getProductDetails();
  }, []);
  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params?.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    setName(result?.name);
    setPrice(result?.price);
    setCategory(result?.category);
    setCompany(result?.company);
  };

  const updateProduct = async () => {
    console.log({ name, price, category, company });

    let result = await fetch(`http://localhost:5000/product/${params?.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
  };

  return (
    <div className="signup">
      <input
        className="signup-input"
        type="text"
        value={name}
        placeholder="Enter Product Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <input
        className="signup-input"
        type="text"
        value={price}
        placeholder="Enter Product Price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <input
        className="signup-input"
        type="text"
        value={category}
        placeholder="Enter Product Category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <input
        className="signup-input"
        type="text"
        value={company}
        placeholder="Enter Product Company"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />

      <button type="button" onClick={updateProduct} className="signup-button">
        Update Product
      </button>
    </div>
  );
};

export default AddProduct;
