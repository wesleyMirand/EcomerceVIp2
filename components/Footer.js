import Link from "next/link";
import { useUser } from "../context/user";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import Cookie from "js-cookie";
import { logout } from "../actions/userActions";
import { useRouter } from 'next/router';
import { supabase } from "../utils/supabase";




const Footer = () => {

    const [year, setYear] = useState('');

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    const handleEmailSubClicked = (e) => {

        alert('You have subscribed to our newsletter now. Thanks!');
    }

    return (
        <footer className="site-footer border-top">
            <div className="container">
                <div className="row">
                <div className="col-lg-6 mb-5 mb-lg-0">
                    <div className="row">
                    <div className="col-md-12">
                        <h3 className="footer-heading mb-4">Navigations</h3>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <ul className="list-unstyled">
                        <li><a href="#">Sell online</a></li>
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Shopping cart</a></li>
                        <li><a href="#">Store builder</a></li>
                        </ul>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <ul className="list-unstyled">
                        <li><a href="#">Mobile commerce</a></li>
                        <li><a href="#">Dropshipping</a></li>
                        <li><a href="#">Website development</a></li>
                        </ul>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <ul className="list-unstyled">
                        <li><a href="#">Point of sale</a></li>
                        <li><a href="#">Hardware</a></li>
                        <li><a href="#">Software</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                    <h3 className="footer-heading mb-4">Promo</h3>
                    <a href="#" className="block-6">
                    <img src="images/hero_1.jpg" alt="Image placeholder" className="img-fluid rounded mb-4" />
                    <h3 className="font-weight-light  mb-0">Ecommerce Web App</h3>
                    </a>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="block-5 mb-5">
                    <h3 className="footer-heading mb-4">Contact Info</h3>
                    <ul className="list-unstyled">
                        <li className="address">203 Fake St. Mountain View, San Francisco, California, USA</li>
                        <li className="phone"><a href="tel://23923929210">+2 392 3929 210</a></li>
                        <li className="email">emailaddress@domain.com</li>
                    </ul>
                    </div>

                    <div className="block-7">
                    <form action="#" method="post">
                        <label htmlFor="email_subscribe" className="footer-heading">Subscribe</label>
                        <div className="form-group">
                            <input type="text" className="form-control py-4" id="email_subscribe" placeholder="Email" />
                            <input type="submit" className="btn btn-sm btn-primary" value="Send" id="emailSubBtn" clicked="false" onClick={handleEmailSubClicked} />
                        </div>
                    </form>
                    </div>
                </div>
                </div>
                <div className="row pt-5 mt-5 text-center">
                <div className="col-md-12">
                    <p>
                    Copyright &copy;{year} All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" rel="noreferrer" className="text-primary">Colorlib</a>
                    </p>
                </div>
                
                </div>
            </div>
        </footer>
    );

}

export default Footer;