import React from 'react';

export default function Carousel() {
    return (
        <>
            <div id="carouselExampleControls" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className='carousel-caption d-flex justify-content-center align-items-center' style={{ zIndex: "10", top: "50%", transform: "translateY(-50%)" }}>
                        <form className="d-flex" style={{ width: "80%", backgroundColor: "transparent" }}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ backgroundColor: "transparent", color: "aquamarine", border: "3px solid aquamarine" }} />
                            <button className="btn btn-outline-success text-white bg-success" type="submit" style={{ backgroundColor: "transparent", border: "3px solid aquamarine", color: "aquamarine" }}>Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active" style={{ filter: "brightness(50%)" }}>
                        <img
                            src="./carouselImg/pizza.jpg"
                            className="d-block w-100"
                            alt="Pizza"
                        />

                    </div>
                    <div className="carousel-item" style={{ filter: "brightness(30%)" }}>
                        <img
                            src="./carouselImg/bugga.jpg"
                            className="d-block w-100"
                            alt="Burger"
                        />
                    </div>
                    <div className="carousel-item" style={{ filter: "brightness(30%)" }}>
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
        </>
    );
}
