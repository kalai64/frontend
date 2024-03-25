import React, { createContext, useEffect, useState } from "react";


export const ShopContext = createContext(null)

const getDefaultCart = () =>{
    let cart={};
    for(let i=0;i<300+1;i++){
        cart[i] = 0;
    }
    return cart;
}
const ShopContextProvider = (props)=>{ 
    
    const [all_product,setAll_Product] = useState([]);
    

    const [cartItems,setCartItems] = useState(getDefaultCart())
    
    useEffect(()=>{
        fetch('https://backend-knm3.onrender.com/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            fetch('https://backend-knm3.onrender.com/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }
    },[])

    const clearCart = () => {
        setCartItems([]);
    };

    const addToCart = (itemId) => {
        if (localStorage.getItem('auth-token')) {
            fetch('https://backend-knm3.onrender.com/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId: itemId }),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add product to cart');
                }
                return response.text();
            })
            .then((data) => {
                console.log(data)
                setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
            })
            .catch((error) => {
                console.error(error);
            });
        } else {
            alert('Please log in to add items to your cart.');
        }
    }
    
    
    const removeFromCart = (itemId) => {
        if (localStorage.getItem('auth-token')) {
            fetch('https://backend-knm3.onrender.com/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId: itemId }),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(0, prev[itemId] - 1) }))
                } else {
                    console.error('Failed to remove item from cart:', data.message)
                }
            })
            .catch((error) => {
                console.error('Error removing item from cart:', error)
            });
        } else {
            alert('Please log in to remove items from your cart.')
        }
    }

    const increaseQuantity = (itemId) => {
        
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    
       
        fetch('https://backend-knm3.onrender.com/addtocart', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
            },
            body: JSON.stringify({ itemId: itemId }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.error('Error adding item to cart:', error);
        });
    }

    const decreaseQuantity = (itemId) => {
        if (cartItems[itemId] > 0) {
            
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    
            
            fetch('https://backend-knm3.onrender.com/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                },
                body: JSON.stringify({ itemId: itemId }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error removing item from cart:', error);
            });
        }
    }
    
    

    const getTotalCartAmount = () =>{
        let totalAmount = 0
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount+= itemInfo.new_price * cartItems[item]
            } 
        }
        return totalAmount
    }

    const getTotalcartItems=()=>{
        let totalItems = 0
        for(const item in cartItems)
        {
            totalItems += cartItems[item]
        }
        return totalItems;
    }
    

    const contextValue = {getTotalcartItems,
                        getTotalCartAmount,
                        all_product,cartItems,
                        addToCart,
                        removeFromCart,
                        increaseQuantity,
                        decreaseQuantity,
                        cartItems,
                        clearCart}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;