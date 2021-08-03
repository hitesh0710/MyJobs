import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from './App';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { isLoggedIn } = React.useContext(UserContext);

    return (
        <Route
            {...rest}
            render={(props) => !!isLoggedIn
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    );
}

export default PrivateRoute