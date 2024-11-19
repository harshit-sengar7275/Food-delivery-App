import React from 'react';
import { useDispatch, useCart } from './ConRed';
import { useState, useRef, useEffect } from 'react';

export default function Card(props) {
    let dispatch = useDispatch();
    let data = useCart();
    let options = props.options;
    const priceRef = useRef();
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleAddToCard = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }

        let finalPrice = qty * parseInt(options[size]); // Moved this line to ensure finalPrice is updated with the current qty

        // Change 1: Update logic when item already exists in the cart
        if (food.length !== 0) {
            if (food.size === size) {
                // Change 2: Here qty should reflect the new quantity selected
                await dispatch({
                    type: "UPDATE",
                    id: props.foodItem._id,
                    price: finalPrice, // Ensure finalPrice is used here
                    qty: qty
                });
                return;
            }
        }

        // If food.size is not the same or food doesn't exist
        await dispatch({
            type: "ADD", 
            id: props.foodItem._id,
            name: props.foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size
        });
    };

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className="card mt-3 mb-3 bg-dark text-light" style={{ width: "18rem", maxHeight: "360px" }}>
                    <img src={props.foodItem.img} className="card-img-top " alt="..." style={{ maxHeight: "150px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <p className="card-text">card 1</p>
                        <div className="container w-100">
                            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                                {Array.from({ length: 10 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>

                            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>;
                                })}
                            </select>
                            <div className="d-inline h-100 fs-5">
                                Price: {qty * parseInt(options[size])}/- {/* Updated price display */}
                            </div>
                        </div>
                        <hr />
                        <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCard}>
                            Add to Card
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
