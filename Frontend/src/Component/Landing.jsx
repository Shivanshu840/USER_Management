import 'bootstrap/dist/css/bootstrap.css';
import photo from "../assets/photo.jpg"
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="container-fluid p-0">
            <header className="bg-primary text-white text-center py-5">
                <h1 className="display-4">Welcome to Our User Management System</h1>
                <p className="lead">Manage your profile, update information, and much more.</p>
            </header>

            <div className="container my-5">
                <div className="row">
                    <div className="col-md-6">
                        <img 
                            src={photo}
                            alt="Landing" 
                            className="img-fluid rounded shadow-lg" 
                        />
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h2 className="mb-4">Features</h2>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <h4 className="d-inline-block bg-info text-white p-2 rounded">User Profiles</h4>
                                <p>Manage your personal profile with ease.</p>
                            </li>
                            <li className="mb-2">
                                <h4 className="d-inline-block bg-info text-white p-2 rounded">Update Information</h4>
                                <p>Keep your information up-to-date and accurate.</p>
                            </li>
                            <li className="mb-2">
                                <h4 className="d-inline-block bg-info text-white p-2 rounded">Profile Deletion</h4>
                                <p>Delete your profile securely when needed.</p>
                            </li>
                        </ul>
                        <Link to="/Login" className="btn btn-primary btn-lg mt-4">Get Started</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
