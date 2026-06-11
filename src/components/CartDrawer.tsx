import { useState } from 'react';
import { ShoppingBag, Trash2, X, Plus, Minus, Tag, Percent, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedCheckout: () => void;
  claimedCoupons: string[];
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  claimedCoupons
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState('');
  const [activeCoupon, setActiveCoupon] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Total quantity calculation
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Subtotal (including subscription discount 15% where applicable)
  const subtotal = cartItems.reduce((acc, item) => {
    const isSub = !!item.isSubscription;
    const basePrice = isSub ? item.product.price * 0.85 : item.product.price;
    return acc + (basePrice * item.quantity);
  }, 0);

  // Bulk Discount calculation
  // Let us grant 10% off if total quantity >= 5, and 15% off if total quantity >= 10!
  let bulkDiscountRate = 0;
  if (totalQuantity >= 10) {
    bulkDiscountRate = 0.15;
  } else if (totalQuantity >= 5) {
    bulkDiscountRate = 0.1;
  }
  const bulkDiscountAmount = subtotal * bulkDiscountRate;

  // Coupon discount
  let couponDiscountAmount = 0;
  if (activeCoupon === 'FREEJUICE') {
    // Saves flat $4.50 (cost of a fresh cooler)
    couponDiscountAmount = Math.min(4.50, subtotal);
  } else if (activeCoupon === 'CANELOYAL10') {
    couponDiscountAmount = Math.min(10.00, subtotal - bulkDiscountAmount);
  } else if (activeCoupon === 'ECOWARRIOR25') {
    // Saves 25% on eco products specifically
    const ecoSubtotal = cartItems.reduce((acc, item) => {
      if (item.product.category === 'eco') {
        return acc + (item.product.price * item.quantity);
      }
      return acc;
    }, 0);
    couponDiscountAmount = ecoSubtotal * 0.25;
  }

  const finalTotal = Math.max(0, subtotal - bulkDiscountAmount - couponDiscountAmount);

  // Coupon submissions
  const handleApplyCoupon = (code: string) => {
    const cleanCode = code.toUpperCase().trim();
    if (!cleanCode) return;

    if (cleanCode === 'FREEJUICE' || cleanCode === 'CANELOYAL10' || cleanCode === 'ECOWARRIOR25') {
      setActiveCoupon(cleanCode);
      setCouponSuccess(`Coupon code '${cleanCode}' applied successfully!`);
      setCouponError(null);
    } else {
      setCouponError('Invalid coupon code. Try unlocking one in CanePoints Club first.');
      setCouponSuccess(null);
    }
  };

  const handleRemoveCoupon = () => {
    setActiveCoupon(null);
    setCouponSuccess(null);
    setCouponError(null);
    setCouponCode('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" id="cart-drawer-overlay">
      {/* Background click to close */}
      <div className="flex-1" onClick={onClose} />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        id="cart-drawer-container"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-100 p-4">
          <div className="flex items-center space-x-2 text-emerald-900 font-bold">
            <ShoppingBag className="h-5 w-5" />
            <span>Eco Basket ({totalQuantity})</span>
          </div>
          <button
            onClick={onClose}
            id="close-cart-drawer"
            className="rounded-full bg-gray-50 p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-all font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content body */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center space-y-3 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <p className="text-sm font-semibold text-gray-800 font-sans">Your sugarcane basket is empty!</p>
              <p className="text-xs text-gray-400 max-w-xs leading-normal">
                Choose from our raw organic food products or robust biodegradable bagasse tableware to begin.
              </p>
              <button
                onClick={onClose}
                className="rounded-lg bg-emerald-700 hover:bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <div className="space-y-4.5">
              {/* Cart List */}
              <div className="space-y-3 max-h-[35vh] overflow-y-auto pr-1">
                {cartItems.map((item) => {
                  const isSub = !!item.isSubscription;
                  const itemPrice = isSub ? item.product.price * 0.85 : item.product.price;

                  return (
                    <div
                      key={`${item.product.id}-${isSub ? item.subscriptionFrequency : 'once'}`}
                      className="flex items-start space-x-3 rounded-xl border border-gray-150 p-2.5 hover:shadow-inner transition-shadow font-sans"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="h-14 w-14 rounded-lg object-cover shrink-0"
                      />

                      <div className="flex-grow min-w-0">
                        <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{item.product.name}</h4>
                        <p className="text-[10px] text-gray-400 font-medium">Qty Unit: {item.product.unit}</p>

                        {isSub && (
                          <span className="inline-flex mt-0.5 items-center space-x-1 rounded bg-teal-50 px-1.5 py-0.5 text-[9px] font-bold text-teal-850 border border-teal-100">
                            <RefreshCw className="h-2 w-2 animate-spin-slow text-teal-600" />
                            <span>Subbed: {item.subscriptionFrequency} (15% Off)</span>
                          </span>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <span className="font-mono text-xs font-black text-gray-900">
                            ₹{(itemPrice * item.quantity).toFixed(2)}
                          </span>

                          <div className="flex h-7 items-center rounded bg-gray-50 border border-gray-150 py-0.5 px-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="h-6 w-6 rounded hover:bg-white flex items-center justify-center font-bold text-xs"
                            >
                              <Minus className="h-2.5 w-2.5" />
                            </button>
                            <span className="px-2 text-xs font-extrabold font-mono text-gray-900 w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="h-6 w-6 rounded hover:bg-white flex items-center justify-center font-bold text-xs"
                            >
                              <Plus className="h-2.5 w-2.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-gray-350 hover:text-red-500 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Bulk discount indicator bar */}
              <div className="rounded-xl bg-emerald-50/50 border border-emerald-100 p-3 text-xs space-y-1">
                {totalQuantity < 5 ? (
                  <div className="flex items-center space-x-2 text-emerald-850">
                    <Percent className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>
                      Add <strong>{5 - totalQuantity} more items</strong> of any product to unlock an extra <strong>10% bulk discount</strong>!
                    </span>
                  </div>
                ) : totalQuantity < 10 ? (
                  <div className="flex flex-col space-y-1">
                    <span className="text-emerald-850 font-bold block flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                      10% Bulk Discount Unlocked!
                    </span>
                    <p className="text-[11px] text-emerald-700">
                      Add <strong>{10 - totalQuantity} more items</strong> to upgrade to a <strong>15% total discount</strong>!
                    </p>
                  </div>
                ) : (
                  <span className="text-emerald-850 font-bold block flex items-center gap-1 text-[11px]">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
                    Premium 15% Bulk Discount Applied to your eco basket!
                  </span>
                )}
              </div>

              {/* Coupons claimed list */}
              {claimedCoupons.length > 0 && !activeCoupon && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Your Unlocked CanePoints Coupons</span>
                  <div className="flex flex-wrap gap-1.5">
                    {claimedCoupons.map((code) => (
                      <button
                        key={code}
                        onClick={() => handleApplyCoupon(code)}
                        className="bg-amber-100 hover:bg-amber-150 border border-amber-250 text-amber-800 font-bold text-[10px] py-1 px-2.5 rounded-lg transition-colors flex items-center space-x-1"
                        id={`apply-claimed-${code}`}
                      >
                        <Tag className="h-3 w-3" />
                        <span>{code}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Coupon custom code field */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. CANELOYAL10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow rounded-lg border border-gray-200 py-1.5 px-3 text-xs focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    onClick={() => handleApplyCoupon(couponCode)}
                    className="rounded-lg bg-emerald-100 hover:bg-emerald-150 px-4 py-1.5 text-xs font-bold text-emerald-800 border border-emerald-250 transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {couponSuccess && (
                  <p className="text-[10px] font-bold text-emerald-750">{couponSuccess}</p>
                )}
                {couponError && (
                  <p className="text-[10px] font-semibold text-rose-600">{couponError}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Checkout Summary Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50">
            <div className="space-y-1.5 text-xs text-gray-600 font-sans">
              <div className="flex justify-between">
                <span>Subtotal (Subscription savings met):</span>
                <span className="font-mono">₹{subtotal.toFixed(2)}</span>
              </div>

              {bulkDiscountRate > 0 && (
                <div className="flex justify-between text-emerald-750 font-semibold">
                  <span>Bulk Discount ({bulkDiscountRate * 100}%):</span>
                  <span className="font-mono">-₹{bulkDiscountAmount.toFixed(2)}</span>
                </div>
              )}

              {activeCoupon && (
                <div className="flex justify-between text-amber-700 font-semibold items-center">
                  <span className="flex items-center gap-1">
                    <Tag className="h-3 w-3 text-amber-600" />
                    Coupon Discount ({activeCoupon}):
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-mono">-₹{couponDiscountAmount.toFixed(2)}</span>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-red-500 hover:text-red-700 font-bold text-[10px]"
                      title="Clear Coupon"
                    >
                      (✕)
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-between border-t border-gray-200 pt-2 text-md font-bold text-gray-900">
                <span>Final Sourcing Total:</span>
                <span className="font-mono text-emerald-900">₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onProceedCheckout}
              id="checkout-payment-cta"
              className="flex w-full items-center justify-center space-x-2 rounded-xl bg-emerald-700 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-600 transition-all font-sans"
            >
              <span>Proceed to Checkout</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
