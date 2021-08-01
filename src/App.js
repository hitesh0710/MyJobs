import { Routes } from './Routes';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Toast from './components/toaster/Toaster';

function App() {
  return (
    <div className="mainBg">
      <div className="bgView">
        <Routes />
        <Toast />
      </div>
    </div>
  );
}

export default App;
