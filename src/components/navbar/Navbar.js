import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Divider from '@material-ui/core/Divider';
import "bootstrap/dist/css/bootstrap.min.css";
import './Navbar.css';




export function Header() {
    const history = useHistory();
    const [isLoggedIn, setLogin] = useState(false);
    return (
        <div>
            <Navbar className="navbar-custom">
                <Container>
                    <Navbar.Brand href="./"><strong><span className="text-light">My</span><span className="text-primary">Jobs</span></strong></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        {
                            !isLoggedIn ? (<Button className="custom-button" onClick={() => history.push('/login')}>Login/Signup</Button>) : (<Navbar.Text>
                                Signed in as: <a href="#login">Mark Otto</a>
                            </Navbar.Text>)
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Divider className="dividerTop" variant="middle" light={false} />
        </div >);
}