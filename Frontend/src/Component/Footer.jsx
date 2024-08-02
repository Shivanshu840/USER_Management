// Footer.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-light text-dark py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <h5 className="text-uppercase text-primary">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-dark">Home</Link></li>
                            <li><Link to="/userprofile" className="text-dark">Profile</Link></li>
                            <li><Link to="/update-profile" className="text-dark">Update Profile</Link></li>
                            <li><Link to="/delete-profile" className="text-dark">Delete Profile</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h5 className="text-uppercase text-primary">Contact Us</h5>
                        <p>Email: <a href="mailto:support@usermanagement.com" className="text-dark">support@usermanagement.com</a></p>
                        <p>Phone: <a href="tel:+1234567890" className="text-dark">+1 234 567 890</a></p>
                        <p>Address: 123 Main St, Hometown, USA</p>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h5 className="text-uppercase text-primary">Follow Us</h5>
                        <div className="d-flex">
                            <a href="https://facebook.com" className="text-dark me-3" aria-label="Facebook"><FaFacebookF /></a>
                            <a href="https://twitter.com" className="text-dark me-3" aria-label="Twitter"><FaTwitter /></a>
                            <a href="https://instagram.com" className="text-dark me-3" aria-label="Instagram"><FaInstagram /></a>
                            <a href="https://linkedin.com" className="text-dark" aria-label="LinkedIn"><FaLinkedinIn /></a>
                        </div>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="text-center">
                    <p className="mb-0">&copy; {new Date().getFullYear()} User Management. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
