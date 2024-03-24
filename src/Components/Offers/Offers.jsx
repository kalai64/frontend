import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'
import { Link } from 'react-router-dom'

export const Offers = () => {
  return <>
    <div className="offers">
        <div className="offers-left">
            <h1>Exclisive</h1>
            <h1>offers For You</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <Link to='/laptop'><button>Check Now</button></Link>
        </div>
        <div className="offers-right">
            <img src={exclusive_image} alt="" />
        </div>
    </div>
  </>
}
