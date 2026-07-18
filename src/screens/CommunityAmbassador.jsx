import React from 'react'
import InnerBanner from '../components/InnerBanner'
import VideoTestimonials from '../components/VideoTestimonials'
import FAQ from '../components/FAQ'

const steps = [
  {
    index: '01',
    title: 'Apply Below',
    description: 'Fill out the application form. We review every submission within 14 business days.'
  },
  {
    index: '02',
    title: 'Interview',
    description: 'Shortlisted candidates join a 30-minute video call with our Community team.'
  },
  {
    index: '03',
    title: 'Onboarding',
    description: 'Complete a self-paced ambassador certification course and meet your cohort.'
  },
  {
    index: '04',
    title: 'Launch',
    description: 'Receive your kit, go live, and start making an impact in your community.'
  },
]

const CommunityAmbassador = () => {
  return (
    <>
      <InnerBanner title="Community / Ambassador" />
      <section className="ambassador-steps py-20">
        <div className="container">
          <h2 className="h2-dine lg:w-2/5">
            Four steps from
            here to ambassador.
          </h2>
          <div className="grid grid-cols-4 gap-5 mt-4">
            {steps.map((step, index) => (
              <div className="col-span-1">
                <div className="step-card flex flex-col gap-2">
                  <span className="index text-2xl">{step.index}</span>
                  <h4 className="h4-airborne">{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </div>

            ))}
          </div>
        </div>
      </section>
      <section className="ambassador-application pb-20">
        <div className="container">
          <div className="grid grid-cols-2 gap-10">
            <div className="col-span-1">
              <img className="sticky top-30" src="/images/ambassador-featured.png" alt="Pre Workout Atomic Blast" />
            </div>
            <div className="col-span-1">
              <div className="ambassador-application-form">
                <form action="">
                  <h2 className="h2-dine">Ambassador Application</h2>
                  <p>Complete the form below. Every field matters — we read every application carefully. We'll respond within 14 business days.</p>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-2">
                      <h5 className="info">Personal Information</h5>
                    </div>
                    <div className="col-span-1">
                      <div className="input-field">
                        <label htmlFor="first-name">First Name *</label>
                        <input type="text" id="first-name" placeholder="" />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="input-field">
                        <label htmlFor="last-name">Last Name *</label>
                        <input type="text" id="last-name" placeholder="" />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="input-field">
                        <label htmlFor="last-name">Email Address *</label>
                        <input type="text" id="last-name" placeholder="" />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="input-field">
                        <label htmlFor="last-name">Country of Residence *</label>
                        <input type="text" id="last-name" placeholder="" />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <h5 className="info">Community Presence</h5>
                    </div>
                    <div className="col-span-1">
                      <div className="input-field">
                        <label htmlFor="last-name">Primary Platform *</label>
                        <input type="text" id="last-name" placeholder="" />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="input-field">
                        <label htmlFor="last-name">Handle / URL *</label>
                        <input type="text" id="last-name" placeholder="@yourhandle or https://..." />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="input-field">
                        <label htmlFor="last-name">Approximate Audience Size</label>
                        <input type="text" id="last-name" placeholder="" />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="input-field">
                        <label htmlFor="last-name">Relevant past experience</label>
                        <input type="text" id="last-name" placeholder="e.g. Speaker at PyCon 2024, founded a DEI group, TEDx..." />
                      </div>
                    </div> <div className="col-span-2">
                      <h5 className="info">Your Statement</h5>
                    </div>
                    <div className="col-span-2">
                      <div className="input-field">
                        <label htmlFor="first-name">Why do you want to be a Meridian Ambassador? *</label>
                        <textarea name="your-statement" id="your-statement" placeholder="Tell us about your connection to our mission, the community you'd serve, and what you'd bring to the program. (min. 50 characters)"></textarea>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="checkbox-field">
                        <input type="checkbox" id="terms" />
                        <label htmlFor="terms">I confirm the information above is accurate and I agree to the Ambassador Program Terms and Privacy Policy.</label>
                      </div>
                    </div>
                  </div>
                  <button>Submit Your Application</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <VideoTestimonials />
      <FAQ />
    </>
  )
}

export default CommunityAmbassador
