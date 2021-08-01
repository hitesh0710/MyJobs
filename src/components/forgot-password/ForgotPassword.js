import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import "bootstrap/dist/css/bootstrap.min.css";
import './ForgotPassword.css';


export default function ForgotPassword() {

    const schema = yup.object().shape({
        password: yup.string().min(6, "*Password must have at least 6 characters")
            .max(50, "*Password can't be longer than 50 characters").required(),
        confirmPassword: yup.string().min(6, "*Name must have at least 6 characters")
            .max(50, "*Password can't be longer than 50 characters").required(),
    });

    return (
        <div className="ForgotPasswordBox parent">
            <div className="m-4 center">
                <h3>Reset Your Password</h3>
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
                        password: '',
                        confirmPassword: ''
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
                                    <Form.Label>New password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        placeholder="Enter your password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={touched.password && errors.password ? "textboxBg error" : "textboxBg"}
                                    />
                                    {touched.password && errors.password ? (
                                        <div className="error-message">{errors.password}</div>
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
                                        Confirm new password
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
                            <div className="mt-3 text-center">
                                <Button type="submit" disabled={isSubmitting}>Reset</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
