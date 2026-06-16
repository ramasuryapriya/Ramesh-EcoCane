import React, { useState, useEffect } from 'react';
import { CheckCircle, Truck, Package, Heart, RefreshCw, Compass, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
  addPoints: (amount: number) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onClearCart,
  addPoints
}: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2>(1); // 1: Shipping and inputs, 2: Receipt and progress trace
  const [shippingData, setShippingData] = useState({
    name: '',
    street: '',
    city: 'Bangalore',
    pincode: '',
    phone: '',
    paymentMethod: 'card'
  });

  const [orderId, setOrderId] = useState('');
  const [trackerStep, setTrackerStep] = useState(0); // 0: Harvesting, 1: Pressing, 2: Dispatched, 3: Completed

  // Automatically progress tracker step for fun simulation
  useEffect(() => {
    if (step === 2 && trackerStep < 3) {
      const timer = setTimeout(() => {
        setTrackerStep((st) => st + 1);
      }, 5000); // Progresses every 5 seconds
      return () => clearTimeout(timer);
    }
  }, [step, trackerStep]);

  if (!isOpen) return null;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = 'CANE-ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(id);
    
    // Save to Firestore!
    const path = `orders`;
    try {
      await setDoc(doc(db, path, id), {
        id,
        items: cartItems.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          isSubscription: !!item.isSubscription,
          subscriptionFrequency: item.subscriptionFrequency || null
        })),
        customerName: shippingData.name || 'Loyal Guest',
        customerPhone: shippingData.phone,
        customerAddress: `${shippingData.street}, ${shippingData.city} - ${shippingData.pincode}`,
        totalAmount: finalTotal,
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `${path}/${id}`);
    }

    // Give loyalty reward points for buying! (e.g. 50 bonus points for order!)
    addPoints(150);
    
    setStep(2);
  };

  const handleFinalFinish = () => {
    onClearCart();
    setStep(1);
    setTrackerStep(0);
    onClose();
  };

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCost = cartItems.reduce((acc, item) => {
    const isSub = !!item.isSubscription;
    const itemPrice = isSub ? item.product.price * 0.85 : item.product.price;
    return acc + (itemPrice * item.quantity);
  }, 0);

  // Bulk discount calculations
  let bulkDiscountRate = 0;
  if (totalQuantity >= 10) {
    bulkDiscountRate = 0.15;
  } else if (totalQuantity >= 5) {
    bulkDiscountRate = 0.1;
  }
  const finalTotal = totalCost * (1 - bulkDiscountRate);

  const trackingPhases = [
    { title: 'Ethical Harvesting', desc: 'Cutting raw sugarcane in Karnataka agricultural belts.' },
    { title: 'Juice Cold-Pressing & Hot Mold', desc: 'Extracting organic jaggery and molding heavy-weight bagasse plates.' },
    { title: 'Planted Transit', desc: 'Package dispatched using carbon-neutral logistics carrier partner.' },
    { title: 'Arrived at destination', desc: 'Dispatched to your kitchen safe and sound.' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" id="checkout-modal-backdrop">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {step === 1 ? (
            /* STEP 1: Shipping and payment input form */
            <motion.div
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-8 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold">
                  <Truck className="h-5.5 w-5.5" />
                  <h3 className="text-lg font-sans tracking-tight">Eco-Secure Delivery Checkout</h3>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full bg-gray-50 h-7 w-7 flex items-center justify-center hover:bg-gray-100 text-gray-500 font-bold transition-all text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Inputs area */}
                <form onSubmit={handlePlaceOrder} className="md:col-span-7 space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase">Shipment Location</h4>
                  
                  <div>
                    <label htmlFor="chk-name" className="block text-xs font-semibold text-gray-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      id="chk-name"
                      value={shippingData.name}
                      onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="chk-street" className="block text-xs font-semibold text-gray-700 mb-1">Street Address *</label>
                    <input
                      type="text"
                      required
                      id="chk-street"
                      value={shippingData.street}
                      onChange={(e) => setShippingData({ ...shippingData, street: e.target.value })}
                      placeholder="e.g. 15th Main Rd, Indiranagar"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="chk-city" className="block text-xs font-semibold text-gray-700 mb-1">Metro City *</label>
                      <select
                        id="chk-city"
                        value={shippingData.city}
                        onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none bg-white"
                      >
                        <option value="Bangalore">Bangalore (Immediate Express)</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi NCR</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Kolkata">Kolkata</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="chk-pin" className="block text-xs font-semibold text-gray-700 mb-1">Pincode *</label>
                      <input
                        type="text"
                        required
                        id="chk-pin"
                        pattern="^[0-9]{6}$"
                        value={shippingData.pincode}
                        onChange={(e) => setShippingData({ ...shippingData, pincode: e.target.value })}
                        placeholder="e.g. 560038"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="chk-phone" className="block text-xs font-semibold text-gray-700 mb-1">Contact Phone (WhatsApp alerts) *</label>
                    <input
                      type="tel"
                      required
                      id="chk-phone"
                      value={shippingData.phone}
                      onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                      placeholder="e.g. +91 98455 98765"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase pt-2">Safe Payment Channel</h4>

                  <div className="grid grid-cols-2 gap-2">
                    <label className={`flex items-center space-x-2 rounded-lg border p-2.5 cursor-pointer transition-all ${
                      shippingData.paymentMethod === 'card' 
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800' 
                        : 'border-gray-200 text-gray-600'
                    }`}>
                      <input
                        type="radio"
                        name="payment-method"
                        checked={shippingData.paymentMethod === 'card'}
                        onChange={() => setShippingData({ ...shippingData, paymentMethod: 'card' })}
                        className="sr-only"
                      />
                      <span className="text-xs font-bold">💳 Credit / Debit Card</span>
                    </label>

                    <label className={`flex items-center space-x-2 rounded-lg border p-2.5 cursor-pointer transition-all ${
                      shippingData.paymentMethod === 'upi' 
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800' 
                        : 'border-gray-200 text-gray-600'
                    }`}>
                      <input
                        type="radio"
                        name="payment-method"
                        checked={shippingData.paymentMethod === 'upi'}
                        onChange={() => setShippingData({ ...shippingData, paymentMethod: 'upi' })}
                        className="sr-only"
                      />
                      <span className="text-xs font-bold">📱 UPI / QR Scan</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    id="chk-confirm-btn"
                    className="w-full mt-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 py-3 text-xs font-black tracking-wide text-white shadow-md transition-colors font-sans"
                  >
                    Place Secure Order - ₹{finalTotal.toFixed(2)}
                  </button>
                </form>

                {/* Sub-Basket review area */}
                <div className="md:col-span-5 h-full rounded-xl bg-gray-50 border border-gray-200 p-4 flex flex-col justify-between space-y-4">
                  <div className="space-y-3.5">
                    <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase">Order Overview</h4>
                    <div className="space-y-2.5 max-h-[22vh] overflow-y-auto pr-1">
                      {cartItems.map((item) => {
                        const itemPrice = item.isSubscription ? item.product.price * 0.85 : item.product.price;
                        return (
                          <div key={item.product.id} className="flex justify-between items-start text-xs font-sans">
                            <span className="text-gray-600 max-w-[70%] leading-snug">
                              {item.product.name} <strong className="text-[10px] font-mono font-bold text-emerald-700">x{item.quantity}</strong>
                            </span>
                            <span className="font-mono text-gray-700 shrink-0">₹{(itemPrice * item.quantity).toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3 space-y-2.5">
                    <div className="text-[10px] leading-normal text-emerald-850 font-sans p-2 bg-emerald-50/50 rounded-lg flex gap-1.5 border border-emerald-100">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>By completing checkout, you earn <strong>150 CanePoints</strong> to unlock juice & plates vouchers.</span>
                    </div>

                    <div className="flex justify-between items-center pt-1 font-sans">
                      <span className="text-xs font-bold text-gray-800">Grand Total:</span>
                      <span className="font-mono text-md font-black text-emerald-950">₹{finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* STEP 2: Order confirmation and real-time transit tracker */
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-8 text-center space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
                <CheckCircle className="h-8 w-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-emerald-950 tracking-tight">Cane Order Dispatched!</h3>
                <p className="text-xs text-gray-400 font-sans mt-0.5">Order ID: <span className="font-mono font-bold text-gray-7n">{orderId}</span></p>
              </div>

              {/* Real-time sugarcane shipment trace timeline */}
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/20 p-4 text-left font-sans">
                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-4 flex items-center justify-between">
                  <span>Farm-to-Kitchen Shipment Tracker</span>
                  <span className="text-[9px] font-bold bg-amber-100 text-amber-850 px-2 py-0.5 rounded animate-pulse">
                    Live Circular Feed
                  </span>
                </h4>

                <div className="relative mt-2 p-2 font-sans">
                  {/* Background Connector line (horizontal, visible on small and larger screens) */}
                  <div className="absolute left-[12.5%] right-[12.5%] top-[18px] h-0.5 bg-gray-200 rounded-full hidden sm:block z-0">
                    <div 
                      className="h-full bg-emerald-600 transition-all duration-500 rounded-full" 
                      style={{ width: `${(trackerStep / (trackingPhases.length - 1)) * 100}%` }}
                    />
                  </div>

                  {/* Steps list container */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2 relative z-10 w-full">
                    {trackingPhases.map((phase, idx) => {
                      const isCompleted = trackerStep > idx;
                      const isActive = trackerStep === idx;
                      const isUpcoming = trackerStep < idx;

                      return (
                        <div key={idx} className="flex sm:flex-col items-center sm:text-center space-x-3 sm:space-x-0">
                          {/* Dot indicator */}
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ring-white shadow-xs transition-all ${
                            isCompleted
                              ? 'bg-emerald-600 text-white text-xs font-bold'
                              : isActive
                              ? 'bg-amber-500 text-white ring-amber-200 animate-pulse text-xs font-bold font-mono'
                              : 'bg-gray-200 text-gray-500 text-xs font-bold font-mono'
                          }`}>
                            {isCompleted ? '✓' : idx + 1}
                          </div>

                          {/* Text info block */}
                          <div className="sm:mt-2.5 text-left sm:text-center">
                            <p className={`text-[11px] font-bold leading-tight ${
                              isCompleted ? 'text-emerald-900' : isActive ? 'text-amber-800' : 'text-gray-400'
                            }`}>
                              {phase.title}
                            </p>
                            <p className="text-[9px] text-gray-400 leading-snug mt-0.5 max-w-[125px] mx-auto hidden sm:block">
                              {phase.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/20 border border-amber-100/50 flex items-start gap-3 text-left">
                <Compass className="h-5 w-5 text-amber-700 shrink-0 mt-0.5 animate-spin-slow" />
                <div className="text-xs">
                  <h5 className="font-bold text-amber-900">100% Offset Certified</h5>
                  <p className="text-gray-500 leading-normal mt-0.5 font-sans">
                    Every Ramesh EcoCane delivery avoids plastic cargo boxes by reusing heavy corrugated agricultural bagasse liners.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleFinalFinish}
                  className="w-full sm:w-auto rounded-xl bg-emerald-700 hover:bg-emerald-600 px-6 py-2.5 text-xs font-black text-white shadow-sm transition-colors"
                >
                  Return to Store Space
                </button>
                <a
                  href={`https://wa.me/919845012345?text=Hi!%20I%20have%20just%20placed%20EcoCane%20order%20${orderId}.%20I%20would%20like%20to%20simulate%20an%20instant%20dispatch.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center space-x-1 border border-emerald-250 hover:bg-emerald-50 px-6 py-2.5 text-xs font-bold text-emerald-850 rounded-xl"
                >
                  <span>Quick Trace WhatsApp</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
