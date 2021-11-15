import React from 'react'
import logo from '../logo.png'
function Header() {
    return (
        <div className="Header d-flex">
                <img src={logo} alt="" />
                <p>הצעת מחיר</p>
        </div>
    )
}

export default Header
