import React from 'react'
import InnerBanner from '../components/InnerBanner'
import Testimonials from '../components/Testimonials'
import { IoIosWarning } from "react-icons/io";
import FAQ from '../components/FAQ';

const OurStandard = () => {
    const buildPlatformFeatures = [
        {
            icon: '/images/built-to-perform/1.png',
            title: 'Insane Pumps',
            description: '6g L-Citrulline + 2.5g Betaine for skin-splitting vasodilation and maximum blood flow to working muscle.'
        },
        {
            icon: '/images/built-to-perform/2.png',
            title: 'Zero Crash',
            description: '6g L-Citrulline + 2.5g Betaine for skin-splitting vasodilation and maximum blood flow to working muscle.'
        },
        {
            icon: '/images/built-to-perform/3.png',
            title: 'Laser Focus',
            description: '6g L-Citrulline + 2.5g Betaine for skin-splitting vasodilation and maximum blood flow to working muscle.'
        },
        {
            icon: '/images/built-to-perform/4.png',
            title: 'Faster Recovery',
            description: '2g Beta-Alanine buffers lactic acid buildup so you push further and bounce back sooner.'
        },
    ]

    const supplementFacts = [
        {
            title: 'Calories',
            DV: '10'
        },
        {
            title: 'Total Carbohydrate',
            amountPerServing: '2g',
            DV: '1%'
        },
        {
            title: 'L-Citrulline',
            amountPerServing: '6,000mg'
        },
        {
            title: 'Beta-Alanine',
            amountPerServing: '3,200mg'
        },
        {
            title: 'Betaine Anhydrous',
            amountPerServing: '2,500mg'
        },
        {
            title: 'Caffeine Anhydrous',
            amountPerServing: '200mg'
        },
        {
            title: 'Zynamite® (Mango Leaf Ext.)',
            amountPerServing: '150mg'
        },
        {
            title: 'L-Theanine',
            amountPerServing: '100mg'
        },
        {
            title: 'Alpha-GPC 50%',
            amountPerServing: '300mg'
        },
        {
            title: `Lion's Mane Extract (8:1)`,
            amountPerServing: '500mg'
        },
        {
            title: `Himalayan Pink Salt`,
            amountPerServing: '200mg'
        },
        {
            title: `Vitamin B6 (P-5-P)`,
            amountPerServing: '5mg'
        },
        {
            title: `Vitamin B12 (Methylcobalamin)`,
            amountPerServing: '250mcg',
            DV: '10,417%'
        },
    ]

    return (
        <>
            <InnerBanner title="Our Standard" />
            <section className="built-to-perform py-20">
                <div className="container">
                    <h2 className="h2-dine mb-5">BUILT TO PERFORM</h2>
                    <div className="build-platform-listing">
                        <div className="grid grid-cols-4 gap-5">
                            {buildPlatformFeatures.map((item, ind) => (
                                <div className="col-span-1" key={ind}>
                                    <div className="build-plat-card flex flex-col gap-3 items-start">
                                        <img src={item.icon} alt={item.title} />
                                        <h4 className="h4-airborne">{item.title}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="pre-workout-section pb-20">
                <div className="container">
                    <div className="grid grid-cols-7 gap-5">
                        <div className="col-span-3">
                            <div className="sticky top-30">
                                <h3 className="h3-airborne mb-5">SUPPLEMENT FACTS</h3>
                                <div className="card-supplements-detail">
                                    <h5 className="h5-dine">Supplement Facts</h5>
                                    <span className="info-supplement">Serving Size: 1 Scoop (20g)</span>
                                    <span className="info-supplement">Servings Per Container: 30</span>
                                    <table className="table-supplement-facts w-full">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th className='text-end'>Amount Per Serving</th>
                                                <th className='text-end'>% DV</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {supplementFacts.map((item, ind) => (
                                                <tr key={ind}>
                                                    <td>{item.title}</td>
                                                    <td className='text-end'>{item.amountPerServing}</td>
                                                    <td className='text-end'>{item.DV ? item.DV : '+'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p className="my-3">† Daily Value not established.</p>
                                    <p className="">Other Ingredients: Citric Acid, Natural Flavors, Silicon Dioxide, Sucralose, Acesulfame Potassium, FD&C Red #40.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="sticky top-30">
                                <h3 className="h3-airborne mb-5">USAGE GUIDE</h3>
                                <div className="guide-steps">
                                    <div className="step step-1 flex gap-5 items-start">
                                        <span className="numbers">01</span>
                                        <div className="content flex-1">
                                            <h5 className="h5-dine uppercase font-medium">Mix</h5>
                                            <p>Add 1 level scoop (20g) to 8–10 oz (240–300ml) of cold water. Stir or shake for 15 seconds.</p>
                                        </div>
                                    </div>
                                    <div className="step step-1 flex gap-5 items-start mt-4">
                                        <span className="numbers">02</span>
                                        <div className="content flex-1">
                                            <h5 className="h5-dine uppercase font-medium">Timing</h5>
                                            <p>Consume 20–30 minutes before your workout on an empty stomach for maximum absorption.</p>
                                        </div>
                                    </div>
                                    <div className="step step-1 flex gap-5 items-start mt-4">
                                        <span className="numbers">03</span>
                                        <div className="content flex-1">
                                            <h5 className="h5-dine uppercase font-medium">Assess Tolerance</h5>
                                            <p>First-time users: begin with half a scoop to assess tolerance. Do not exceed 2 scoops in 24 hours.</p>
                                        </div>
                                    </div>
                                    <div className="warning-section mt-5">
                                        <span className="warning-text"><IoIosWarning color='#FFD216' /> Warning</span>
                                        <ul className="warning-points my-4">
                                            <li><strong>High caffeine content (200mg/serving). </strong> Not recommended for individuals sensitive to caffeine.</li>
                                            <li><strong>Not intended for individuals under 18 years of age.</strong></li>
                                            <li>Do not use if pregnant, nursing, or under medical supervision without consulting a physician.</li>
                                            <li>Discontinue use and consult a doctor if you experience rapid heartbeat, dizziness, or adverse reactions.</li>
                                            <li>Do not combine with other caffeinated products or stimulants.</li>
                                            <li>Keep out of reach of children. Store in a cool, dry place. Do not use if seal is broken.</li>
                                        </ul>
                                        <hr className="mb-3" style={{color: 'rgba(255, 59, 48, 0.2)'}} />
                                        <p>These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Testimonials />
            <FAQ />
        </>
    )
}

export default OurStandard
