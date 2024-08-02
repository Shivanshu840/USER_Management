import 'bootstrap/dist/css/bootstrap.css';
import { FaLock, FaUserAlt, FaEnvelope } from "react-icons/fa";
import { BiSolidUserCircle } from "react-icons/bi";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [username, setName] = useState("");
    const [useremail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault(); 

        try {
            const response = await axios.post("http://localhost:3000/register/signup", {
                username,
                useremail,
                password
            });
            alert(response.data.msg);
            setError(""); 
            navigate("/Login")
        } catch (error) {
            console.error("There was an error!", error);
            if (error.response && error.response.data) {
                setError(error.response.data.msg); 
            } else {
                setError("An error occurred while signing up.");
            }
        }
    };

    return (
        <div className="container my-5" style={{ height: '70vh' }}>
            <div className="row justify-content-center align-items-center" style={{ height: '100%' }}>
                <div className="col-12 col-md-6 col-lg-4 my-3 rounded border border-5 shadow-lg py-5 position-relative" style={{ minHeight: '400px' }}>
                    <BiSolidUserCircle style={{ fontSize: '5rem', position: 'absolute', top: '-3.0rem', left: '50%', transform: 'translateX(-50%)' }} />
                    <form onSubmit={handleSignup} className="w-100 mt-5 pt-5">
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label"></label>
                            <div className="position-relative">
                                <FaUserAlt className="position-absolute top-50 start-0 translate-middle-y ms-3" />
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control text-dark rounded-pill ps-5"
                                    placeholder="Enter your username"
                                    autoComplete="new-username"
                                    value={username}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"></label>
                            <div className="position-relative">
                                <FaEnvelope className="position-absolute top-50 start-0 translate-middle-y ms-3" />
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control text-dark rounded-pill ps-5"
                                    placeholder="Enter your email"
                                    autoComplete="new-email"
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
                                    placeholder="Enter your password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-outline-primary mt-4 w-100 rounded-pill">
                            Signup
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
