import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData._id ?? "";

  const [credentials, setCredentials] = useState({
    username: userData.username ?? "",
    email: userData.email ?? "",
    password: "",
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`/users/${userId}`, {
          headers: {
            Authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        const updatedUserData = res.data;
        setCredentials({
          username: updatedUserData.username,
          email: updatedUserData.email,
          password: "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, [userId]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/users/${userId}`,
        {
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        },
        {
          headers: {
            Authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );

      // Update the local storage with the updated user data
      const updatedUserData = {
        ...userData,
        username: credentials.username,
      };
      localStorage.setItem("user", JSON.stringify(updatedUserData));

      toast.success("User updated successfully");
      // Update the state or perform any necessary actions after successful update
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const deleteHandler = async (e) => {
    try {
      await axios.delete(`/users/${userId}`, {
        headers: {
          Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      localStorage.removeItem("user");
      toast.success("User has been deleted");
      navigate("/login");
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <div>
      <ToastContainer />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center ">
          <div className="lg:w-2/6 md:w-1/2 mx-auto bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Profile
            </h2>
            <div class="relative mb-4">
              <label
                for="full-name"
                className="leading-7 text-sm text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="full-name"
                name="username"
                value={credentials.username}
                onChange={inputChangeHandler}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="email" className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={inputChangeHandler}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="email" className="leading-7 text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={inputChangeHandler}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
              <button
                onClick={submitHandler}
                className="text-white w-full bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Update Profile
              </button>

              <img
                src="/delete.png"
                alt="delete"
                className="h-6 w-6 cursor-pointer "
                onClick={deleteHandler}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
