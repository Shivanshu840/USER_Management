// UpdateProfile.js
import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

export default function UpdateProfile() {
    const [username, setUsername] = useState("");
    const [useremail, setUseremail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [updatePassword, setUpdatePassword] = useState(false); // Flag for password update
    const [success, setSuccess] = useState("");
    const [error, setError] = useState(null);

    const handleUpdate = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                alert("First you have to login");
                return;
            }

            if (updatePassword) {
                // Verify the old password if updating password
                const verifyResponse = await axios.post('http://localhost:3000/userprofile/verify-password', {
                    oldPassword
                }, {
                    headers: {
                        'Authorization': token,
                    }
                });

                if (!verifyResponse.data.valid) {
                    setError("Old password is incorrect");
                    return;
                }
            }

            // Proceed with updating the profile
            const response = await axios.put('http://localhost:3000/userprofile/profile-update', {
                username,
                useremail,
                password: updatePassword ? newPassword : undefined
            }, {
                headers: {
                    'Authorization': token,
                }
            });

            setSuccess("Profile updated successfully!");
            setOldPassword("");
            setNewPassword("");
            setUsername("");
            setUseremail("");
            setError(null);
        } catch (err) {
            if (err.response && err.response.status === 500) {
                setError("Old password is incorrect");
            } else {
                setError("An error occurred while updating the profile. Please try again later.");
            }
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 col-md-8 col-lg-6 my-3 rounded border border-5 shadow-lg p-5">
                    <h4 className="mb-4">Update Profile</h4>
                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={useremail}
                            onChange={(e) => setUseremail(e.target.value)}
                        />
                    </div>
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="updatePassword"
                            checked={updatePassword}
                            onChange={() => setUpdatePassword(!updatePassword)}
                        />
                        <label className="form-check-label" htmlFor="updatePassword">
                            Update Password
                        </label>
                    </div>
                    {updatePassword && (
                        <>
                            <div className="mb-3">
                                <label className="form-label">Old Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                        </>
                    )}
                    <button className="btn btn-outline-primary mt-4 w-100" onClick={handleUpdate}>
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
