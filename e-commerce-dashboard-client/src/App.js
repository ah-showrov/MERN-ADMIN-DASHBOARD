import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddProduct from "./components/AddProduct/AddProduct";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProductList from "./components/ProductList/ProductList";
import SignUp from "./components/SignUp/SignUp";
import UpdateProduct from "./components/UpdateProduct/UpdateProduct";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/profile" element={<h1>Profile</h1>} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
