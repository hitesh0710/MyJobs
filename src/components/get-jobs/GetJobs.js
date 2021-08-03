import React, { useContext } from 'react';
import axios from 'axios';
import './GetJobs.css';
import { baseUrl } from '../../Urls';
import Card from 'react-bootstrap/Card'
import { UserContext } from '../../App';

function ShowJobs({ job }) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
        </Card>
    );
}

function GetJobs() {
    const [jobs, setJobs] = React.useState([]);
    const { authToken } = useContext(UserContext);
    React.useEffect(() => {
        console.log(authToken);
        axios.get(`${baseUrl}/recruiters/jobs`, {
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpQGdtYWlsLmNvbSIsIm5hbWUiOiJQaWthIiwic2tpbGxzIjoiU3BlYWtpbmciLCJ1c2VyUm9sZSI6MCwiY3JlYXRlZEF0IjoiMjAyMS0wOC0wMlQxNjoxMDoyOS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wOC0wMlQxNjoxMDoyOS4wMDBaIiwiaWQiOiJlMjllNjUwMC02ZGFkLTRlZTQtOTdmZC0zODlkYzlkMDM3MTYiLCJpYXQiOjE2Mjc5MjA3MDR9.ZCLqBl8rFIyrykhEe_lWAYqJI1SzsKc9xLisv6QAcYY'
            }
        }).then(res => {
            setTimeout(() => {
                setJobs(res.data.data.data);
                console.log(res.data.data.data);
            }, 1000)
        }).catch((error) => {
            console.log(error);
        });

    }, []);
    return (
        <div>
            <h2 className="text-white">Jobs posted by you</h2>
            {
                jobs.map((job) => {
                    return <ShowJobs job={job} />;
                })
            }
            <ShowJobs />
        </div>
    );
}

export default GetJobs;
