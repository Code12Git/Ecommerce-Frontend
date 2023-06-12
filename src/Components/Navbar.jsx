import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user"),
    token = localStorage.getItem("token");
  // Retrieve the token from local storage

  const userData =
    typeof auth === "string" && auth !== null ? JSON.parse(auth) : null;

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signup");
  };

  return (
    <header className="text-gray-600 body-font bg-slate-600">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <NavLink
          to="/products"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-2xl cursor-pointer bg-gradient-to-r from-blue-400 via-yellow-500 to-lime-400 text-transparent transition duration-300 ease-in-out transform hover:ease-in hover:-translate-y-1 hover:shadow-2xl bg-clip-text font-serif font-bold">
            Ecommerce-Dashboard
          </span>
        </NavLink>
        <nav className="md:ml-auto flex flex-wrap font-serif  items-center text-base justify-center text-white font-bold cursor-pointer">
          {auth ? (
            <>
              <NavLink
                to="/products"
                className="mr-5  hover:text-gray-900 transition duration-300 ease-in-out transform hover:ease-in hover:-translate-y-1 hover:shadow-2xl"
              >
                Products
              </NavLink>
              <NavLink
                to="/add"
                className="mr-5 hover:text-gray-900 transition duration-300 ease-in-out transform hover:ease-in hover:-translate-y-1 hover:shadow-2xl"
              >
                Add Products
              </NavLink>
              <NavLink
                to="/update/:id"
                className="mr-5 hover:text-gray-900 transition duration-300 ease-in-out transform hover:ease-in hover:-translate-y-1 hover:shadow-2xl"
              >
                Update Products
              </NavLink>

              <NavLink
                to="/profile"
                className="mr-5 hover:text-gray-900 transition duration-300 ease-in-out transform hover:ease-in hover:-translate-y-1 hover:shadow-2xl"
              >
                Profile
              </NavLink>
              <div className="flex items-center ">
                <li className="mr-6 hover:text-gray-900 transition duration-300 ease-in-out transform hover:ease-in hover:-translate-y-1 hover:shadow-2xl">
                  Logged in as:{" "}
                  <span className="text-purple-400">
                    {userData && userData.username}
                  </span>
                </li>
                <NavLink
                  className=" hover:text-gray-900 transition duration-300 ease-in-out transform hover:ease-in hover:-translate-y-1 hover:shadow-2xl"
                  onClick={logoutHandler}
                  to="/signup"
                >
                  Logout
                </NavLink>
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="mr-5 hover:text-gray-900 transition duration-300 ease-in-out transform hover:ease-in hover:-translate-y-1 hover:shadow-2xl"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="mr-5 hover:text-gray-900 transition duration-300 ease-in-out transform hover:ease-in hover:-translate-y-1 hover:shadow-2xl"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
