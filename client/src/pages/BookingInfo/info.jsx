import React from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx'
import Button from './Button.jsx';
import './DriverInfoPage.css'; 

function DriverInfoPage({user}) {
    return (
        <div>
            <Navbar user={user} /> 
            <div className="driver-info-container">
                <div className="driver-info-box">
                    <div className="driver-photo">
                        <img src="driver-photo.jpg" alt="Driver's Photo" className="photo" />
                    </div>
                    <div className="driver-details">
                        <h2>Driver Information</h2>
                        <p>Name: Rishabh Kushwaha</p>
                        <p>Age: 21</p>
                        <p>License Number: UP 67 698969</p>
                    </div>
                    <div className="contact-info">
                        <h2>Contact Information</h2>
                        <p>Phone Number: +91 634242**</p>
                    </div>
                    <div className="journey-info">
                        <h2>Journey Details</h2>
                        <p>Source City: Lucknow</p>
                        <p>Destination City: Varanasi</p>
                        <p>Seats Available: 5</p>
                    </div>
                </div>
            </div>
            <Button />
        </div>
    );
}

export default DriverInfoPage;
