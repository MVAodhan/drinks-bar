import React, { useContext, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import { IconButton } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const Order = ({ drink, tableNum, id }) => {
  const { user } = useContext(UserContext);
  const baseUrl = process.env.REACT_APP_BASEURL;
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  let location = useLocation();
  let path = location.pathname;

  const checkHandler = async (e) => {
    console.log(drink);
    const completedData = {
      drink,
      tableNum,
    };
    console.log(completedData.drink);
    console.log(completedData.tableNum);
    setLoading(!loading);
    setDisabled(!disabled);
    const compData = axios.post(
      `${baseUrl}/completeds`,
      {
        drink,
        tableNum,
      },
      {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      }
    );
    console.log(compData.data);
    // console.log(compData.data.id);
    console.log(id);
    const delData = await axios.delete(`${baseUrl}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${user.jwt}`,
      },
    });
    console.log(delData.data);
    setDisabled(!disabled);
    setLoading(!loading);
  };
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjEzNjA2ODIwLCJleHAiOjE2MTYxOTg4MjB9.
  //B6u8TgPwjz1f07LK5bjLg3PJHLKzFccNkmr5bNtNOGw
  return (
    <div className="order">
      <div className="order-mid">
        {drink}
        <div className="table-details">
          Table: <span className="digit">{tableNum || 4}</span>
        </div>
      </div>
      <div value={drink} className="order-right">
        {path !== "/completed" && (
          // <AiFillCheckCircle
          //   id={id}
          //   className="check-icon"
          //   onClick={checkHandler}
          //   drink={drink}
          // />
          <IconButton
            aria-label="Search database"
            icon={<CheckIcon />}
            id={id}
            drink={drink}
            onClick={checkHandler}
            isDisabled={disabled}
            isLoading={loading}
          />
        )}
        {path !== "/" && path !== "/completed" && (
          <AiFillCloseCircle className="delete-icon" />
        )}
      </div>
    </div>
  );
};

export default Order;
