import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InnerBanner from '../components/InnerBanner';
import QuantitySelector from '../components/QuantitySelector';
import {
  AiOutlineLock,
  AiOutlineCheckCircle,
  AiOutlineCreditCard,
  AiOutlineSafety,
  AiOutlineRocket,
  AiOutlineTag,
} from 'react-icons/ai';

export default function Checkout() {
  const navigate = useNavigate();

  // Single-product checkout state
  const UNIT_PRICE = 39.99;
  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState('Sour Apple Burst');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Form Fields
  const [formData, setFormData] = useState({
    email: '',
    subscribeNewsletter: true,
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: 'United States',
    state: '',
    zip: '',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Automated Bundle Discount Logic:
  // 1 tub = base price
  // 2 tubs = 10% automatic bundle discount
  // 3+ tubs = 15% automatic bundle discount + FREE shipping
  let autoBundleDiscountPercent = 0;
  if (quantity === 2) autoBundleDiscountPercent = 10;
  if (quantity >= 3) autoBundleDiscountPercent = 15;

  const effectiveDiscountPercent = Math.max(discountPercent, autoBundleDiscountPercent);

  const rawSubtotal = UNIT_PRICE * quantity;
  const discountAmount = (rawSubtotal * effectiveDiscountPercent) / 100;
  const subtotalAfterDiscount = rawSubtotal - discountAmount;

  // Free shipping for 2+ tubs or orders over $70
  const isFreeShipping = quantity >= 2 || subtotalAfterDiscount >= 70;
  const shippingCost = isFreeShipping ? 0 : 5.99;
  const taxAmount = subtotalAfterDiscount * 0.08;
  const grandTotal = subtotalAfterDiscount + shippingCost + taxAmount;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleApplyPromo = () => {
    const clean = promoCode.trim().toUpperCase();
    if (!clean) {
      setPromoError('Please enter a coupon code.');
      setPromoSuccess('');
      return;
    }
    if (clean === 'ATHPEX10' || clean === 'ATHPEX') {
      setDiscountPercent(10);
      setPromoSuccess('10% discount coupon applied!');
      setPromoError('');
    } else if (clean === 'PROMO20') {
      setDiscountPercent(20);
      setPromoSuccess('20% VIP discount coupon applied!');
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try ATHPEX10');
      setPromoSuccess('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedId = 'ATHPEX-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setIsSubmitted(true);
  };

  return (
    <>
      <InnerBanner title="Checkout" />

      <section className="checkout-section py-20 bg-black text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Customer Details & Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Express Payment Buttons */}
                {/* <div className="bg-[#0b0b0e] border border-neutral-800 rounded-2xl p-6">
                  <span className="tagline text-xs text-neutral-400 block mb-3 text-center">
                    Express Checkout Options
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      className="bg-[#5a31f4] hover:bg-[#4722d4] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
                    >
                      Shop Pay
                    </button>
                    <button
                      type="button"
                      className="bg-black border border-neutral-700 hover:border-white text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
                    >
                       Pay
                    </button>
                    <button
                      type="button"
                      className="bg-[#ffc439] text-black hover:bg-[#e0ab30] py-3 rounded-xl font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
                    >
                      PayPal
                    </button>
                  </div>
                </div> */}

                {/* Contact Information */}
                <div className="bg-[#0b0b0e] border border-neutral-800 rounded-2xl p-6">
                  <h3 className="h3-dine text-white mb-4">Contact Information</h3>
                  <div className="flex flex-col gap-4">
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
                        placeholder="you@example.com"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="subscribeNewsletter"
                        name="subscribeNewsletter"
                        checked={formData.subscribeNewsletter}
                        onChange={handleChange}
                        className="accent-[#98B4E7] w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor="subscribeNewsletter" className="text-xs text-neutral-400 cursor-pointer">
                        Keep me updated on ATHPEX releases, restocks & exclusive training guides
                      </label>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-[#0b0b0e] border border-neutral-800 rounded-2xl p-6">
                  <h3 className="h3-dine text-white mb-4">Shipping Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="tagline text-xs text-neutral-400 block mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                      />
                    </div>
                    <div>
                      <label className="tagline text-xs text-neutral-400 block mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="tagline text-xs text-neutral-400 block mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Athletic Drive"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="tagline text-xs text-neutral-400 block mb-1">
                        Apartment, suite, unit (optional)
                      </label>
                      <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                        placeholder="Suite 400"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                      />
                    </div>
                    <div>
                      <label className="tagline text-xs text-neutral-400 block mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Los Angeles"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                      />
                    </div>
                    <div>
                      <label className="tagline text-xs text-neutral-400 block mb-1">
                        State / Province *
                      </label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="California"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                      />
                    </div>
                    <div>
                      <label className="tagline text-xs text-neutral-400 block mb-1">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                      </select>
                    </div>
                    <div>
                      <label className="tagline text-xs text-neutral-400 block mb-1">
                        ZIP / Postal Code *
                      </label>
                      <input
                        type="text"
                        name="zip"
                        required
                        value={formData.zip}
                        onChange={handleChange}
                        placeholder="90001"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-[#0b0b0e] border border-neutral-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="h3-dine text-white">Payment Method</h3>
                    <div className="flex gap-2 text-xl text-neutral-400">
                      <AiOutlineCreditCard />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="tagline text-xs text-neutral-400 block mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="4532 •••• •••• 8892"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7] font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="tagline text-xs text-neutral-400 block mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          required
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM / YY"
                          className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                        />
                      </div>
                      <div>
                        <label className="tagline text-xs text-neutral-400 block mb-1">
                          CVC / CVV *
                        </label>
                        <input
                          type="text"
                          name="cardCvc"
                          required
                          value={formData.cardCvc}
                          onChange={handleChange}
                          placeholder="123"
                          className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="tagline text-xs text-neutral-400 block mb-1">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        required
                        value={formData.cardName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-full justify-center py-4 text-base font-semibold tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20"
                >
                  <AiOutlineLock className="text-xl" />
                  COMPLETE ORDER (${grandTotal.toFixed(2)})
                </button>
              </form>
            </div>

            {/* Right Column: Single Product Order Summary with Quantity Controls */}
            <div className="lg:col-span-5">
              <div className="bg-[#0b0b0e] border border-neutral-800 rounded-2xl p-6 sticky top-28">
                <h3 className="h3-dine mb-6 text-white pb-3 border-b border-neutral-800">
                  Order Summary
                </h3>

                {/* Main Flagship Product Card */}
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 mb-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-black rounded-xl p-2 shrink-0 border border-neutral-800 flex items-center justify-center">
                      <img
                        src="/images/pre-workout.png"
                        alt="Atomic Blast Pre-Workout"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <span className="tagline text-[10px] text-[#98B4E7] block font-semibold">
                          Flagship Formula
                        </span>
                        <h4 className="h4-airborne text-white text-base leading-tight mt-0.5">
                          ATOMIC BLAST PRE-WORKOUT
                        </h4>
                        <p className="text-xs text-neutral-400 mt-1">30 Servings / High Intensity</p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800/80">
                        <span className="text-xs text-neutral-400">Unit Price:</span>
                        <span className="text-sm font-bold text-white">${UNIT_PRICE}</span>
                      </div>
                    </div>
                  </div>

                  {/* Flavor Selection */}
                  <div className="mt-4 pt-3 border-t border-neutral-800">
                    <label className="tagline text-xs text-neutral-400 block mb-2">
                      Select Flavor:
                    </label>
                    <select
                      value={selectedFlavor}
                      onChange={(e) => setSelectedFlavor(e.target.value)}
                      className="w-full bg-black border border-neutral-800 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#98B4E7]"
                    >
                      <option value="Sour Apple Burst">Sour Apple Burst (Bestseller)</option>
                      <option value="Blue Raspberry Freeze">Blue Raspberry Freeze</option>
                      <option value="Atomic Watermelon">Atomic Watermelon</option>
                      <option value="Fruit Punch Chaos">Fruit Punch Chaos</option>
                    </select>
                  </div>

                  {/* Quantity Control directly on Checkout */}
                  <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <div>
                      <span className="h5-dine text-white block text-sm font-medium">Quantity</span>
                      <span className="text-[11px] text-neutral-400">Adjust tubs for discount</span>
                    </div>
                    <QuantitySelector
                      value={quantity}
                      onChange={(newQty) => setQuantity(newQty)}
                      min={1}
                      max={10}
                    />
                  </div>
                </div>

                {/* Bundle Savings Callout Banner */}
                <div className="bg-gradient-to-r from-red-950/40 via-neutral-900 to-red-950/40 border border-red-900/40 rounded-xl p-3.5 mb-6 text-xs text-neutral-300">
                  <div className="flex items-center gap-2 mb-1 text-[#98B4E7] font-semibold">
                    <AiOutlineTag className="text-base" />
                    <span>Bundle & Save Tiers</span>
                  </div>
                  <ul className="flex flex-col gap-1 text-[11px] text-neutral-400 pl-6 list-disc">
                    <li className={quantity === 1 ? 'text-white font-medium' : ''}>
                      Buy 1 Tub: Regular price (${UNIT_PRICE})
                    </li>
                    <li className={quantity === 2 ? 'text-emerald-400 font-bold' : ''}>
                      Buy 2 Tubs: Get 10% OFF + FREE Shipping
                    </li>
                    <li className={quantity >= 3 ? 'text-emerald-400 font-bold' : ''}>
                      Buy 3+ Tubs: Get 15% OFF + FREE Shipping
                    </li>
                  </ul>
                </div>

                {/* Promo Code Input */}
                <div className="mb-6">
                  <label className="tagline text-xs text-neutral-400 block mb-2">
                    Have a Promo Code?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Try ATHPEX10"
                      className="bg-neutral-900 border border-neutral-800 text-white rounded-xl px-3 py-2 text-xs w-full focus:outline-none focus:border-[#98B4E7] uppercase font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="btn btn-secondary !py-2 !px-4 text-xs shrink-0 cursor-pointer"
                    >
                      APPLY
                    </button>
                  </div>
                  {promoError && <p className="text-xs text-red-400 mt-2">{promoError}</p>}
                  {promoSuccess && <p className="text-xs text-emerald-400 mt-2">{promoSuccess}</p>}
                </div>

                {/* Pricing Summary */}
                <div className="flex flex-col gap-3 text-sm border-t border-neutral-800 pt-4 mb-6">
                  <div className="flex justify-between text-neutral-400">
                    <span>
                      Subtotal ({quantity} {quantity === 1 ? 'tub' : 'tubs'})
                    </span>
                    <span className="text-white font-medium">${rawSubtotal.toFixed(2)}</span>
                  </div>

                  {effectiveDiscountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400 font-medium">
                      <span>Discount ({effectiveDiscountPercent}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-400">
                    <span>Shipping</span>
                    <span className="text-white font-medium">
                      {isFreeShipping ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <AiOutlineRocket /> FREE
                        </span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-neutral-400">
                    <span>Estimated Tax (8%)</span>
                    <span className="text-white font-medium">${taxAmount.toFixed(2)}</span>
                  </div>

                  <div className="pt-4 border-t border-neutral-800 flex justify-between items-center">
                    <span className="h4-dine text-white">Total</span>
                    <span className="h3-airborne text-[#98B4E7] font-bold">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Money Back Guarantee */}
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 flex items-center gap-3">
                  <AiOutlineSafety className="text-3xl text-[#98B4E7] shrink-0" />
                  <div>
                    <h5 className="h5-dine text-white text-xs font-semibold">
                      30-Day Money Back Guarantee
                    </h5>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Try ATOMIC BLAST risk-free. Full refund if you don't feel the energy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Success Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b0b0e] border border-neutral-800 rounded-3xl max-w-lg w-full p-8 text-center shadow-2xl relative">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-5 text-emerald-400 text-3xl">
              <AiOutlineCheckCircle />
            </div>

            <span className="tagline text-xs text-emerald-400 block mb-1">
              Order Confirmed!
            </span>
            <h2 className="h2-airborne text-white text-2xl mb-2">Thank You For Your Order</h2>
            <p className="text-sm text-neutral-400 mb-4">
              Your order <strong className="text-white font-mono">{orderId}</strong> has been successfully placed. Your order of <strong className="text-white">{quantity}x {selectedFlavor}</strong> is being prepared!
            </p>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 mb-6 text-left text-xs text-neutral-300 flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">Confirmation Sent To:</span>
                <span className="text-white font-medium">{formData.email || 'customer@example.com'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Estimated Delivery:</span>
                <span className="text-white font-medium">2 - 4 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Total Charged:</span>
                <span className="text-[#98B4E7] font-bold">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                navigate('/');
              }}
              className="btn btn-primary w-full justify-center py-3"
            >
              RETURN TO HOME
            </button>
          </div>
        </div>
      )}
    </>
  );
}
