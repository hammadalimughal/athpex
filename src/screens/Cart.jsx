import React from 'react';
import { Link } from 'react-router-dom';
import InnerBanner from '../components/InnerBanner';
import QuantitySelector from '../components/QuantitySelector';
import { useCart } from '../context/CartContext';
import { AiOutlineDelete, AiOutlineShopping, AiOutlineCheckCircle, AiOutlineLock, AiOutlineRocket } from 'react-icons/ai';

export default function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeItem,
    promoCode,
    setPromoCode,
    discountPercent,
    promoError,
    promoSuccess,
    applyPromoCode,
    subtotal,
    discount,
    shipping,
    tax,
    total,
  } = useCart();

  return (
    <>
      <InnerBanner title="Shopping Cart" />

      <section className="cart-section py-20 bg-black text-white">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-[#0b0b0e] border border-neutral-800 rounded-2xl max-w-2xl mx-auto px-6">
              <AiOutlineShopping className="text-6xl text-neutral-600 mx-auto mb-4" />
              <h2 className="h2-dine mb-3 text-white">Your Cart is Empty</h2>
              <p className="mb-8 text-neutral-400">
                Looks like you haven't added any ATHPEX performance stacks or supplements yet.
              </p>
              <Link to="/flagship-product" className="btn btn-primary">
                EXPLORE PRODUCTS
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Cart Items List */}
              <div className="lg:col-span-8">
                <div className="flex justify-between items-center pb-4 mb-6 border-b border-neutral-800">
                  <h3 className="h3-dine">Items in Cart ({cartItems.length})</h3>
                  <span className="tagline text-xs text-neutral-400">
                    Free shipping over $75
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#0b0b0e] border border-neutral-800 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 transition-all hover:border-neutral-700"
                    >
                      {/* Product Thumbnail & Meta */}
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="w-20 h-20 bg-neutral-900 rounded-xl p-2 shrink-0 flex items-center justify-center border border-neutral-800">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div>
                          <h4 className="h4-airborne text-white text-base md:text-lg">
                            {item.name}
                          </h4>
                          <p className="text-xs text-neutral-400 mt-1">{item.flavor}</p>
                          <span className="text-sm font-bold text-white mt-1 block md:hidden">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Controls & Pricing */}
                      <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-neutral-800">
                        {/* Unit Price (Desktop) */}
                        <div className="hidden md:block text-right min-w-[70px]">
                          <span className="text-xs text-neutral-400 block mb-1">Price</span>
                          <span className="text-sm font-semibold text-white">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>

                        {/* Quantity Selector */}
                        <div>
                          <span className="text-xs text-neutral-400 block mb-1 text-center md:hidden">Qty</span>
                          <QuantitySelector
                            value={item.quantity}
                            onChange={(newQty) => updateQuantity(item.id, newQty)}
                          />
                        </div>

                        {/* Total Price */}
                        <div className="text-right min-w-[80px]">
                          <span className="text-xs text-neutral-400 block mb-1">Total</span>
                          <span className="text-base font-bold text-[#98B4E7]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-500 hover:text-red-500 transition-colors p-2 cursor-pointer"
                          title="Remove item"
                        >
                          <AiOutlineDelete className="text-xl" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Free Shipping Progress Bar */}
                <div className="mt-6 bg-[#0b0b0e] border border-neutral-800 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <AiOutlineRocket className="text-2xl text-[#98B4E7]" />
                    <h5 className="h5-dine text-white font-medium">
                      {subtotal >= 75
                        ? '🎉 You qualify for FREE Express Shipping!'
                        : `Add $${(75 - subtotal).toFixed(2)} more for FREE Express Shipping`}
                    </h5>
                  </div>
                  <div className="w-full bg-neutral-900 rounded-full h-2 overflow-hidden border border-neutral-800">
                    <div
                      className="bg-gradient-to-r from-[#98B4E7] to-blue-500 h-full transition-all duration-500"
                      style={{ width: `${Math.min((subtotal / 75) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Summary Card */}
              <div className="lg:col-span-4">
                <div className="bg-[#0b0b0e] border border-neutral-800 rounded-2xl p-6 sticky top-28">
                  <h3 className="h3-dine mb-6 text-white pb-3 border-b border-neutral-800">
                    Order Summary
                  </h3>

                  {/* Pricing Rows */}
                  <div className="flex flex-col gap-3 text-sm font-sans mb-6">
                    <div className="flex justify-between text-neutral-400">
                      <span>Subtotal</span>
                      <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between text-emerald-400 font-medium">
                        <span>Discount ({discountPercent}%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-neutral-400">
                      <span>Estimated Shipping</span>
                      <span className="text-white font-medium">
                        {shipping === 0 ? (
                          <span className="text-emerald-400">FREE</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-neutral-400">
                      <span>Estimated Tax (8%)</span>
                      <span className="text-white font-medium">${tax.toFixed(2)}</span>
                    </div>

                    <div className="pt-4 border-t border-neutral-800 flex justify-between items-center">
                      <span className="h4-dine text-white">Total</span>
                      <span className="h3-airborne text-[#98B4E7] font-bold">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Promo Code Section */}
                  <div className="mb-6">
                    <label className="tagline text-xs text-neutral-400 block mb-2">
                      Promo / Discount Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter ATHPEX10"
                        className="bg-neutral-900 border border-neutral-800 text-white rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-[#98B4E7] uppercase font-mono"
                      />
                      <button
                        onClick={() => applyPromoCode(promoCode)}
                        className="btn btn-secondary !py-2 !px-4 text-xs shrink-0"
                      >
                        APPLY
                      </button>
                    </div>
                    {promoError && <p className="text-xs text-red-400 mt-2">{promoError}</p>}
                    {promoSuccess && <p className="text-xs text-emerald-400 mt-2">{promoSuccess}</p>}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/checkout"
                      className="btn btn-primary w-full text-center justify-center py-3 text-sm tracking-wider"
                    >
                      PROCEED TO CHECKOUT
                    </Link>
                    <Link
                      to="/flagship-product"
                      className="btn btn-secondary w-full text-center justify-center py-3 text-sm tracking-wider"
                    >
                      CONTINUE SHOPPING
                    </Link>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-neutral-800/80 grid grid-cols-2 gap-3 text-xs text-neutral-400">
                    <div className="flex items-center gap-2">
                      <AiOutlineLock className="text-base text-[#98B4E7]" />
                      <span>256-Bit SSL Encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AiOutlineCheckCircle className="text-base text-[#98B4E7]" />
                      <span>100% Satisfaction Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
