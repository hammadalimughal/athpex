import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InnerBanner from '../components/InnerBanner';
import { authService } from '../services/authService';
import {
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineTag,
  AiOutlineKey,
  AiOutlineLogout,
  AiOutlineCheckCircle,
  AiOutlineCar,
  AiOutlineCopy,
  AiOutlineRocket,
} from 'react-icons/ai';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('athpex_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error parsing stored user:', err);
      }
    } else {
      // Fetch fresh user profile if token exists
      authService.getCurrentUser().then((res) => {
        if (res.success && res.user) {
          setUser(res.user);
          localStorage.setItem('athpex_user', JSON.stringify(res.user));
        }
      });
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText('https://athpex.com/ref/' + (user?.name?.toLowerCase().replace(/\s+/g, '') || 'athlete'));
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Mock Order History Data
  const MOCK_ORDERS = [
    {
      id: 'ATHPEX-89421',
      date: 'July 20, 2026',
      status: 'In Transit',
      statusColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
      total: 67.98,
      items: [
        {
          name: 'Atomic Blast Pre-Workout',
          flavor: 'Sour Apple Burst / 30 Servings',
          qty: 2,
          price: 33.99,
          image: '/images/pre-workout.png',
        },
      ],
      trackingNumber: '1Z9999999999999999',
    },
    {
      id: 'ATHPEX-74102',
      date: 'June 12, 2026',
      status: 'Delivered',
      statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
      total: 49.99,
      items: [
        {
          name: 'The Starter Stack',
          flavor: 'Pre-Workout + Shaker Cup',
          qty: 1,
          price: 49.99,
          image: '/images/featured-stack/1.png',
        },
      ],
      trackingNumber: '1Z8888888888888888',
    },
    {
      id: 'ATHPEX-52914',
      date: 'May 01, 2026',
      status: 'Delivered',
      statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
      total: 79.99,
      items: [
        {
          name: 'Essential Performance Stack',
          flavor: 'Ultimate Training Bundle',
          qty: 1,
          price: 79.99,
          image: '/images/featured-stack/2.png',
        },
      ],
      trackingNumber: '1Z7777777777777777',
    },
  ];

  const userName = user?.name || 'ATHPEX Athlete';
  const userEmail = user?.email || 'athlete@athpex.com';
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <InnerBanner title="Dashboard" />

      <section className="dashboard-section py-20 bg-black text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar Profile Overview */}
            <div className="lg:col-span-4">
              <div className="bg-[#0b0b0e] border border-neutral-800 rounded-3xl p-6 sticky top-28">
                {/* User Avatar & Info */}
                <div className="flex flex-col items-center text-center pb-6 border-b border-neutral-800">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-red-600 via-neutral-900 to-blue-500 p-0.5 mb-3 shadow-lg">
                    <div className="w-full h-full bg-[#0b0b0e] rounded-full flex items-center justify-center text-white font-bold text-2xl font-mono">
                      {initials}
                    </div>
                  </div>

                  <h3 className="h3-dine text-white text-xl font-bold">{userName}</h3>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">{userEmail}</p>

                  <span className="inline-block mt-3 bg-red-600/10 border border-red-500/30 text-[#e63b38] text-[11px] font-bold px-3 py-1 rounded-full tagline">
                    VIP ATHLETE MEMBER
                  </span>
                </div>

                {/* Dashboard Navigation Tabs */}
                <nav className="flex flex-col gap-2 mt-6">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      activeTab === 'orders'
                        ? 'bg-neutral-800 text-white border border-neutral-700'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                    }`}
                  >
                    <AiOutlineShopping className="text-lg text-[#98B4E7]" />
                    Order History
                  </button>

                  <button
                    onClick={() => setActiveTab('account')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      activeTab === 'account'
                        ? 'bg-neutral-800 text-white border border-neutral-700'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                    }`}
                  >
                    <AiOutlineUser className="text-lg text-[#98B4E7]" />
                    Account & Address
                  </button>

                  <button
                    onClick={() => setActiveTab('ambassador')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      activeTab === 'ambassador'
                        ? 'bg-neutral-800 text-white border border-neutral-700'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                    }`}
                  >
                    <AiOutlineTag className="text-lg text-[#98B4E7]" />
                    Ambassador Rewards
                  </button>
                </nav>

                {/* Sign Out Button */}
                <div className="mt-8 pt-6 border-t border-neutral-800">
                  <button
                    onClick={handleLogout}
                    className="btn btn-secondary w-full justify-center py-2.5 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <AiOutlineLogout className="text-base" /> SIGN OUT
                  </button>
                </div>
              </div>
            </div>

            {/* Right Main Content Area */}
            <div className="lg:col-span-8">
              {/* Top Quick Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#0b0b0e] border border-neutral-800 rounded-2xl p-4 text-center">
                  <span className="tagline text-[10px] text-neutral-400 block mb-1">
                    TOTAL ORDERS
                  </span>
                  <span className="h3-airborne text-white text-2xl font-bold">3</span>
                </div>
                <div className="bg-[#0b0b0e] border border-neutral-800 rounded-2xl p-4 text-center">
                  <span className="tagline text-[10px] text-neutral-400 block mb-1">
                    SUBSCRIPTIONS
                  </span>
                  <span className="h3-airborne text-emerald-400 text-2xl font-bold">1 Active</span>
                </div>
                <div className="bg-[#0b0b0e] border border-neutral-800 rounded-2xl p-4 text-center">
                  <span className="tagline text-[10px] text-neutral-400 block mb-1">
                    REWARD POINTS
                  </span>
                  <span className="h3-airborne text-[#98B4E7] text-2xl font-bold">450</span>
                </div>
                <div className="bg-[#0b0b0e] border border-neutral-800 rounded-2xl p-4 text-center">
                  <span className="tagline text-[10px] text-neutral-400 block mb-1">
                    ATHLETE TIER
                  </span>
                  <span className="h3-airborne text-[#e63b38] text-2xl font-bold">Tier 2</span>
                </div>
              </div>

              {/* TAB 1: ORDER HISTORY */}
              {activeTab === 'orders' && (
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
                    <h3 className="h3-dine text-white">Order History</h3>
                    <Link to="/checkout" className="btn btn-primary !py-2 text-xs">
                      ORDER NEW STACK
                    </Link>
                  </div>

                  {MOCK_ORDERS.map((order) => (
                    <div
                      key={order.id}
                      className="bg-[#0b0b0e] border border-neutral-800 rounded-2xl p-6 flex flex-col gap-4"
                    >
                      {/* Order Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-800/80">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-white font-mono font-bold text-base">
                              {order.id}
                            </span>
                            <span
                              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${order.statusColor}`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <span className="text-xs text-neutral-400 block mt-1">
                            Placed on {order.date}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-neutral-400 block">Total Amount</span>
                          <span className="h4-airborne text-[#98B4E7] font-bold text-lg">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Order Items List */}
                      <div className="flex flex-col gap-3">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-14 h-14 bg-neutral-900 rounded-xl p-1 shrink-0 border border-neutral-800 flex items-center justify-center">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="max-h-full max-w-full object-contain"
                                />
                              </div>
                              <div>
                                <h4 className="h4-airborne text-white text-sm font-semibold">
                                  {item.name}
                                </h4>
                                <p className="text-xs text-neutral-400">{item.flavor}</p>
                              </div>
                            </div>

                            <span className="text-xs text-neutral-300 font-mono">
                              {item.qty}x ${item.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Order Actions */}
                      <div className="pt-3 border-t border-neutral-800/80 flex flex-wrap justify-between items-center gap-3 text-xs">
                        <div className="flex items-center gap-2 text-neutral-400">
                          <AiOutlineCar className="text-base text-[#98B4E7]" />
                          <span>Tracking: {order.trackingNumber}</span>
                        </div>

                        <div className="flex gap-2">
                          <Link
                            to="/checkout"
                            className="btn btn-secondary !py-1.5 !px-4 text-xs"
                          >
                            Reorder Stack
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: ACCOUNT SETTINGS */}
              {activeTab === 'account' && (
                <div className="bg-[#0b0b0e] border border-neutral-800 rounded-3xl p-6 md:p-8">
                  <h3 className="h3-dine text-white mb-6 pb-3 border-b border-neutral-800">
                    Account & Shipping Profile
                  </h3>

                  <form className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="tagline text-xs text-neutral-400 block mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={userName}
                          className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                        />
                      </div>
                      <div>
                        <label className="tagline text-xs text-neutral-400 block mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue={userEmail}
                          disabled
                          className="w-full bg-neutral-900 border border-neutral-800 text-neutral-500 rounded-xl p-3 text-sm cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-800">
                      <h4 className="h4-dine text-white mb-3">Default Shipping Address</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="tagline text-xs text-neutral-400 block mb-1">
                            Street Address
                          </label>
                          <input
                            type="text"
                            defaultValue="100 Performance Way"
                            className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                          />
                        </div>
                        <div>
                          <label className="tagline text-xs text-neutral-400 block mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            defaultValue="Los Angeles"
                            className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                          />
                        </div>
                        <div>
                          <label className="tagline text-xs text-neutral-400 block mb-1">
                            State / ZIP Code
                          </label>
                          <input
                            type="text"
                            defaultValue="CA 90015"
                            className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#98B4E7]"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary w-fit py-3 px-6 text-xs mt-4"
                    >
                      SAVE PROFILE CHANGES
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 3: AMBASSADOR REWARDS */}
              {activeTab === 'ambassador' && (
                <div className="bg-[#0b0b0e] border border-neutral-800 rounded-3xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <AiOutlineRocket className="text-3xl text-[#98B4E7]" />
                    <div>
                      <h3 className="h3-dine text-white">Ambassador Referral Link</h3>
                      <p className="text-xs text-neutral-400">
                        Share your unique link and earn 15% commission on every order.
                      </p>
                    </div>
                  </div>

                  {/* Referral Link Box */}
                  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between gap-3 mb-6">
                    <span className="text-sm font-mono text-[#98B4E7] truncate">
                      https://athpex.com/ref/{userName.toLowerCase().replace(/\s+/g, '')}
                    </span>
                    <button
                      onClick={copyReferralLink}
                      className="btn btn-secondary !py-2 !px-4 text-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedLink ? (
                        <>
                          <AiOutlineCheckCircle className="text-emerald-400 text-sm" /> Copied!
                        </>
                      ) : (
                        <>
                          <AiOutlineCopy /> Copy Link
                        </>
                      )}
                    </button>
                  </div>

                  {/* Ambassador Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5">
                      <span className="tagline text-xs text-neutral-400 block mb-1">
                        TOTAL REFERRALS
                      </span>
                      <h4 className="h3-airborne text-white text-3xl font-bold">12 Athletes</h4>
                      <p className="text-xs text-neutral-400 mt-1">Active community members</p>
                    </div>
                    <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5">
                      <span className="tagline text-xs text-neutral-400 block mb-1">
                        COMMISSION EARNED
                      </span>
                      <h4 className="h3-airborne text-emerald-400 text-3xl font-bold">
                        $144.00
                      </h4>
                      <p className="text-xs text-neutral-400 mt-1">Ready for monthly payout</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
