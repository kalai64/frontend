import React from 'react'
import './Hero.css'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'
import { Link } from 'react-router-dom'

export const Hero = () => {
  return <>
    <div className='hero'>
        <div className="hero-left">
            <h2>NEW ARRIVALS ONLY</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>new</p>
                    
                </div>
                <p>collections</p>
                <p>for everyone</p>
            </div>
            <div className="hero-latest-btn">
                <div>Latest Collection</div>
                <Link to='/laptop'><img src={arrow_icon} alt="" /></Link>
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_image} alt="" />
        </div>

    </div>
  </>
}
