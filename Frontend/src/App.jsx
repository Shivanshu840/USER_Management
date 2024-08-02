import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './Component/Login';
import RegisterPage from './Component/SignUp';
import 'bootstrap/dist/css/bootstrap.css';
import LandingPage from './Component/Landing';
import User_Profile from './Component/Profile';
import UpdateProfile from './Component/Update';
import DeleteProfile from './Component/Delete';
import Footer from './Component/Footer';
import { useState, useEffect } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = (navigate) => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <Appbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/userprofile" element={isLoggedIn ? <User_Profile /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/update-profile" element={isLoggedIn ? <UpdateProfile /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/delete-profile" element={isLoggedIn ? <DeleteProfile /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </div>
        
        <Footer />
      </BrowserRouter>
    </div>
  );

  function Appbar({ isLoggedIn, handleLogout }) {
    const navigate = useNavigate();

    return (
      <div className="container-fluid my-2">
        <div className="row justify-content-between border align-items-center">
          <div className="col-lg-4 mt-3 mb-3">
            <h3>USER-MANAGEMENT</h3>
          </div>
          <div className="col-lg-4 d-flex justify-content-end mt-3 mb-3">
            <button className="btn btn-outline-dark btn-lg me-4 p-1" onClick={() => navigate("/")}>Home</button>
            {isLoggedIn ? (
              <>
                <button className="btn btn-outline-dark btn-lg me-4 p-1" onClick={() => navigate("/userprofile")}>Profile</button>
                <button className="btn btn-outline-dark btn-lg me-4 p-1" onClick={() => handleLogout(navigate)}>Logout</button>
              </>
            ) : (
              <button className="btn btn-outline-dark btn-lg me-4 p-1" onClick={() => navigate("/Login")}>Login</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
