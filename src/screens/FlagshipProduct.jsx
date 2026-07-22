import React from 'react'
import InnerBanner from '../components/InnerBanner'
import PreWorkout from '../components/PreWorkout'
import CallToAction from '../components/CallToAction'
const FlagshipProduct = () => {
    const atomicBlastFeatures = [
        {
            icon: '/images/atomic-blast/1.png',
            title: 'Powerful Energy',
            description: 'Delivers sustained energy to help you push through even your toughest training sessions.'
        },
        {
            icon: '/images/atomic-blast/2.png',
            title: 'Enhanced Focus',
            description: 'Supports mental clarity and concentration so you stay locked in from warm-up to cooldown.'
        },
        {
            icon: '/images/atomic-blast/3.png',
            title: 'Better Performance',
            description: 'Formulated to help maximize endurance, strength, and workout intensity.'
        },
        {
            icon: '/images/atomic-blast/4.png',
            title: 'Premium Ingredients',
            description: 'Made with quality ingredients chosen for effectiveness and consistency.'
        },
    ]
    return (
        <>
            <InnerBanner
                title="Flagship Product" />
            <PreWorkout />
            <section className="product-detail pb-20">
                <div className="container">
                    <h3 className="h3-dine mb-5">Product Details</h3>
                    <p style={{ color: '#fff' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.</p>
                </div>
            </section>
            <section className="atomic-blast pb-20">
                <div className="container text-center">
                    <h2 className="h2-dine mb-5">Why Atomic Blast?</h2>
                    <div className="grid grid-cols-4 gap-5">
                        {atomicBlastFeatures.map((feature, index) => (
                            <div className="col-span-1" key={index}>
                                <div className="atomic-blast-card">
                                    <div className="icon mb-3 text-center">
                                        <img className="mx-auto" src={feature.icon} alt={feature.title} />
                                    </div>
                                    <h4 className="h4-dine">{feature.title}</h4>
                                    <p>{feature.description}</p>
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

export default FlagshipProduct
