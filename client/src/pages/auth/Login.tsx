import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = (): boolean => {
    let valid = true;
    let newErrors = { ...errors };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Login successful!");
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    const navigate = useNavigate();
    const navigateSignup = () => {
      navigate("/signup");
    };

  return (
    <Container
      fluid
      className="h-screen bg-indigo-700 flex items-center justify-center"
    >
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl"
      >
        <Row>
          <Col
            md={6}
            className="flex flex-col justify-center items-center bg-indigo-600 text-white rounded-l-xl p-8"
          >
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-lg">
              Log in to continue connecting with your friends and family.
            </p>
          </Col>
          <Col md={6} className="bg-white p-8 rounded-r-xl">
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
              Login
            </h2>

            <Form onSubmit={handleSubmit} className="space-y-4">
              <Form.Group controlId="formEmail" className="relative">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="focus:outline-none border-2 border-gray-300 p-3 rounded-lg w-full hover:border-purple-400 focus:border-purple-600 transition duration-300"
                  isInvalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </Form.Group>

              <Form.Group controlId="formPassword" className="relative">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="focus:outline-none border-2 border-gray-300 p-3 rounded-lg w-full hover:border-purple-400 focus:border-purple-600 transition duration-300"
                  isInvalid={!!errors.password}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                )}
              </Form.Group>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="primary"
                  type="submit"
                  className="w-full py-2 mt-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Login
                </Button>
              </motion.div>

              <div className="text-center mt-4">
                <p className="text-gray-500">
                  Don't have an account?{" "}
                  <span
                    onClick={navigateSignup}
                    className="text-purple-600 cursor-pointer hover:underline"
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default Login;
