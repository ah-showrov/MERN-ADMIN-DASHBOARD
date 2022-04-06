import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    alert("Product added Successfully");
    navigate("/");
    console.warn(result);
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
      {error && !name && (
        <small className="error-message">Please enter valid name</small>
      )}

      <input
        className="signup-input"
        type="text"
        value={price}
        placeholder="Enter Product Price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {error && !price && (
        <small className="error-message">Please enter valid price</small>
      )}
      <input
        className="signup-input"
        type="text"
        value={category}
        placeholder="Enter Product Category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {error && !category && (
        <small className="error-message">Please enter valid category</small>
      )}
      <input
        className="signup-input"
        type="text"
        value={company}
        placeholder="Enter Product Company"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      {error && !company && (
        <small className="error-message">Please enter valid company</small>
      )}
      <button
        type="button"
        onClick={handleAddProduct}
        className="signup-button"
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
