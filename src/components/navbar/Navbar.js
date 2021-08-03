import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from 'react-avatar';
import "bootstrap/dist/css/bootstrap.min.css";
import './Navbar.css';
import { UserContext } from '../../App';

export function Header() {
    const history = useHistory();
    const { isLoggedIn, userName, setLogin, setUser } = useContext(UserContext);
    const logout = () => {
        setLogin(false);
        setUser('');
    }
    return (
        <div>
            <Navbar className="navbar-custom">
                <Container>
                    <Navbar.Brand href="./"><strong><span className="text-light">My</span><span className="text-primary">Jobs</span></strong></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        {
                            !isLoggedIn ? (<Button className="custom-button" onClick={() => history.push('/login')}>Login/Signup</Button>) : (<Navbar.Text>
                                <Avatar name={userName} size="40" round="30px" />
                                <Button onClick={logout}>logout</Button>
                            </Navbar.Text>)
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Divider className="dividerTop" variant="middle" light={false} />
        </div >);
}