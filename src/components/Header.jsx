import "./Header.css";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { appContext } from "../App";
export default function Header() {
  const { user, setUser, cart, products, orders } = useContext(appContext);
  const items = products.filter((value) => cart[value._id] > 0);
  const [myOrder, setMyOrder] = useState([]);
  useEffect(() => {
    setMyOrder(orders.filter((value) => value.email === user.email));
  }, [orders, user]);
  return (
    <div className="App-Header-Row">
      <h2>
        <span className="title-icon">🏺</span>
        Elegant-Ceramics
      </h2>
      <div>
        <Link to={"/"}>
          <span className="nav-icon">🏠</span>
          Home
        </Link>
        <Link to={"/cart"}>
          <span className="nav-icon">🛒</span>
          Cart({items.length})
        </Link>
        <Link to={"/orders"}>
          <span className="nav-icon">📦</span>
          Orders
        </Link>
        {user.email === "" || !user.email ? (
          <Link to={"/login"}>
            <span className="nav-icon">🔑</span>
            Login
          </Link>
        ) : (
          <Link
            to={"/login"}
            // onClick={() =>
            //   setUser({ ...user, name: "", email: "", password: "" })
            // }
          >
            <span className="nav-icon">🚪</span>
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}
