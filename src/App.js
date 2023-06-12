import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import PrivateComponent from "./Components/PrivateComponent";
import Login from "./Pages/Login";
import Products from "./Pages/Products";
import AddProduct from "./Pages/AddProduct";
import UpdateProduct from "./Pages/UpdateProduct";
import Profile from "./Pages/Profile";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/products" element={<Products />} />
          <Route path="/logout" element={<h1>Logout</h1>} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
