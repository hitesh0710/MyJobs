import React, { useContext } from 'react';
import axios from 'axios';
import './GetJobs.css';
import { baseUrl } from '../../Urls';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../../App';
import GetCandidates from '../get-candidates/GetCandidates';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { useHistory } from 'react-router-dom';

function ShowJobs({ job }) {
    const [showCandidates, handleCandidates] = React.useState(false);
    return (
        <div className="marginCard">
            <Card>
                <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Text className="textOverflow">
                        {job.description}
                    </Card.Text>
                    <div>
                        <div>
                            <LocationOnOutlinedIcon className="text-primary" /> {job.location}
                        </div>
                        <Button onClick={() => handleCandidates(true)} className="my-2 customButton">Applied Candidates</Button>
                    </div>
                </Card.Body >
            </Card >
            <GetCandidates showCandidates={showCandidates} handleCandidates={handleCandidates} id={job.id} />

        </div >
    );
}

function GetJobs() {
    const [jobs, setJobs] = React.useState([]);
    const { authToken } = useContext(UserContext);
    const [isLoading, setLoad] = React.useState(true);
    const [currData, setcurrData] = React.useState([])
    const [totalPic, settotalPic] = React.useState(0);
    const [currPage, setcurrPage] = React.useState(0);
    const [error, setError] = React.useState(false);
    const [isHR, setHR] = React.useState(false);
    const [empty, setEmpty] = React.useState(false);
    const history = useHistory();
    React.useEffect(() => {
        axios.get(`${baseUrl}/recruiters/jobs`, {
            headers: {
                'Authorization': authToken
            }
        }).then(res => {
            setTimeout(() => {
                setcurrPage(1);
                if (res.data.data) {
                    setJobs(res.data.data.data);
                    settotalPic(jobs.length);
                    const currPageData = jobs.slice(0, 10);
                    setLoad(false);
                    setcurrData(currPageData);
                }
                else if (res.status === 200) {
                    setEmpty(true);
                    setLoad(false);

                }
                else {
                    setHR(true);
                    setLoad(false);
                }
            }, 1000)
        }).catch((error) => {
            setError(true);
            setLoad(false);
        });

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const prevPage = (e) => {
        e.preventDefault();
        let nxtPage = currPage;
        nxtPage--;
        const currPageData = jobs.slice((nxtPage - 1) * 10, nxtPage * 10);
        setcurrPage(nxtPage);
        setcurrData(currPageData);

    }

    const nextPage = (e) => {
        e.preventDefault();
        let nxtPage = currPage;
        nxtPage++;
        const currPageData = jobs.slice(currPage * 10, nxtPage * 10);
        setcurrPage(nxtPage);
        setcurrData(currPageData);
        if (currData)
            console.log(currData);

    }
    const postJob = () => {
        history.push('/postjob');
    }
    if (empty)
        return (
            <div className="text-center">
                <h3 className="text-muted">Your posted jobs will show here</h3>
                <Button variant="primary" onClick={postJob} className="m-5">Post a Job</Button>
            </div>
        );
    if (isHR)
        return (<h4 className="text-center alert alert-danger">You are not authorized to view this page</h4>);
    if (error)
        return (<h4 className="text-center alert alert-danger">An error occured, please try again later</h4>);
    if (isLoading)
        return (<div>
            <h2 className="text-white">Jobs posted by you</h2>
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-white" style={{ width: '3rem', height: '3rem' }} role="status">
                </div>
            </div></div>);
    return (
        <div>
            <h2 className="text-white">Jobs posted by you</h2>
            <div className="parentDiv">
                {totalPic > 0 &&
                    <div>
                        {currPage > 1 && <button onClick={prevPage}> {`<`} </button>}
                        {currPage}
                        {currPage >= 1 && currPage < totalPic / 10 && <button onClick={nextPage}> {`>`} </button>}
                    </div>}

                {
                    jobs.map((job) => {
                        return <div className="childDiv" key={job.id}><ShowJobs job={job} /></div>;
                    })
                }

            </div>
        </div>
    );
}

export default GetJobs;
