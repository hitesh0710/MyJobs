import React from 'react';
import { Routes } from './Routes';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Toast from './components/toaster/Toaster';

export const UserContext = React.createContext(
  {
    isLoggedIn: false,
    setLogin: () => { },
    authToken: undefined,
    setToken: () => { },
    userName: undefined,
    setUser: () => { }
  }
);
const UserContextProvider = UserContext.Provider;

function App() {

  const parsedLoggedIn = JSON.parse(localStorage.getItem("login")) || false;
  const name = localStorage.getItem('name') || '';
  const token = localStorage.getItem('token') || '';
  const [isLoggedIn, setLogin] = React.useState(parsedLoggedIn);
  const [authToken, setToken] = React.useState(token);
  const [userName, setUser] = React.useState(name);

  React.useEffect(() => {
    localStorage.setItem('login', isLoggedIn);
    localStorage.setItem('name', userName);
    localStorage.setItem('token', authToken);
  }, [isLoggedIn, authToken, userName]);

  let user = {
    isLoggedIn,
    setLogin,
    authToken,
    setToken,
    userName,
    setUser
  };
  return (
    <UserContextProvider value={user}>
      <div className="mainBg">
        <div className="bgView">
          <Routes />
          <Toast />
        </div>
      </div>
    </UserContextProvider>
  );
}

export default App;
