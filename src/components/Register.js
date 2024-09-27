import React, { useState } from 'react';
import { FaGoogle, FaFacebookF, FaTwitter, FaLinkedinIn, FaPhoneAlt, FaGithub } from 'react-icons/fa';

export default function Register(props) {
    let msgClass = ["text-center"];
    if (props.type) {
        msgClass.push("text-success");
    } else {
        msgClass.push("text-danger");
    }

    const iconStyle = {
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '20%',
        padding: '8px',
    };

    const handleMouseEnter = (e) => {
        e.target.style.transform = 'scale(1.2)'; // Zoom in
        e.target.style.boxShadow = '0px 8px 16px rgba(0, 0, 0, 0.2)'; // Increase shadow on hover
    };

    const handleMouseLeave = (e) => {
        e.target.style.transform = 'scale(1)'; // Reset zoom
        e.target.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)'; // Reset shadow
    };

    return (
        <div className="container d-flex main">
            <div className="form-container text-center">
                <h3>Create Account</h3>
                <p>Get started with your free account</p>
                <p className={msgClass.join(" ")}>{props.message}</p>
                <div className="social-login-icons d-flex justify-content-around my-3">
                    <FaGoogle
                        size={34}
                        color="#DB4437"
                        style={iconStyle}
                        onClick={props.google}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                    <FaFacebookF
                        size={34}
                        color="#1877F2"
                        style={iconStyle}
                        onClick={props.facebook}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                    <FaTwitter
                        size={34}
                        color="#1DA1F2"
                        style={iconStyle}
                        onClick={props.twitter}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                    <FaLinkedinIn
                        size={34}
                        color="#0077B5"
                        style={iconStyle}
                        onClick={props.linkedin}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                    <FaGithub
                        size={34}
                        color="#333"
                        style={iconStyle}
                        onClick={props.gitHub}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                    <FaPhoneAlt
                        size={34}
                        color="#28a745"
                        style={iconStyle}
                        //   onClick={handlePhoneLogin}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                </div>

                <p className="my-2">---------------------OR-----------------------</p>

                <form onSubmit={props.register} method="post">
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Email address" name="email" required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Create password" name="password" required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Confirm password" name="confirmPassword" required />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Create Account</button>
                </form>

                <p className="mt-3">Have an account? <a href="#" onClick={props.switch}>Log In</a></p>
            </div>
        </div>
    );
}
