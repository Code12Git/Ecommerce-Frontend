import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  console.log(params);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [company, setCompany] = useState();

  const productId = params.id || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/products/${productId}`, {
          headers: {
            Authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        console.log(res.data);
        let { name, category, price, company } = res.data; // Access res.data for the response data
        setName(name);
        setPrice(price);
        setCategory(category);
        setCompany(company);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/products/${productId}`,
        {
          name,
          price,
          category,
          company,
        },
        {
          headers: {
            Authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      await res.data;
      toast.success("Product Updated successfully") && navigate("/products");
    } catch (err) {
      toast.error("Error updating");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-serif bg-gradient-to-l from-orange-400 via-yellow-700 to-red-600 text-transparent bg-clip-text font-bold">
        UPDATE PRODUCT
      </h1>
      <div className="mt-10 bg-blue-400 p-10 rounded-lg">
        <form className="flex flex-col gap-3">
          <div className="flex flex-col ">
            <label className="text-lg mb-2 text-white">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              className="rounded-md p-1 text-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg mb-2 text-white">Product Price</label>
            <input
              type="text"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-md p-1 text-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg mb-2 text-white">Product Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              className="rounded-md p-1 text-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg mb-2 text-white">Product Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              name="company"
              className="rounded-md p-1 text-lg"
            />
          </div>
          <button
            onClick={submitHandler}
            className="bg-red-400 text-lg  text-white p-1 rounded-md hover:bg-red-600 mt-5 "
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
