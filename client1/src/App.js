import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css';
import Navbar from './components/navbar';
import Home from './screens/Home';
import Bookingspage from './screens/bookingspage';
import Register from './screens/Register';
import Login from './screens/Login';

function App() {
  return (
    <div className="App">
      <Navbar/>
    
    
      <BrowserRouter>
      <Routes>
        <Route path="/bookings/:roomid/:fromdate/:todate" element={<Bookingspage />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;