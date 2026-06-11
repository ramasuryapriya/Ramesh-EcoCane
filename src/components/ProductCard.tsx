import React, { useState } from 'react';
import { Star, ShieldAlert, CheckCircle, Percent, Clock, Plus, Minus, Eye, MessageCircle, RefreshCw, Sparkles } from 'lucide-react';
import { Product, SubscriptionFrequency } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onAddToCart: (product: Product, quantity: number, isSub?: boolean, freq?: SubscriptionFrequency) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [frequency, setFrequency] = useState<SubscriptionFrequency>('monthly');
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );

  const handleMinus = () => setQuantity((q) => Math.max(1, q - 1));
  const handlePlus = () => setQuantity((q) => q + 1);

  const getFinalProduct = () => {
    if (selectedVariant) {
      return {
        ...product,
        id: `${product.id}-${selectedVariant.unit.replace(/\s+/g, '')}`,
        name: `${product.name} (${selectedVariant.unit})`,
        price: selectedVariant.price,
        unit: selectedVariant.unit
      };
    }
    return product;
  };

  const handleAddClick = () => {
    onAddToCart(getFinalProduct(), quantity, isSubscription, isSubscription ? frequency : undefined);
    setQuantity(1);
    setIsSubscription(false);
    setDetailModalOpen(false);
  };

  const handleSimpleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(getFinalProduct(), 1, false, undefined);
  };

  // Price calculations
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentUnit = selectedVariant ? selectedVariant.unit : product.unit;
  const displayPrice = isSubscription ? Number((currentPrice * 0.85).toFixed(2)) : currentPrice;

  return (
    <>
      {/* Small Product Card Grid Layout */}
      <div 
        onClick={() => setDetailModalOpen(true)}
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:scale-[1.015] hover:border-emerald-200 hover:shadow-md cursor-pointer"
        id={`product-card-${product.id}`}
      >
        {/* Badges container */}
        <div className="absolute left-4 top-4 z-10 flex flex-col space-y-1">
          {product.isBestSeller && (
            <span className="rounded-full bg-emerald-700 px-2.5 py-0.5 text-[9px] font-bold tracking-wider text-white shadow-sm uppercase">
              ★ Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="rounded-full bg-blue-700 px-2.5 py-0.5 text-[9px] font-bold tracking-wider text-white shadow-sm uppercase">
              New
            </span>
          )}
          {product.category === 'eco' && (
            <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-[9px] font-bold tracking-wider text-white shadow-sm uppercase">
              100% Bagasse
            </span>
          )}
        </div>

        {/* Product image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-white border border-gray-150 flex items-center justify-center p-2">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="max-h-full max-w-full h-auto w-auto object-contain transition-transform duration-500 group-hover:scale-105 animate-fade-in"
          />
          {/* Quick view text overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="flex items-center space-x-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm">
              <Eye className="h-3.5 w-3.5 text-emerald-600" />
              <span>Quick View</span>
            </span>
          </div>
        </div>

        {/* Content detail */}
        <div className="mt-4 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-widest text-emerald-700 uppercase">
              {product.subcategory}
            </span>
            <div className="flex items-center space-x-0.5 text-amber-500">
              <Star className="h-3 w-3 fill-amber-500" />
              <span className="text-xs font-bold font-mono">{product.rating}</span>
            </div>
          </div>

          <h3 className="mt-1.5 font-sans text-sm font-bold text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">
            {product.description}
          </p>

          {/* Sizing/Quantity Variants Dropdown */}
          {product.variants && product.variants.length > 0 && (
            <div className="mt-3" onClick={(e) => e.stopPropagation()}>
              <select
                value={selectedVariant?.unit || ''}
                onChange={(e) => {
                  const found = product.variants?.find(v => v.unit === e.target.value);
                  if (found) setSelectedVariant(found);
                }}
                className="w-full text-[11px] font-bold bg-slate-50 border border-gray-200 text-gray-700 rounded-lg px-2 py-1 focus:border-emerald-500 focus:outline-none cursor-pointer"
              >
                {product.variants.map((v) => (
                  <option key={v.unit} value={v.unit}>
                    {v.unit} &mdash; ₹{v.price}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Price and CTA Block */}
        <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="font-mono text-sm font-black text-gray-900">₹{currentPrice}</span>
              <span className="text-[10px] text-gray-400">/ {currentUnit}</span>
            </div>
            {product.category === 'food' && (
              <span className="text-[8px] font-bold text-emerald-650 bg-emerald-50 px-1 py-0.5 rounded">
                Subscribe & Save 15%
              </span>
            )}
          </div>

          <button
            onClick={handleSimpleAddToCart}
            id={`fast-add-${product.id}`}
            className="rounded-lg bg-emerald-700 hover:bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* DETAIL MODAL DIALOG OVERLAY */}
      <AnimatePresence>
        {detailModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" id={`product-modal-${product.id}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setDetailModalOpen(false)}
                className="absolute right-4 top-4 z-25 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-gray-800 hover:bg-black/20 font-bold transition-transform hover:rotate-90"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image section */}
                <div className="relative bg-gray-50 p-6 flex flex-col justify-center">
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white shadow-inner border border-gray-100 flex items-center justify-center p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full h-auto w-auto object-contain"
                    />
                  </div>
                  {product.category === 'eco' && (
                    <div className="mt-4 p-3 rounded-lg bg-amber-50/50 border border-amber-100 flex items-start gap-2">
                      <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-amber-900 leading-normal font-sans">
                        <strong>Compost Guide:</strong> Throw in normal garden compost. Biodegrades safely back into soil minerals in under 90 days.
                      </p>
                    </div>
                  )}
                  {product.category === 'food' && (
                    <div className="mt-4 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-emerald-900 leading-normal font-sans">
                        <strong>100% Natural Process:</strong> Harvested ethically in sugarcane belts. No structural refining or chemical bleaching.
                      </p>
                    </div>
                  )}
                </div>

                {/* Content details section */}
                <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase">
                        {product.subcategory} &bull; {currentUnit}
                      </span>
                      <h3 className="mt-1 font-sans text-xl font-black text-gray-950">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-1.5 mt-1">
                        <div className="flex items-center text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating) ? 'fill-amber-500' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-bold font-mono text-gray-600">
                          {product.rating} ({product.reviewsCount} verified customers)
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed font-sans">
                      {product.description}
                    </p>

                    {/* Sizing/Quantity Variants in Modal */}
                    {product.variants && product.variants.length > 0 && (
                      <div className="rounded-xl border border-gray-150 bg-slate-50 p-3 space-y-1.5 font-sans">
                        <label className="text-[10px] font-bold text-gray-400 tracking-wider uppercase block">Select Pack Size / Volume</label>
                        <div className="grid grid-cols-3 gap-2">
                          {product.variants.map((v) => (
                            <button
                              key={v.unit}
                              type="button"
                              onClick={() => setSelectedVariant(v)}
                              className={`rounded-lg border py-2 px-1 text-center transition-all ${
                                selectedVariant?.unit === v.unit
                                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-extrabold shadow-sm'
                                  : 'border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50'
                              }`}
                            >
                              <div className="text-[11px] leading-none">{v.unit}</div>
                              <div className="text-[10px] font-mono mt-1 opacity-80">₹{v.price}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Creative Image Spec Block */}
                    <div className="rounded-xl bg-slate-50 border border-slate-150 p-3.5 space-y-1.5 shadow-xs font-sans">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200/50 pb-1.5 mb-1">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
                          Creative Image Spec
                        </span>
                        <span className="text-emerald-700 font-mono text-[9px] bg-emerald-50 px-1.5 py-0.5 rounded">Photography Style</span>
                      </div>
                      <p className="text-[10.5px] text-slate-600 italic leading-relaxed">
                        👉 &ldquo;For each product card, use the exact image prompt provided in the dataset above to fetch or generate realistic images. Prioritize e-commerce product photography style.&rdquo;
                      </p>
                      {product.imagePrompt && (
                        <div className="pt-2 border-t border-slate-200/40 text-[9px] text-slate-500 font-mono">
                          <span className="font-bold uppercase text-slate-400 block mb-0.5">Asset Generation Prompt:</span>
                          <span className="text-emerald-850 font-sans leading-normal">{product.imagePrompt}</span>
                        </div>
                      )}
                    </div>

                    {/* Highlights / Special Tags */}
                    {product.highlights && product.highlights.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">B2B Highlight</span>
                        <div className="flex flex-wrap gap-1.5">
                          {product.highlights.map((tag, idx) => (
                            <span key={idx} className="bg-amber-100/60 text-amber-900 font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                              ✔ {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Sourcing Benefits */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                        {product.category === 'food' ? 'Health & Sourcing Benefits' : 'Environmental Sourcing benefits'}
                      </span>
                      <ul className="space-y-1.5 font-sans">
                        {product.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start text-xs text-gray-700">
                            <span className="text-emerald-600 font-bold mr-1.5 pr-0.5 shrink-0">•</span>
                            <span className="leading-snug">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Subscription settings (only for Food Category) */}
                    {product.category === 'food' && (
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/20 p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor={`sub-toggle-${product.id}`} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              id={`sub-toggle-${product.id}`}
                              checked={isSubscription}
                              onChange={(e) => setIsSubscription(e.target.checked)}
                              className="h-4 w-4 rounded border-gray-350 text-emerald-600 focus:ring-emerald-500"
                            />
                            <div className="text-left">
                              <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                                <RefreshCw className="h-3 w-3 text-emerald-600 animate-spin-slow" />
                                Subscribe & Save 15%
                              </span>
                              <p className="text-[10px] text-emerald-700">Cancel or pause any time, free juice points.</p>
                            </div>
                          </label>
                          <span className="text-[10px] font-bold bg-emerald-150 text-emerald-850 px-2 py-0.5 rounded uppercase font-mono">
                            Save 15%
                          </span>
                        </div>

                        {isSubscription && (
                          <div className="grid grid-cols-3 gap-1.5 pt-1.5 border-t border-emerald-100/50">
                            {(['weekly', 'biweekly', 'monthly'] as SubscriptionFrequency[]).map((freq) => (
                              <button
                                key={freq}
                                type="button"
                                onClick={() => setFrequency(freq)}
                                className={`rounded-md border py-1 px-1.5 text-[10px] font-bold capitalize transition-all ${
                                  frequency === freq
                                    ? 'border-emerald-600 bg-emerald-100 text-emerald-850 shadow-sm'
                                    : 'border-gray-200 bg-white text-gray-650 hover:bg-gray-50'
                                }`}
                              >
                                Every {freq === 'biweekly' ? '2 Weeks' : freq}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quantity and Checkout Trigger box */}
                  <div className="mt-6 border-t border-gray-100 pt-5 space-y-4">
                    <div className="flex items-center justify-between">
                      {/* Price Section */}
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Calculated Price</span>
                        <div className="flex items-baseline space-x-1.5">
                          <span className="font-mono text-lg font-black text-gray-900">
                            ₹{(displayPrice * quantity).toFixed(2)}
                          </span>
                          {isSubscription && (
                            <span className="text-[10px] font-bold text-gray-400 line-through font-mono">
                              ₹{(currentPrice * quantity).toFixed(2)}
                            </span>
                          )}
                          <span className="text-[10px] text-gray-400">({quantity}x units)</span>
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex h-9 items-center rounded-lg border border-gray-200 bg-gray-50 py-1 px-1">
                        <button
                          onClick={handleMinus}
                          className="h-7 w-7 rounded-md hover:bg-white flex items-center justify-center text-gray-650 font-bold transition-all"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 text-xs font-extrabold font-mono text-gray-900 w-8 text-center">{quantity}</span>
                        <button
                          onClick={handlePlus}
                          className="h-7 w-7 rounded-md hover:bg-white flex items-center justify-center text-gray-650 font-bold transition-all"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Add Button */}
                    <button
                      onClick={handleAddClick}
                      id={`modal-add-${product.id}`}
                      className="flex w-full items-center justify-center space-x-2 rounded-xl bg-emerald-700 py-3 text-xs font-extrabold text-white shadow-sm hover:bg-emerald-600 transition-all font-sans"
                    >
                      <span>Add to Cart - ₹{(displayPrice * quantity).toFixed(2)}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
