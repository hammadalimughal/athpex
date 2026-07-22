import React from 'react'

const CallToAction = () => {
    return (
        <section className="call-to-action-section pb-20">
            <div className="container">
                <div className="content-wrapper py-20">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="h2-airborne">Ready to Fuel Your Greatness?</h2>
                        <ul className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                            <li><a href="/checkout" className="btn btn-primary w-full sm:w-auto">Get Started</a></li>
                            <li><a href="/community-ambassador" className="btn btn-secondary w-full sm:w-auto">Become an Ambassador</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CallToAction
