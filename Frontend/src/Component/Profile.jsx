import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

export default function UserProfile() {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    throw new Error('First you have to log in');
                }

                const response = await axios.get('https://user-management-yru9.onrender.com/userprofile/profile', {
                    headers: {
                        'Authorization': token,
                    }
                });

                setUserData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 col-md-8 col-lg-6 my-3 rounded border border-5 shadow-lg p-5">
                    <h4 className="mb-4">User Profile</h4>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={userData.username}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={userData.useremail}
                            readOnly
                        />
                    </div>
                    <button
                        className="btn btn-outline-primary mt-4 w-100"
                        onClick={() => navigate('/update-profile')}
                    >
                        Update Profile
                    </button>
                    <button
                        className="btn btn-outline-danger mt-2 w-100"
                        onClick={() => navigate('/delete-profile')}
                    >
                        Delete Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
