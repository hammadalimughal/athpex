import React from 'react'
import InnerBanner from '../components/InnerBanner'
import FromLabToShaker from '../components/FromLabToShaker'
import CallToAction from '../components/CallToAction'

const WhyAthpexSupplements = () => {
    const trainWithConfidence = [
        {
            icon: '/images/train-with-confidence/1.png',
            title: 'Powerful Energy',
            description: 'Delivers sustained energy to help you push through even your toughest training sessions.'
        },
        {
            icon: '/images/train-with-confidence/2.png',
            title: 'Enhanced Focus',
            description: 'Supports mental clarity and concentration so you stay locked in from warm-up to cooldown.'
        },
        {
            icon: '/images/train-with-confidence/3.png',
            title: 'Better Performance',
            description: 'Formulated to help maximize endurance, strength, and workout intensity.'
        },
        {
            icon: '/images/train-with-confidence/4.png',
            title: 'Premium Ingredients',
            description: 'Made with quality ingredients chosen for effectiveness and consistency.'
        },
        {
            icon: '/images/train-with-confidence/5.png',
            title: 'Trusted Quality',
            description: 'Manufactured under strict quality standards to ensure safety and reliability.'
        },
        {
            icon: '/images/train-with-confidence/6.png',
            title: 'Customer Satisfaction',
            description: 'Built on positive customer experiences and a commitment to continuous improvement.'
        },
    ]
    const goals = [
        {
            icon: '/images/formula/1.png',
            title: 'Strength Training',
            description: 'Amplify power output and muscle activation during heavy compound lifts.'
        },
        {
            icon: '/images/formula/2.png',
            title: 'Endurance Workouts',
            description: 'Sustain peak output longer with delayed fatigue and steady-state energy.'
        },
        {
            icon: '/images/formula/3.png',
            title: 'Fat Loss Programs',
            description: 'Thermogenic boost that supports metabolic activity throughout your session.'
        },
        {
            icon: '/images/formula/4.png',
            title: 'High-Intensity Training',
            description: 'Fuel explosive intervals and rapid-fire circuits without the crash.'
        },
    ]
    return (
        <>
            <InnerBanner title="Why Athpex Supplements" />
            <section className="train-with-confidence py-20">
                <div className="container">
                    <h2 className="h2-dine mb-5 text-center">SIX REASONS TO TRAIN WITH CONFIDENCE</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {trainWithConfidence.map((item, ind) => (
                            <div className="col-span-1" key={ind}>
                                <div className="train-with-confidence-card flex flex-col gap-3 items-start">
                                    <img src={item.icon} alt={item.title} />
                                    <h4 className="h5-dine">{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="what-set-apart pb-20">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="col-span-1">
                            <img className="w-full h-auto object-cover rounded-2xl" src="/images/what-set-apart.png" alt="WHAT SETS US APART" />
                        </div>
                        <div className="col-span-1 flex flex-col justify-center">
                            <h2 className="h2-dine mb-5">WHAT SETS US APART?</h2>
                            <ul>
                                <li>Carefully formulated for high-performance training</li>
                                <li>Consistent quality in every batch</li>
                                <li>Great taste with easy mixing</li>
                                <li>Suitable for a wide range of fitness goals</li>
                                <li>Designed for beginners and experienced athletes alike</li>
                                <li>Dedicated to helping you perform at your best</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <FromLabToShaker />
            <section className="your-goal-our-formula pb-20">
                <div className="container">
                    <h2 className="h2-dine text-center mb-5">YOUR GOAL. OUR FORMULA.</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {goals.map((item, ind) => (
                            <div className="col-span-1" key={ind}>
                                <div className="goal-card flex flex-col gap-3 items-start">
                                    <img src={item.icon} alt={item.title} />
                                    <h4 className="h5-dine">{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <CallToAction />
        </>
    )
}

export default WhyAthpexSupplements
