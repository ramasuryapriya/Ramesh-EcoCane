import React, { useState } from 'react';
import { Award, Check, Sparkles, User, Gift, Coins, Tag } from 'lucide-react';
import { motion } from 'motion/react';

interface LoyaltyClubProps {
  points: number;
  addPoints: (amount: number) => void;
  onClose: () => void;
  claimedCoupons: string[];
  claimCoupon: (code: string, cost: number) => void;
}

export default function LoyaltyClub({
  points,
  addPoints,
  onClose,
  claimedCoupons,
  claimCoupon
}: LoyaltyClubProps) {
  const [userName, setUserName] = useState('');
  const [isLobeJoined, setIsLobeJoined] = useState(false);

  // Rewards list
  const rewardVouchers = [
    {
      code: 'FREEJUICE',
      title: 'Free ginger-mint juice bottle',
      cost: 150,
      description: 'Redeem code on your next food order'
    },
    {
      code: 'CANELOYAL10',
      title: '₹10 Off entire checkout',
      cost: 300,
      description: 'Redeem code during cart checkout'
    },
    {
      code: 'ECOWARRIOR25',
      title: '25% Off eco bagasse tableware',
      cost: 500,
      description: 'Redeem code on any plates/bowls order'
    }
  ];

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsLobeJoined(true);
      // Give initial 100 CranePoints!
      addPoints(100);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" id="loyalty-modal-backdrop">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-amber-150 bg-amber-50/20 shadow-2xl"
      >
        <div className="bg-gradient-to-r from-amber-700 to-amber-900 p-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-amber-300 animate-bounce" />
              <div>
                <h3 className="text-lg font-bold font-sans tracking-tight">Ramesh CanePoints Club</h3>
                <p className="text-[10px] text-amber-200">Our native sugarcane loyalty circle</p>
              </div>
            </div>
            <button
              onClick={onClose}
              id="close-loyalty-club-modal"
              className="rounded-full bg-black/25 h-7 w-7 flex items-center justify-center hover:bg-black/40 text-white font-bold transition-all text-sm"
            >
              ✕
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg bg-black/20 p-3">
            <div className="flex items-center space-x-2">
              <Coins className="h-5 w-5 text-amber-300" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-100">CanePoints Balance</span>
            </div>
            <span className="font-mono text-xl font-black text-amber-200">{points} pts</span>
          </div>
        </div>

        <div className="bg-white p-5 space-y-4">
          {/* Join Form / Status display */}
          <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-4">
            {!isLobeJoined ? (
              <form onSubmit={handleJoin} className="space-y-3">
                <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs">
                  <Sparkles className="h-4 w-4" />
                  <span>Join now & receive 100 CanePoints instantly!</span>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <User className="h-3.5 w-3.5" />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name to register"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 py-1.5 pl-8 pr-3 text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-lg bg-amber-700 hover:bg-amber-800 px-4 py-1.5 text-xs font-bold text-white shadow-sm transition-colors"
                  >
                    Activate
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center space-x-2.5 text-amber-900 text-xs">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold">
                  ✓
                </div>
                <p>
                  Welcome to the Club, <strong>{userName}</strong>! You earned 100 premium bonus points.
                </p>
              </div>
            )}
          </div>

          {/* How to Earn points */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">How to Earn CanePoints</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600">
              <div className="rounded border border-gray-100 bg-gray-50 p-2">
                <span className="font-bold text-emerald-800">🛍 Spend ₹1</span>
                <p className="text-gray-405 mt-0.5">+10 CanePoints</p>
              </div>
              <div className="rounded border border-gray-100 bg-gray-50 p-2">
                <span className="font-bold text-emerald-800">🌱 Use Eco Cup</span>
                <p className="text-gray-405 mt-0.5">+50 CanePoints bonus</p>
              </div>
              <div className="rounded border border-gray-100 bg-gray-50 p-2">
                <span className="font-bold text-emerald-800">🔄 Bulk Ordering</span>
                <p className="text-gray-405 mt-0.5">+200 CanePoints bonus</p>
              </div>
              <div className="rounded border border-gray-100 bg-gray-50 p-2">
                <span className="font-bold text-emerald-800">🗓 Subscriptions</span>
                <p className="text-gray-405 mt-0.5">+150 CanePoints monthly</p>
              </div>
            </div>
          </div>

          {/* Redeem section */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Unlock Green Gift Vouchers</h4>
            
            <div className="space-y-2">
              {rewardVouchers.map((voucher) => {
                const isClaimed = claimedCoupons.includes(voucher.code);
                const canAfford = points >= voucher.cost;

                return (
                  <div
                    key={voucher.code}
                    className="flex items-center justify-between rounded-lg border border-gray-100 p-2.5 hover:border-amber-200 hover:bg-amber-50/10 transition-all font-sans"
                  >
                    <div className="space-y-0.5 pr-2">
                      <div className="flex items-center space-x-1.5 font-bold text-xs text-gray-800">
                        <Tag className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                        <span>{voucher.title}</span>
                      </div>
                      <p className="text-[10px] text-gray-400">{voucher.description}</p>
                    </div>

                    <div className="shrink-0 flex items-center space-x-2">
                      <span className="text-[10px] text-gray-500 font-bold font-mono">
                        {voucher.cost} pts
                      </span>

                      {isClaimed ? (
                        <span className="inline-flex items-center space-x-1 rounded bg-emerald-50 border border-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-850">
                          <Check className="h-3 w-3" />
                          <span>Unlocked</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => claimCoupon(voucher.code, voucher.cost)}
                          disabled={!canAfford}
                          className={`rounded px-2.5 py-1 text-[10px] font-bold transition-all ${
                            canAfford
                              ? 'bg-amber-700 hover:bg-amber-800 text-white shadow-sm'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Unlock Code
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-amber-50/50 p-3 pt-2 text-[10px] text-gray-400 text-center border-t border-gray-100">
          * CanePoints cannot be traded for currency. Applies as promotional coupon discounts upon checkout.
        </div>
      </motion.div>
    </div>
  );
}
