import { useFormik } from "formik";
import signImg from "../../assets/signup-image.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

export default function Register() {
  let [userError, setUserError] = useState("");

  let navigate = useNavigate();
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "min length is 3")
      .max(15, "max length is 15")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{8,15}$/,
        "Password at least 8 and most 15 characters and has at least one special character "
      )
      .required("password is required"),
    age: Yup.number()
      .min(16, "you are too young")
      .max(60, "you are too old")
      .required("Age is required"),

    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Egyptian numbers only")
      .required("Phone is required"),
  });
  async function handleRegister(values) {
    await axios
      .post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
      .then((res) => {
        console.log(res.data);
        if (res?.data?.msg == "done") {
          navigate("/login");
        }
      })
      .catch((err) => {
        setUserError(err?.response?.data?.msg);
      });
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    onSubmit: handleRegister,
    validationSchema,
  });
  return (
    <>
      <div className="row justify-content-around">
        <div className="col-md-5 ">
          <img src={signImg} className="w-100" alt="" />
        </div>
        <div className="col-md-5 text-start">
          {userError ? (
            <p className="bg-primary text-white p-2 rounded-2 my-2 ">
              {" "}
              {userError}
            </p>
          ) : (
            ""
          )}

          <h3 className="my-2">Register Now : </h3>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name ? (
                <p className="bg-primary text-white p-2 rounded-2 my-2">
                  {" "}
                  {formik.errors.name}
                </p>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
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
                name="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
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

            <Form.Group className="mb-3" controlId="age">
              <Form.Label>Age </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Age"
                name="age"
                value={formik.values.age}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.age && formik.touched.age ? (
                <p className="bg-primary text-white p-2 rounded-2 my-2">
                  {" "}
                  {formik.errors.age}
                </p>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone </Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter Phone"
                name="phone"
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.phone && formik.touched.phone ? (
                <p className="bg-primary text-white p-2 rounded-2 my-2">
                  {" "}
                  {formik.errors.phone}
                </p>
              ) : (
                ""
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>

            <p className="mt-2">
              Already have account ?{" "}
              <Link to="/login">
                <span>Login</span>
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
}
