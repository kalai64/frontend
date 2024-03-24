import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

export const ProductDisplay = (props) => {
    const {product} = props
    const {addToCart} = useContext(ShopContext)

    const renderSizeSelector = () => {
        if (product.category !== 'accessories') {
            return (
                <div className="productdispaly-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <span>Ram:</span>
                        <div>8GB</div>
                        <div>16GB</div>
                        <hr />
                        <span>Storage:</span>
                        <div>256GB</div>
                        <div>512GB</div>
                    </div>
                </div>
            );
        }
        return null;
    };

  return <>
  <div className="productdisplay">
    <div className="productdisplay-left">
        <div className="productdisplay-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
            <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
    </div>
    <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">{product.old_price}</div>
            <div className="productdisplay-right-price-new">{product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
            The powerfull and semless performence on this system,
            best in class of the worlds processor used in perticular device,
            Life time using of mousepad and keyboards and warrenty.
        </div>
        <div className="productdispaly-right-size">         
            {renderSizeSelector()}
        </div>
        <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        <p className="productdisplay-right-category"><span>Category :</span>Electronics,{product.category}</p>
        <p className="productdisplay-right-category"><span>Tags :</span>Latest</p>
    </div>
  </div>
  </>
}

