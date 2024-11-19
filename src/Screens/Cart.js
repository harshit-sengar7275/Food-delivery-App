import React from 'react';
import Delete from '@mui/icons-material/Delete';
import { useCart, useDispatch } from '../Components/ConRed';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatch();

    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3 text-success'>The Cart is Empty!</div>
            </div>
        );
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        
        // Check if userEmail is null or empty
        if (!userEmail) {
            alert("Please log in to check out.");
            return;
        }

        // Updated: Correctly format the order data
        let response = await fetch("http://localhost:4000/api/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data, // Make sure 'data' is formatted as expected
                email: userEmail,
                Order_date: new Date().toDateString() // Changed key to match backend expectations
            })
        });
        
        if (response.ok) { // Updated: Check for response.ok instead of status
            dispatch({ type: "DROP" });
        } else {
            console.error("Failed to submit order:", response.statusText);
        }
    };

    let totalPrice = data.reduce((total, food) => total + food.price, 0);
    return (
        <div>
            <div className='container bg-dark m-auto mt-5 table-responsive'>
                <table className='table table-hover table-dark'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}> {/* Updated: Add key to each row */}
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td>
                                    <button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }); }}>
                                        <Delete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
                </div>
            </div>
        </div>
    );
}
