import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const handleSearch = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <input
        className="search-product-box"
        type="text"
        placeholder="Search Products"
        onChange={handleSearch}
      />
      <ul>
        <li style={{ width: "60px" }}>S/N</li>
        <li>Name</li>
        <li style={{ width: "90px" }}>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li style={{ width: "130px" }}>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={index} className="products-ul">
            <li style={{ width: "60px" }}>{index}</li>
            <li>{item?.name}</li>
            <li style={{ width: "90px" }}>{item?.price}</li>
            <li>{item?.category}</li>
            <li>{item?.company}</li>
            <li style={{ width: "130px" }}>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link
                to={"/update/" + item._id}
                style={{
                  color: "#262626",
                  textDecoration: "none",
                  fontWeight: "bold",
                  marginLeft: "10px",
                  background: "#ccccb3",
                  padding: "2px 4px",
                  borderRadius: "5px",
                }}
              >
                Update
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <h1 style={{ marginTop: "15px" }}>No Result Found..</h1>
      )}
    </div>
  );
};

export default ProductList;
