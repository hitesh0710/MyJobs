import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from './components/home/Home';
import Login from './components/login/Login';
import { Header } from './components/navbar/Navbar';
import ForgotPassword from './components/forgot-password/ForgotPassword';
import Signup from './components/signup/Signup';
import GetJobs from './components/get-jobs/GetJobs';
import PrivateRoute from './PrivateRoutes';
import PostJob from './components/post-job/PostJob';

export function Routes() {

    return (
        <Router>
            <div className="container">
                <Header />
                <br />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute path="/jobs" component={GetJobs} />
                <PrivateRoute path="/postjob" component={PostJob} />
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
            </div>
        </Router>
    );

}