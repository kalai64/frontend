import React, { useContext, useState, useEffect } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useContext(ShopContext);
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (getTotalCartAmount() === 0) {
            alert("Please add items to cart");
        } else {
            const options = {
                key: "rzp_test_bfffpkgRvmnkDc",
                key_secret:"uSPlSD6FIrjJMoiZm9pg124x",
                amount: amount * 100,
                currency: "USD",
                name: "My Computer",
                description: "For testing purpose",
                prefill: {
                    name: "Kalaiyarasan",
                    email: "kalaikabil213@gmail.com",
                    contact: "9629010742"
                },
                notes:{
                    address:"Razorpay Corporate Office"
                },
                theme: {
                    color: "#3399cc"
                },
            };
            const pay = new window.Razorpay(options);
            pay.open();
            clearCart()

            const response = await fetch('https://backend-knm3.onrender.com/clearcart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                },
                body: JSON.stringify({}),
            });

            if (response.ok) {
                console.log("Cart cleared successfully.");
            } else {
                console.error("Failed to clear cart.");
            }
           
        }
       
    }

    useEffect(() => {
        setAmount(getTotalCartAmount());
    }, [getTotalCartAmount]);

    return (
        <div className="cartitems">
            <div className="cartitems-format-main ">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className="carticon-product-icon" />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <div className='quantity'>
                                    <button className='cartitems-increament' onClick={() => decreaseQuantity(e.id)}>-</button>
                                    <button className="cartitems-quantity">{cartItems[e.id]}</button>
                                    <button className='cartitems-decreament' onClick={() => increaseQuantity(e.id)}>+</button>
                                </div>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>

                    <button onClick={handleSubmit}>Place Order</button>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
