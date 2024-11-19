import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import { useState, useEffect } from "react";

export default function Home() {

    const[search, setSearch] = useState('');
    const [type, settype] = useState([]);
    const [sample, setSample] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:4000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setSample(response[0]);
        settype(response[1]);

        // console.log(response[0],response[1]);
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            <div>
                <Navbar />
            </div>

            <div>
            <div id="carouselExampleControls" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className='carousel-caption d-flex justify-content-center align-items-center' style={{ zIndex: "10", top: "50%", transform: "translateY(-50%)" }}>
                        <div className="d-flex justify-content-center" style={{ width: "80%", backgroundColor: "transparent" }}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => {setSearch(e.target.value)}} style={{ backgroundColor: "transparent", color: "aquamarine", border: "3px solid aquamarine" }} />
                            {/* <button className="btn btn-outline-success bg-success" type="submit" style={{ backgroundColor: "transparent", border: "3px solid aquamarine", color: "aquamarine" }}>Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active" style={{ filter: "brightness(50%)" }}>
                        <img
                            src="./carouselImg/pizza.jpg"
                            className="d-block w-100"
                            alt="Pizza"
                        />

                    </div>
                    <div className="carousel-item" style={{ filter: "brightness(50%)" }}>
                        <img
                            src="./carouselImg/bugga.jpg"
                            className="d-block w-100"
                            alt="Burger"
                        />
                    </div>
                    <div className="carousel-item" style={{ filter: "brightness(50%)" }}>
                        <img
                            src="./carouselImg/chiko.jpg"
                            className="d-block w-100"
                            alt="Chicken"
                        />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            </div>

            <div className="container">
                {
                    type !== []
                        ? type.map((typeData) => {
                            return (
                                <div className="row mb-4">

                                    <div key={typeData._id} className="fs-3 m-3">
                                        {typeData.CategoryName}
                                    </div>
                                    <hr />
                                    {sample !== []? 
                                    sample.filter((item) => (item.CategoryName === typeData.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                    .map(filterItems => {
                                        return(
                                            <div key={filterItems._id} className="col-12 col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
                                                <Card foodItem = {filterItems}
                                                 options = {filterItems.options[0]}
                                                                                             
                                                ></Card>
                                            </div>
                                        )
                                    }
                                )
                            : <div> No such data found</div>
                                
                            }
                                </div>
                            )
                        }) : <div>"""</div>
                }
             
            </div>

            <div>
                <Footer />
            </div>
        </>
    );
}
