import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

import Order from "../components/order";

const Completed = () => {
  const [completed, setCompleted] = useState([]);
  const { user } = useContext(UserContext);

  let baseUrl = process.env.REACT_APP_BASEURL;

  const clearAll = async (e) => {
    completed.forEach(async (item) => {
      const delRes = await axios.delete(`${baseUrl}/completeds/${item.id}`, {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });
      console.log(delRes.data);
    });
  };

  const getCompleted = async () => {
    const userOrders = await axios.get(`${baseUrl}/completeds`, {
      headers: {
        Authorization: `Bearer ${user.jwt}`,
      },
    });
    setCompleted(userOrders.data);
  };

  useEffect(() => {
    getCompleted();
    const interval = setInterval(() => {
      getCompleted();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="order-container">
        <div className="clr-div">
          {completed.length > 0 && <button onClick={clearAll}>Clear</button>}
        </div>

        {completed.map((completed) => (
          <Order
            id={completed.id}
            key={completed.id}
            drink={completed.drink}
            quantity={completed.quantity}
            tableNum={completed.tableNum}
          />
        ))}
      </div>
    </>
  );
};

export default Completed;
