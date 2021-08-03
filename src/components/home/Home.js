import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import './Home.css';
import Button from 'react-bootstrap/Button'
import { Container, Col, Row } from 'react-bootstrap';
import { UserContext } from '../../App';

function Home() {
    const { isLoggedIn } = useContext(UserContext);
    if (isLoggedIn)
        return (<Redirect to={{ pathname: '/jobs', }} />)
    return (
        <Container className="mt-4">
            <Row className="justify-content-md-center">
                <Col className="align-self-center">
                    <h1><span className="text-light">Welcome to</span></h1>
                    <h1><span className="text-light">My</span><span className="text-primary">Jobs</span></h1>
                    <Button variant="primary">Get Started</Button>
                </Col>
                <Col>
                    <img src='/img/keren-levand-pm-e64IOYHM-unsplash.jpg' className="img-style" alt="office-girl" />
                </Col>
            </Row>
        </Container >
    );
}

export default Home;
