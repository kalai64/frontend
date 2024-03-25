import React, { useEffect,useState} from 'react'
import './CSS/MyOrders.css'

const MyOrders = () => {
    const [orderedItems, setOrderedItems] = useState([])

    useEffect(() => {
        fetchOrderedItems()
    }, [])

    const fetchOrderedItems = async () => {
        try {
            const response = await fetch('https://backend-knm3.onrender.com/getordereditems', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                },
            });
            const data = await response.json()
            if (data.success) {
                setOrderedItems(data.orderedItems)
            } else {
                console.error(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <>
            <h1>My Orders</h1>
            {/* Display ordered items */}
            <div className="ordered-items-container">
                {orderedItems.map((item) => (
                    <div key={item.id} className="ordered-item">
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <p>{item.quantity}</p>
                    </div>
                ))}
            </div>
        </>
    );
};


export default MyOrders