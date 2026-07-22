import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import QuantitySelector from './QuantitySelector'
const PreWorkout = () => {
    const [quantity, setQuantity] = useState(1);
    return (
        <>
            <section className="pre-workout-section py-20">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="col-span-1">
                            <img className="rounded-2xl w-full h-auto object-cover" src="/images/product-video.png" alt="ATHPEX Pre-Workout" />
                        </div>
                        <div className="col-span-1 flex flex-col justify-center">
                            <h2 className="h2-dine uppercase">ATHPEX Pre-Workout</h2>
                            <p>Explosive Energy. Laser Focus. Unstoppable Performance.</p>
                            <div className="key-benefits my-5">
                                <span className="label">Key Benefits:</span>
                                <ul>
                                    <li>Powerful, sustained energy without the crash</li>
                                    <li>Enhanced blood flow and muscle pumps</li>
                                    <li>Sharp mental focus and motivation</li>
                                    <li>Clinically supported ingredient profile</li>
                                </ul>
                            </div>
                            <div className="price-wrap">
                                <span className="price-label">Price:</span>
                                <span className="price-value"><strong>$39.99</strong> one-time purchase</span>
                                <span className="price-value"><strong>$33.99</strong> per tub when you subscribe and save (15% off + free shipping)</span>
                            </div>
                            <div className="product-offer">First batch is limited. Order today to secure yours.</div>
                            <div className="flex flex-wrap items-center gap-5 mt-5">
                                <QuantitySelector value={quantity} onChange={setQuantity} min={1} max={10} step={1} />
                                <Link to="/checkout" className="btn btn-primary">Order Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </>
    )
}

export default PreWorkout
