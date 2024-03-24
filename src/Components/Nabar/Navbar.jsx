import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import admin_img from '../Assets/admin.png'
import user_img from '../Assets/user.png'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav-dropdown.png'

 const Navbar = () => {
  
  const userRole = localStorage.getItem('user-role')

  const [menu,setMenu] = useState ("shop")
  const {getTotalcartItems} = useContext(ShopContext)
  const menuRef = useRef()

  const dropdown_toggle = (e) =>{
    menuRef.current.classList.toggle('nav-menu-visible')
    e.target.classList.toggle('open')
  }

  const handleLogout = () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user-role')
    localStorage.removeItem('user-name')
    window.location.replace('/')
};

  return <>
      <div className='navbar'>
        <div className="nav-logo">
          <img src={logo} alt="" />
          <p>My Computer</p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className="nav-menu">
          <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration:'none'}} to='/'>Home</Link> {menu==="home"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("laptop")}}><Link style={{textDecoration:'none'}} to='/laptop'>Laptop</Link> {menu==="laptop"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("desktop")}}><Link style={{textDecoration:'none'}} to='desktop'>Desktop</Link> {menu==="desktop"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("accessories")}}><Link style={{textDecoration:'none'}} to='accessories'>Accessories</Link> {menu==="accessories"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
          {localStorage.getItem('auth-token')
          ?<button onClick={handleLogout}>Logout</button>
          :<Link to='/login'><button>LogIn</button></Link>}
          
          <Link to='cart'><img src={cart_icon} alt="" /></Link>
          <div className="nav-cart-count">
            {getTotalcartItems()}
          </div>
        </div>
        {userRole && (
          <div className="user-role">
            {userRole === 'admin' ? <>
              <a href="https://admin-ten-gold.vercel.app/" target="_blank" rel='noreferrer'>
                <div className='admin-card'>
                  <img src={admin_img} alt='Admin' />
                  <h5>Admin</h5>
                </div>
              </a>
              </>:<>
              <div className='admin-card'>
                <Link to='/profile'><img src={user_img} alt='My Account' />
                <h5>My Account</h5>
                </Link>
              </div>
              </>}
          </div>
        )}
      
      </div>
    </>
}

export default Navbar;
