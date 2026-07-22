import React, { useState } from 'react'
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";

const WhyChooseHome = () => {
    const [active, setActive] = useState(0);
    const accordionData = [
        {
            title: "100% Transparent Labels",
            content: "We believe in complete transparency with our customers. That's why we clearly list all ingredients and their sources on every product label."
        },
        {
            title: "Full Research-Backed Dosages",
            content: "We ensure that every ingredient in our products is included at clinically effective dosages, backed by scientific research to deliver real results."
        },
        {
            title: "Third-Party Verified",
            content: "Our products are independently tested and verified by third-party laboratories to ensure their quality and safety."
        }
    ]

    return (
        <section className="why-choose-home py-20">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="col-span-1 flex flex-col justify-center">
                        <h6 className="tagline">Why Choose Us</h6>
                        <h2 className="h2-dine uppercase">Built for Those Who Chase Greatness</h2>
                        <div className="accordion-wrapper mt-5">
                            {accordionData.map((item, index) => (
                                <div className={`accordion-item ${active === index ? 'active' : ''}`} key={index}>
                                    <div className="accordion-header" onClick={() => setActive(index)}>
                                        <h3 className="accordion-title"><FaRegCircleCheck />{item.title}</h3>
                                        <IoChevronDown />
                                    </div>
                                    {active === index && (
                                        <div className="accordion-content">
                                            <p>{item.content}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-1">
                        <img className="rounded-2xl w-full h-auto object-cover" src="/images/why-choose-home.png" alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseHome
