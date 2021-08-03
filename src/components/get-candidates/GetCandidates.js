import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import './GetCandidates.css';
import { baseUrl } from '../../Urls';
import Card from 'react-bootstrap/Card'
import { UserContext } from '../../App';
import Avatar from 'react-avatar';
import { Container, Col, Row } from 'react-bootstrap';

function ShowCandidates({ candidate }) {
    return (
        <Card style={{ width: '25rem' }} >
            <Card.Body>
                <Card.Text>
                    <Container>
                        <Row >
                            <Col className="align-self-center">
                                <Avatar name={candidate.name} size="50" round="30px" />
                            </Col>
                            <Col>
                                {candidate.name}
                                <br />
                                {candidate.email}
                            </Col>
                        </Row>
                    </Container >
                </Card.Text>
                <h6>Skills:</h6>
                <Card.Text >{candidate.skills}</Card.Text>
            </Card.Body>
        </Card >
    );
}

function GetCandidates({ showCandidates, handleCandidates, id }) {
    const [candidates, setCandidates] = React.useState([]);
    const { authToken } = useContext(UserContext);
    const [isLoading, setLoad] = React.useState(true);
    const [error, setError] = React.useState(false);
    React.useEffect(() => {
        axios.get(`${baseUrl}/recruiters/jobs/${id}/candidates`, {
            headers: {
                'Authorization': authToken
            }
        }).then(res => {
            setTimeout(() => {
                setCandidates(res.data.data);
                setLoad(false);
            }, 1000)
        }).catch((error) => {
            setError(true);
        });

    }, []);


    if (showCandidates && error)
        return (<div>
            <Modal show={showCandidates} onHide={() => handleCandidates(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Applied Candidates</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="text-center alert alert-danger">An error occured, please try again later</h4>
                </Modal.Body>
            </Modal>
        </div>);
    if (showCandidates && isLoading)
        return (<div>
            <Modal show={showCandidates} onHide={() => handleCandidates(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Applied Candidates</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-black" style={{ width: '3rem', height: '3rem' }} role="status">
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>);

    return (
        <div>
            <Modal show={showCandidates} onHide={() => handleCandidates(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Applied Candidates</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-light flex-row overflow-auto">
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col"> {
                                    candidates ?
                                        (candidates.map((candidate) => {
                                            return <ShowCandidates candidate={candidate} key={candidate.id} />;
                                        })) : (<h4 className="text-center">No applications available!</h4>)
                                }</div>

                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default GetCandidates;
