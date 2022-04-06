import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link className="link" to="/">
              Products
            </Link>
          </li>
          <li>
            <Link className="link" to="/add">
              Add Product
            </Link>{" "}
          </li>

          <li>
            {" "}
            <Link className="link" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link className="link" to="/signup" onClick={logout}>
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul" style={{ textAlign: "right" }}>
          <li>
            <Link className="link" to="/signup">
              SignUP
            </Link>
          </li>
          <li>
            {" "}
            <Link className="link" to="/login">
              Login
            </Link>
          </li>{" "}
        </ul>
      )}
    </div>
  );
};
export default Nav;
