import React, { useState, useEffect } from 'react';
import './CSS/Profile.css';
import avatar from '../Components/Assets/avatar.png'
import orders_img from '../Components/Assets/orders.png'
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile';


const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('https://backend-knm3.onrender.com/userdetails', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                },
            });
            const data = await response.json();
            if (data.success) {
                setUserData(data.user);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return <>
        <div className="avatar-container">
            <div className="avatar">
                <img src={avatar} alt="Default Avatar"/>
            </div>
            {userData && (
                <div className="details-container">
                    <div className="details-view">
                        <label htmlFor="name">Name:</label>
                        <p id="name">{userData.name}</p>
                    </div>
                    <div className="details-view">
                        <label htmlFor="email">Email:</label>
                        <p id="email">{userData.email}</p>
                    </div>
                    <div className="details-view">
                        <label htmlFor="mobile">Mobile No:</label>
                        <p id="mobile">{userData.mobile}</p>
                    </div>
                    <Link to={{
                        pathname: '/editprofile',
                        state: { userData }
                    }}><button className="edit-btn">Edit</button></Link>
                </div>
            )}
        </div> 
    </>
};

export default Profile;
