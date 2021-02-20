import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

import Order from "../components/order";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);

  const baseUrl = process.env.REACT_APP_BASEURL;

  const getOrders = async () => {
    // try {
    const userOrders = await axios.get(`${baseUrl}/orders`, {
      headers: {
        Authorization: `Bearer ${user.jwt}`,
      },
    });
    setOrders(userOrders.data);
    console.log(orders);
  };

  useEffect(() => {
    getOrders();

    const interval = setInterval(() => {
      getOrders();
      console.log(orders);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="order-container">
        {orders.map((order) => (
          <Order
            id={order.id}
            key={order.id}
            drink={order.drink}
            quantity={order.quantity}
            tableNum={order.tableNum}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
