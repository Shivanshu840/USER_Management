import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

export default function DeleteProfile() {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigate here

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
            return;
        }

        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            await axios.delete('http://localhost:3000/userprofile/delete-profile', {
                headers: {
                    'Authorization': token,
                }
            });

            setSuccess("Profile deleted successfully!");
            sessionStorage.clear();
            navigate("/Login"); // Redirect after deletion

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 col-md-8 col-lg-6 my-3 rounded border border-5 shadow-lg p-5">
                    <h4 className="mb-4">Delete Profile</h4>
                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button className="btn btn-outline-danger mt-4 w-100" onClick={handleDelete}>
                        Delete Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
