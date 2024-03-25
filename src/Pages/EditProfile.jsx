import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './CSS/EditProfile.css';

const EditProfile = () => {
    
    const location = useLocation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        address:'',
        password: ''
    });

    useEffect(() => {
        if (location.state) {
            const { name, email, mobile,address } = location.state;
            setFormData({
                name,
                email,
                mobile,
                address,
                password: ''
            });
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch('https://backend-knm3.onrender.com/editprofile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
           
        })
        .catch(error => {
            console.error('Error updating profile:', error);
        });
    };

    return (
        <div className="edit-profile-container">
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile No:</label>
                    <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <button type="submit" className="submit-btn">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;
