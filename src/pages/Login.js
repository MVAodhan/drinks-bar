import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, setUser } = useContext(UserContext);

  const baseUrl = process.env.REACT_APP_BASEURL;

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);

      data.user ? setUser(data) : setUser(null);

      console.log(user);

      if (data.message) {
        setError(data.message[0].messages[0].message);
        return;
      }
    } catch (err) {
      setError("Something went wrong " + err);
    }
    console.log(user);
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

      <form className="login-page-form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => {
            setError("");
            setEmail(e.target.value);
          }}
        />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => {
            setError("");
            setPassword(e.target.value);
          }}
        />
        <button className="form-login">Login</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
