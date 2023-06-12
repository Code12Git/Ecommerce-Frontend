import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("/products", {
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    setProducts(res.data);
  };

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(`/products/${id}`, {
        headers: {
          Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      await res.data;
      if (res.data) {
        toast.success(res.data.message);
        fetchData();
      }
    } catch (err) {
      toast.error("Product deleted");
    }
  };

  const searchHandler = async (event) => {
    try {
      let key = event.target.value;
      if (key) {
        let result = await axios.get(`/search/${key}`, {
          headers: {
            Authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        result = await result.data;
        if (result) {
          setProducts(result);
        }
      }
    } catch (err) {
      fetchData();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <ToastContainer />
      <form className="flex items-center">
        <input
          type="text"
          className="px-4 py-2 mt-10 border w-full md:w-96 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search"
          onChange={searchHandler}
        />
      </form>
      <div className="container flex flex-wrap mx-auto mt-10 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                S.No
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Operation
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((item, index) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap">${item.price}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">{item.company}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => deleteHandler(item._id)}
                      className="text-white font-bold hover:bg-red-600 px-6 py-2 mt-3 rounded-md whitespace-no-wrap bg-red-400"
                    >
                      Delete
                    </button>
                    <button className="px-6 py-2 mt-3 text-white font-bold hover:bg-blue-600 rounded-md whitespace-no-wrap bg-blue-400">
                      <Link to={`/update/${item._id}`}>Update</Link>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
