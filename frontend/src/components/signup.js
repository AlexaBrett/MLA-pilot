"use client";
import React, { useState, useContext } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import Link from "next/link";
import { Context } from "../../context/contextProvider";

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { setIsLoggedIn, setCurrentUser } = useContext(Context);
  const onSignup = (username) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSignup = (username) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        formData
      );

      if (response.data === "User registered successfully!") {
        console.log("User registered successfully");
        onSignup(formData.username);
      } else {
        setError(response.data);
      }
    } catch (error) {
      console.error("Error during registration", error);
      setError(
        error.response?.data ||
          "An error occurred during registration. Please try again."
      );
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSignup}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ marginTop: "20px" }}>
          Signup
        </Button>
      </Form>
      <p className="mt-3">
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
