import 'bootstrap/dist/css/bootstrap.css';
import { FaLock, FaUserSecret } from "react-icons/fa";
import { BiSolidUserCircle } from "react-icons/bi";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LoginPage({ setIsLoggedIn }) {
    const [useremail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://user-management-yru9.onrender.com/register/login", {
                useremail,
                password
            });

            if (response.data.token) {
                sessionStorage.setItem('token', response.data.token);
                setIsLoggedIn(true); 
                setError("");
                navigate('/'); 
            }
        } catch (error) {
            console.error("There was an error!", error);
            setError("Invalid credentials");
        }
    };

    return (
        <div className="container my-5" style={{ height: '70vh' }}>
            <div className="row justify-content-center align-items-center" style={{ height: '100%' }}>
                <div className="col-12 col-md-6 col-lg-4 my-3 rounded border border-5 shadow-lg py-5 position-relative" style={{ minHeight: '400px' }}>
                    <BiSolidUserCircle style={{ fontSize: '5rem', position: 'absolute', top: '-3.0rem', left: '50%', transform: 'translateX(-50%)' }} />
                    <form onSubmit={handleLogin} className="w-100 mt-5 pt-5">
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"></label>
                            <div className="position-relative">
                                <FaUserSecret className="position-absolute top-50 start-0 translate-middle-y ms-3" />
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control text-dark rounded-pill ps-5"
                                    placeholder="Username"
                                    value={useremail}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label"></label>
                            <div className="position-relative">
                                <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-3" />
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control text-dark rounded-pill ps-5"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" id="save" />
                            <label className="form-check-label" htmlFor="save">
                                Remember me
                            </label>
                        </div>
                        <button type="submit" className="btn btn-outline-primary mt-4 w-100">
                            Login
                        </button>
                        <p className="text fw-bold mt-3" style={{ textAlign: 'center' }}>
                            Don't have an account? <Link to="/Register">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
