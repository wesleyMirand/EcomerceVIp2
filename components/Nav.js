import Link from "next/link";
import { useUser } from "../context/user";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import Cookie from "js-cookie";
import { logout } from "../actions/userActions";
import { useRouter } from 'next/router';
import { supabase } from "../utils/supabase";


const Nav = () => {
    const { user } = useUser();
    const [ userInfo, setUserInfo ] = useState(null);
    const userLogout = useSelector((state) => state.userLogout);
    const router = useRouter();
    const [checkCookies, setCheckCookies] = useState(true);

    const [signedIn, setSignedIn] = useState(true);

    useEffect(() => {
        console.log(user);
        setUserInfo(user);
    }, [user]);


    const handleLogout = async () => {  
        setUserInfo(null);
        router.push("/");
        setSignedIn(false);
        await supabase.auth.signOut();
       
    }

    return (
        <header className="header">
            <div className="brand-name">
                <Link href="/">Ecommerce Web App 1432</Link>
            </div>
            <div className="header-links">
                {
                    userInfo
                    ?
                    <div>
                        <Link href="/cart">Cart</Link>
                        <Link href="/products">Products</Link>
                        { user ? 
                            <Link href="/profile">My Profile</Link>
                        :
                            null
                        }
                        <Link href="/"><a className="signout-link" onClick={(e) => handleLogout() }>Sign Out</a></Link>
                    </div>
                    :
                    <div className="signin-link">
                        <Link href="/signin">Sign In</Link>
                    </div>
                }                
            </div>
        </header>
    );
};

export default Nav;