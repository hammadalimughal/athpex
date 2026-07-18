import React, { useState } from 'react'

const faqs = [
    {
        question: "Is APEX PRE-WORKOUT stimulant-free?",
        answer: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        question: "Why do I feel a tingling sensation?",
        answer: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        question: "Can I stack APEX PRE-WORKOUT with other supplements?",
        answer: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        question: "How do I cancel my subscription?",
        answer: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
]

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <section className="faq-section py-20">
            <div className="container">
                <div className="grid grid-cols-2 gap-10">
                    <div className="col-span-1">
                        <div className="faq-listing mt-5 sticky top-30">
                            <h2 className="h2-dine">FAQ</h2>
                            <div className="grid grid-cols-2 gap-0">
                                {faqs.map((faq, index) => (
                                    <div className="col-span-2">
                                        <div className={`faq-card ${activeIndex === index ? 'active' : ''}`} onClick={() => setActiveIndex(index)}>
                                            <h4>{faq.question}</h4>
                                            {activeIndex === index && <p>{faq.answer}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <img className='rounded-xl sticky top-30' src="/images/faq-featured.png" alt="Atomic - Pre Workout" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FAQ
