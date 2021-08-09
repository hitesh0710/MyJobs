import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import './Signup.css';
import { snackbar } from '../toaster/Toaster'
import { baseUrl } from '../../Urls';
import { UserContext } from '../../App';

export default function Signup() {

    const { isLoggedIn } = useContext(UserContext);
    const schema = yup.object().shape({
        email: yup.string().email("*Must be a valid email address")
            .max(100, "*Email must be less than 100 characters").required(),
        password: yup.string().min(6, "*Password must have at least 6 characters")
            .max(50, "*Password can't be longer than 100 characters").required(),
        name: yup.string().min(2, "*Name must have at least 2 characters")
            .max(100, "*Names can't be longer than 100 characters").required(),
        userRole: yup.number().required(),
        confirmPassword: yup.string().min(6, "*Password must have at least 6 characters")
            .max(50, "*Password can't be longer than 100 characters").required(),
        skills: yup.string().min(3, "*Skills must have at least 3 characters")
            .max(150, "*Skills can't be longer than 150 characters").required()
    });

    if (isLoggedIn)
        return (<Redirect to={{ pathname: '/jobs', }} />)

    return (
        <div className="SignupBox parent">
            <div className="m-4 center">
                <h3>Signup</h3>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        axios.post(`${baseUrl}/auth/register`, values)
                            .then(res => {
                                snackbar("notification", "user created successfully");
                                resetForm();
                                setSubmitting(false);
                            })
                            .catch((error) => {
                                if (error) {
                                    snackbar("error", "user already exists");
                                    setSubmitting(false);
                                }
                            });
                    }}
                    initialValues={{
                        email: '',
                        password: '',
                        name: '',
                        userRole: 0,
                        confirmPassword: '',
                        skills: ''
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        errors,
                        isSubmitting
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik100"
                                    className="position-relative"
                                >
                                    <Form.Label>I'm a*</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Recruiter"
                                        name="userRole"
                                        id="formHorizontalRadios1"
                                        value={0}
                                        onChange={handleChange}
                                        defaultChecked
                                        className="radio-toolbar"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Candidate"
                                        name="userRole"
                                        value={1}
                                        id="formHorizontalRadios2"
                                        onChange={handleChange}
                                        className="radio-toolbar"
                                    />
                                    {touched.userRole && errors.userRole ? (
                                        <div className="error-message">{errors.userRole}</div>
                                    ) : null}
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    <Form.Label>Full Name*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        placeholder="Enter your full name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={touched.name && errors.name ? "textboxBg error" : "textboxBg"}
                                    />
                                    {touched.name && errors.name ? (
                                        <div className="error-message">{errors.name}</div>
                                    ) : null}
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik102"
                                    className="position-relative"
                                >
                                    <Form.Label>Email address*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        value={values.email}
                                        placeholder="Enter your email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={touched.email && errors.email ? "textboxBg error" : "textboxBg"}
                                    />
                                    {touched.email && errors.email ? (
                                        <div className="error-message">{errors.email}</div>
                                    ) : null}
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik103"
                                    className="position-relative customPadding"
                                >
                                    <Form.Label>
                                        Create Password*
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={touched.password && errors.password ? "textboxBg error" : "textboxBg"}
                                    />
                                    {touched.password && errors.password ? (
                                        <div className="error-message">{errors.password}</div>
                                    ) : null}
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik104"
                                    className="position-relative"
                                >
                                    <Form.Label>
                                        Confirm Password*
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Enter your password"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={(touched.confirmPassword && errors.confirmPassword) || values.password !== values.confirmPassword ? "textboxBg error" : "textboxBg"}
                                    />
                                    {!(touched.confirmPassword && errors.confirmPassword) && values.password !== values.confirmPassword ? (
                                        <div className="error-message">passwords are not same</div>
                                    ) : null}
                                    {touched.confirmPassword && errors.confirmPassword ? (
                                        <div className="error-message">{errors.confirmPassword}</div>
                                    ) : null}
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik106"
                                    className="position-relative"
                                >
                                    <Form.Label>Skills*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="skills"
                                        value={values.skills}
                                        placeholder="Enter comma seperated skills"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={touched.skills && errors.skills ? "textboxBg error" : "textboxBg"}
                                    />
                                    {touched.skills && errors.skills ? (
                                        <div className="error-message">{errors.skills}</div>
                                    ) : null}
                                </Form.Group>
                            </Row>
                            <div className="mt-3 text-center">
                                <Button type="submit" disabled={isSubmitting}>Signup</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="text-center mt-4">
                    <p>Have an account? <a href="/login" className="hreflink">Login</a></p>
                </div>
            </div>
        </div>
    );
}
