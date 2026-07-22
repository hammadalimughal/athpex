import React, { useState } from 'react';
import InnerBanner from '../components/InnerBanner';
import FAQ from '../components/FAQ';
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineMessage,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineSend,
} from 'react-icons/ai';
import { FaInstagram, FaTwitter, FaYoutube, FaTiktok } from 'react-icons/fa';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    topic: 'General Inquiry',
    orderNumber: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedTicket = 'TICK-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(generatedTicket);
    setIsSubmitted(true);
  };

  return (
    <>
      <InnerBanner title="Contact Us" />

      {/* Main Contact Section */}
      <section className="contact-section py-20 bg-black text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Info & Channels */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <span className="tagline text-xs text-[#98B4E7] block mb-2 font-semibold">
                  WE ARE HERE TO HELP
                </span>
                <h2 className="h2-dine text-white text-3xl md:text-4xl mb-4">
                  GET IN TOUCH WITH ATHPEX
                </h2>
                <p className="text-neutral-400 font-sans text-sm md:text-base leading-relaxed">
                  Have questions about our high-performance pre-workout formulas, order tracking,
                  or brand ambassador program? Our dedicated support specialists are ready to assist you.
                </p>
              </div>

              {/* Response Time Callout */}
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#98B4E7]/10 border border-[#98B4E7]/30 flex items-center justify-center text-[#98B4E7] text-xl shrink-0">
                  <AiOutlineClockCircle />
                </div>
                <div>
                  <h5 className="h5-dine text-white text-sm font-semibold">
                    Fast Support Guarantee
                  </h5>
                  <p className="text-xs text-neutral-400 font-sans">
                    Average response time under 15 minutes during operating hours.
                  </p>
                </div>
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Card */}
                <div className="bg-[#0b0b0e] border border-neutral-800 rounded-2xl p-5 hover:border-neutral-700 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#98B4E7] text-xl mb-3">
                    <AiOutlineMail />
                  </div>
                  <h4 className="h4-airborne text-white text-base mb-1">Email Us</h4>
                  <p className="text-xs text-neutral-400 font-sans mb-2">24/7 Support Desk</p>
                  <a
                    href="mailto:support@athpex.com"
                    className="text-sm font-bold text-white hover:text-[#98B4E7] transition-colors"
                  >
                    support@athpex.com
                  </a>
                </div>

                {/* Phone Card */}
                <div className="bg-[#0b0b0e] border border-neutral-800 rounded-2xl p-5 hover:border-neutral-700 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#98B4E7] text-xl mb-3">
                    <AiOutlinePhone />
                  </div>
                  <h4 className="h4-airborne text-white text-base mb-1">Call Us</h4>
                  <p className="text-xs text-neutral-400 font-sans mb-2">Mon - Fri: 8am - 8pm EST</p>
                  <a
                    href="tel:+18005552847"
                    className="text-sm font-bold text-white hover:text-[#98B4E7] transition-colors"
                  >
                    +1 (800) 555-ATHP
                  </a>
                </div>

                {/* HQ Location */}
                <div className="bg-[#0b0b0e] border border-neutral-800 rounded-2xl p-5 hover:border-neutral-700 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#98B4E7] text-xl mb-3">
                    <AiOutlineEnvironment />
                  </div>
                  <h4 className="h4-airborne text-white text-base mb-1">Headquarters</h4>
                  <p className="text-xs text-neutral-400 font-sans">
                    100 Performance Plaza,
                    <br />
                    Los Angeles, CA 90015 · USA
                  </p>
                </div>

                {/* Live Chat */}
                <div className="bg-[#0b0b0e] border border-neutral-800 rounded-2xl p-5 hover:border-neutral-700 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#98B4E7] text-xl mb-3">
                    <AiOutlineMessage />
                  </div>
                  <h4 className="h4-airborne text-white text-base mb-1">Live Chat</h4>
                  <p className="text-xs text-neutral-400 font-sans mb-2">Available on website</p>
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Support Online
                  </span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-neutral-800/80">
                <span className="tagline text-xs text-neutral-400 block mb-3">
                  Follow ATHPEX Community
                </span>
                <div className="flex gap-3">
                  <a
                    href="#instagram"
                    className="w-10 h-10 rounded-xl bg-[#0b0b0e] border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#98B4E7] transition-all"
                  >
                    <FaInstagram className="text-lg" />
                  </a>
                  <a
                    href="#twitter"
                    className="w-10 h-10 rounded-xl bg-[#0b0b0e] border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#98B4E7] transition-all"
                  >
                    <FaTwitter className="text-lg" />
                  </a>
                  <a
                    href="#youtube"
                    className="w-10 h-10 rounded-xl bg-[#0b0b0e] border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#98B4E7] transition-all"
                  >
                    <FaYoutube className="text-lg" />
                  </a>
                  <a
                    href="#tiktok"
                    className="w-10 h-10 rounded-xl bg-[#0b0b0e] border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#98B4E7] transition-all"
                  >
                    <FaTiktok className="text-lg" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#0b0b0e] border border-neutral-800 rounded-3xl p-6 md:p-8 relative">
                <h3 className="h3-dine text-white mb-2">Send Us A Message</h3>
                <p className="text-xs md:text-sm text-neutral-400 font-sans mb-6">
                  Fill out the form below and our team will get back to you within a few hours.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="tagline text-xs text-neutral-400 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                      />
                    </div>

                    <div>
                      <label className="tagline text-xs text-neutral-400 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="tagline text-xs text-neutral-400 block mb-1">
                        Topic / Category *
                      </label>
                      <select
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Order & Shipping Support">Order & Shipping Support</option>
                        <option value="Product Ingredients & Dosage">
                          Product Ingredients & Dosage
                        </option>
                        <option value="Ambassador Program">Ambassador Program</option>
                        <option value="Wholesale & Distribution">Wholesale & Distribution</option>
                      </select>
                    </div>

                    <div>
                      <label className="tagline text-xs text-neutral-400 block mb-1">
                        Order Number (Optional)
                      </label>
                      <input
                        type="text"
                        name="orderNumber"
                        value={formData.orderNumber}
                        onChange={handleChange}
                        placeholder="e.g. ATHPEX-123456"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="tagline text-xs text-neutral-400 block mb-1">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we assist you with your athletic performance journey?"
                      className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7] font-sans"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full justify-center py-4 text-sm font-semibold tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20"
                  >
                    <AiOutlineSend className="text-lg" />
                    SEND MESSAGE
                  </button>
                </form>

                {/* Submission Success Banner */}
                {isSubmitted && (
                  <div className="absolute inset-0 bg-[#0b0b0e] border border-neutral-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center z-20">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 text-3xl mb-4">
                      <AiOutlineCheckCircle />
                    </div>
                    <span className="tagline text-xs text-emerald-400 block mb-1">
                      Message Received!
                    </span>
                    <h3 className="h3-dine text-white text-2xl mb-2">Thank You For Reaching Out</h3>
                    <p className="text-sm text-neutral-400 max-w-md mb-4 font-sans">
                      Your ticket <strong className="text-white font-mono">{ticketId}</strong> has been logged. An ATHPEX support agent will respond to <strong className="text-white">{formData.email}</strong> shortly.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="btn btn-secondary py-2.5 px-6 text-xs"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Answers Section */}
      <FAQ />
    </>
  );
}
