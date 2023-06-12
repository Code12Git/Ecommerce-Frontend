import React, { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",

    category: "",
    company: "",
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, price, category, company } = product;

    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user:", user);
    const userId = user ? user._id : null;
    console.log("userId:", userId);
    try {
      const res = await axios.post(
        "/products/add",
        {
          name: name,
          price: price,
          category: category,
          company: company,
          userId: userId,
        },
        {
          headers: {
            Authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      setProduct(res.data);
      navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-serif bg-gradient-to-b from-orange-200 via-yellow-900 to-red-500 text-transparent bg-clip-text font-bold">
        ADD PRODUCT
      </h1>
      <div className="mt-10 bg-zinc-400 p-10 rounded-lg">
        <form className="flex flex-col gap-3">
          <div className="flex flex-col ">
            <label className="text-lg mb-2">Product Name</label>
            <input
              type="text"
              value={product.name}
              onChange={handleChange}
              name="name"
              className="rounded-md p-1 text-lg"
            />
            {error && !product.name && (
              <span className="text-red-600">Enter valid name</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-lg mb-2">Product Price</label>
            <input
              type="text"
              onChange={handleChange}
              value={product.price}
              name="price"
              className="rounded-md p-1 text-lg"
            />
            {error && !product.price && (
              <span className="text-red-600">Enter valid Price</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-lg mb-2">Product Category</label>
            <input
              type="text"
              onChange={handleChange}
              value={product.category}
              name="category"
              className="rounded-md p-1 text-lg"
            />
            {error && !product.category && (
              <span className="text-red-600">Enter valid Category</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-lg mb-2">Product Company</label>
            <input
              type="text"
              onChange={handleChange}
              value={product.company}
              name="company"
              className="rounded-md p-1 text-lg"
            />
            {error && !product.company && (
              <span className="text-red-600">Enter Company name</span>
            )}
          </div>
          <button
            onClick={submitHandler}
            className="bg-red-400 text-lg  text-white p-1 rounded-md hover:bg-red-600 mt-5 "
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
