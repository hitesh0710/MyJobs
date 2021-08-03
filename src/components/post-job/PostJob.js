import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import './PostJob.css';
import { snackbar } from '../toaster/Toaster'
import { baseUrl } from '../../Urls';
import { UserContext } from '../../App';

export default function PostJob() {

    const { authToken } = useContext(UserContext);
    const history = useHistory();
    const schema = yup.object().shape({
        title: yup.string().min(2, "*title must have at least 2 characters")
            .max(50, "*title can't be longer than 50 characters").required(),
        description: yup.string().min(2, "*description must have at least 4 characters")
            .max(256, "*description can't be longer than 256 characters").required(),
        location: yup.string().min(2, "*location must have at least 2 characters")
            .max(100, "*location can't be longer than 100 characters").required(),
    });

    return (
        <div className="postJobBox parent">
            <div className="m-4 center">
                <h3>Post a Job</h3>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        axios.post(`${baseUrl}/jobs`, values, {
                            headers: {
                                'Authorization': authToken
                            }
                        })
                            .then(res => {
                                history.push(`/jobs`);
                                snackbar("notification", "job posted successfully");
                                resetForm();
                                setSubmitting(false);
                            })
                            .catch((error) => {
                                if (error) {
                                    snackbar("error", "some error ocurred");
                                    setSubmitting(false);
                                }
                            });
                    }}
                    initialValues={{
                        title: '',
                        description: '',
                        location: ''
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
                                    <Form.Label>Job title*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={values.title}
                                        placeholder="Enter your job title"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={touched.title && errors.title ? "textboxBg error" : "textboxBg"}
                                    />
                                    {touched.title && errors.title ? (
                                        <div className="error-message">{errors.title}</div>
                                    ) : null}
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik102"
                                    className="position-relative"
                                >
                                    <Form.Label>Description*</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        value={values.email}
                                        placeholder="Enter job description"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={touched.description && errors.description ? "textboxBg error" : "textboxBg"}
                                    />
                                    {touched.description && errors.description ? (
                                        <div className="error-message">{errors.description}</div>
                                    ) : null}
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik103"
                                    className="position-relative"
                                >
                                    <Form.Label>
                                        Location*
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="location"
                                        placeholder="Enter location"
                                        value={values.location}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={touched.location && errors.location ? "textboxBg error" : "textboxBg"}
                                    />
                                    {touched.location && errors.location ? (
                                        <div className="error-message">{errors.location}</div>
                                    ) : null}
                                </Form.Group>
                            </Row>
                            <div className="mt-3 text-center">
                                <Button type="submit" disabled={isSubmitting}>Post</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
