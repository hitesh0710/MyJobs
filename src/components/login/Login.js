import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import "bootstrap/dist/css/bootstrap.min.css";
import './Login.css';

export default function Login() {

    const schema = yup.object().shape({
        email: yup.string().email("*Must be a valid email address")
            .max(100, "*Email must be less than 100 characters").required(),
        password: yup.string().min(2, "*Password must have at least 2 characters")
            .max(50, "*Password can't be longer than 50 characters").required(),
    });

    return (
        <div className="loginBox parent">
            <div className="m-4 center">
                <h3>Login</h3>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        setTimeout(() => {
                            console.log(values);
                            resetForm();
                            setSubmitting(false);
                        }, 500);
                    }}
                    initialValues={{
                        email: '',
                        password: '',
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
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    <Form.Label>Email address</Form.Label>
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
                            <Row className="mb-4">
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik102"
                                    className="position-relative"
                                >
                                    <Form.Label>
                                        Password
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
                            </Row>
                            <div className="mt-3 text-center">
                                <Button type="submit" disabled={isSubmitting}>Login</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="text-center mt-4">
                    <a href="/forgot-password" className="hreflink">Forgot your password?</a>
                    <br />
                    or
                    <p>New to MyJobs? <a href="/signup" className="hreflink">Create New Account</a></p>
                </div>
            </div>
        </div>
    );
}
