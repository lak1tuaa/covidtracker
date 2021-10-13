import React from 'react';
import { Link } from 'react-router-dom'
import './style/menubar.css';

function MenuBar() {
    return (
        <div className="menu-bar">
            <Link to={'/'}><span className="home-link">Home</span></Link>
        </div>
    )
}


export default MenuBar;