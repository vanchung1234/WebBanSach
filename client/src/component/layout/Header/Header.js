import React from 'react'
import logo from "../../../images/logo.png";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {
    const url = window.location.pathname.substring(1)

    const [navSize, setnavSize] = useState("6rem");
    const [navColor, setnavColor] = useState("transparent");
    const listenScrollEvent = () => {
        window.scrollY > 10 ? setnavColor("rgba(0, 0, 0, 0.84)") : setnavColor("transparent");
        window.scrollY > 10 ? setnavSize("5.4rem") : setnavSize("9rem");
    };
    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, []);

    const { auth } = useSelector(state => state)

    return (
        <nav className="navbar navbar-expand-lg  navbar-dark " style={{
            backgroundColor: navColor,
            height: navSize,
            transition: "all 1s",
            width: '100%',
            display: (url === 'dashboard/orders' || url === 'dashboard/products') ? 'none' : 'flex'
        }} >
            <Link className="navbar-brand  col-lg-2" to={'/'} ><img src={logo} className='logo' style={{ marginTop: '20px' }} />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse col-lg-10" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item ">
                        <Link className="nav-link" to={'/'}>Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/products'}>Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/contact'}>Contact</Link>
                    </li>
                    {!auth.token && <li className="nav-item">
                        <Link className="nav-link" to={'/login'}>Login</Link>
                    </li>}

                </ul>
            </div>
        </nav>
    )
}

export default Header