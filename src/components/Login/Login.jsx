import React, { useEffect } from "react";
import loginImg from "../../assets/signin-image.jpg";
import style from "./Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";

export default function Login() {
  let [userError, setUserError] = useState("");

  let navigate = useNavigate();

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{8,15}$/,
        "Password at least 8 and most 15 characters and has at least one special character "
      )
      .required("password is required"),
  });

  async function handleLogin(values) {
    await axios
      .post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values)
      .then((res) => {
        console.log(res);
        if (res?.data?.msg == "done") {
          localStorage.setItem("userToken",res.data.token)
          navigate("/");

        }
      })
      .catch((err) => {
        setUserError(err?.response?.data?.msg);
        console.log(err);
      });
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema,
  });

  return (
    <>
      <div className="row justify-content-around ">
        <div className="col-md-5 text-start order-lg-0 order-1">
        {userError ? (
            <p className="bg-primary text-white p-2 rounded-2 my-2 ">
              {" "}
              {userError}
            </p>
          ) : (
            ""
          )}
          <h3 className="my-4">Login Now : </h3>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="email"
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email ? (
                <p className="bg-primary text-white p-2 rounded-2 my-2">
                  {" "}
                  {formik.errors.email}
                </p>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="password"
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password ? (
                <p className="bg-primary text-white p-2 rounded-2 my-2">
                  {" "}
                  {formik.errors.password}
                </p>
              ) : (
                ""
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <p className="my-3">
              Don't have account ?{" "}
              <Link to="/register">
                <span>Register</span>
              </Link>
            </p>
          </Form>
        </div>
        <div className="col-md-5">
          <img src={loginImg} className="w-100  " alt="" />
        </div>
      </div>
    </>
  );
}
