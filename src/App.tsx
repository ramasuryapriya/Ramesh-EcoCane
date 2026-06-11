import React, { useState } from 'react';
import { 
  ChevronRight, 
  MapPin, 
  Phone, 
  Mail, 
  Check, 
  Star, 
  MessageCircle, 
  Sparkles, 
  RefreshCw, 
  Leaf, 
  Trash2, 
  ShieldAlert, 
  DollarSign, 
  Compass, 
  Activity,
  ArrowUpRight,
  Calculator,
  Building
} from 'lucide-react';
import { Product, CartItem, SubscriptionFrequency } from './types';
import { products, mockReviews } from './data/products';

// Reusable Components
import Header from './components/Header';
import Footer from './components/Footer';
import EcoCalculator from './components/EcoCalculator';
import WholesaleForm from './components/WholesaleForm';
import LoyaltyClub from './components/LoyaltyClub';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ProductCard from './components/ProductCard';

export default function App() {
  // Navigation and Layout State
  const [currentTab, setCurrentTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [subCategoryFilter, setSubCategoryFilter] = useState('All');
  
  // Cart & Loyalty State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [points, setPoints] = useState(50); // Start with 50 points as welcome
  const [claimedCoupons, setClaimedCoupons] = useState<string[]>([]);
  
  // Modal toggles
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState(false);

  // Contact form submission states
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });

  // Add to Cart Logic
  const handleAddToCart = (
    product: Product, 
    qty: number, 
    isSub?: boolean, 
    freq?: SubscriptionFrequency
  ) => {
    setCartItems((prevItems) => {
      // Check if item with this ID and same subscription status already exists
      const existingItemIdx = prevItems.findIndex(
        (item) => 
          item.product.id === product.id && 
          item.isSubscription === !!isSub && 
          item.subscriptionFrequency === freq
      );

      if (existingItemIdx > -1) {
        const updated = [...prevItems];
        updated[existingItemIdx] = {
          ...updated[existingItemIdx],
          quantity: updated[existingItemIdx].quantity + qty
        };
        return updated;
      } else {
        return [...prevItems, { product, quantity: qty, isSubscription: isSub, subscriptionFrequency: freq }];
      }
    });

    // Award bonus points on addition!
    setPoints((p) => p + Math.round(product.price * qty * 2));
    
    // Automatically trigger cart sidebar opening for high-fidelity response
    setIsCartOpen(true);
  };

  // Update Cart Quantity Logic
  const handleUpdateCartQty = (id: string, newQty: number) => {
    if (newQty < 1) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems((prevItems) => 
      prevItems.map((item) => (item.product.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove Cart Item Logic
  const handleRemoveCartItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== id));
  };

  // Clear Cart after Checkout
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Loyalty Points management
  const handleAddPoints = (amount: number) => {
    setPoints((p) => p + amount);
  };

  const handleClaimCoupon = (code: string, cost: number) => {
    if (points >= cost) {
      setPoints((p) => p - cost);
      setClaimedCoupons((prev) => [...prev, code]);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactData.name && contactData.email && contactData.message) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactData({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  // Food Customization state
  const [foodBase, setFoodBase] = useState('Jaggery Block');
  const [foodInfusion, setFoodInfusion] = useState('Ginger Boost');
  const [foodWeight, setFoodWeight] = useState('1kg');
  const [foodLabel, setFoodLabel] = useState('');
  const [foodNotes, setFoodNotes] = useState('');
  const [foodCustSubmitted, setFoodCustSubmitted] = useState(false);

  // Eco Customization state
  const [ecoType, setEcoType] = useState('Round Plates');
  const [ecoEmboss, setEcoEmboss] = useState('');
  const [ecoCompartments, setEcoCompartments] = useState(1);
  const [ecoPacks, setEcoPacks] = useState('1,000 units');
  const [ecoCustSubmitted, setEcoCustSubmitted] = useState(false);

  // Filtered lists depending on tab
  const productsInCategory = products.filter(p => p.category === (currentTab === 'food' ? 'food' : 'eco'));
  
  // Filter subcategories list dynamically
  const uniqueSubcategories = ['All', ...new Set(productsInCategory.map(p => p.subcategory))];

  const filteredProducts = productsInCategory.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSub = subCategoryFilter === 'All' ? true : p.subcategory === subCategoryFilter;
    return matchesSearch && matchesSub;
  });

  // Calculate cart counts
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-950">
      
      {/* Main Header Component */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          setSearchTerm('');
          setSubCategoryFilter('All');
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        points={points}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
      />

      {/* Promotion Announcement Bar */}
      <div className="bg-emerald-900 px-4 py-2 text-center text-xs font-bold text-emerald-100 flex items-center justify-center space-x-2 border-b border-emerald-850">
        <span className="hidden sm:inline">🌾 RAMESH ECO-CANES PROMISE:</span>
        <span>Every product is 100% biodegradable and zero waste. Get an extra 10% Discount on orders of 5+ items!</span>
        <span className="animate-pulse bg-emerald-700 text-amber-300 font-mono text-[9px] px-1.5 py-0.5 rounded ml-2">HOT BUY</span>
      </div>

      {/* Primary Page Space Render */}
      <main className="flex-grow">
        
        {/* =============== PAGE 1: HOME PAGE =============== */}
        {currentTab === 'home' && (
          <div className="space-y-16 pb-16">
                      {/* HERO HERO SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-b from-emerald-100/40 via-white to-slate-50 py-16 sm:py-24">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center space-y-6">
                
                {/* Hero text block */}
                <span className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold tracking-wide text-emerald-800 border border-emerald-200">
                  <Sparkles className="h-4 w-4 text-emerald-600 animate-spin-slow" />
                  <span>Welcome to Ramesh EcoCane</span>
                </span>

                <h2 className="font-sans text-4xl font-extrabold tracking-tight text-emerald-950 sm:text-5xl lg:text-6xl max-w-2xl leading-tight">
                  One Crop. <span className="text-emerald-700 font-black">Zero Waste.</span> <br />
                  Infinite Possibilities.
                </h2>

                <p className="text-base text-gray-600 max-w-xl leading-relaxed mx-auto">
                  By maximizing the native potential of organic sugarcane, we harvest nutritious, raw mineral food products and refine processing residues into 100% home-compostable tableware.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-md mx-auto">
                  <button
                    onClick={() => setCurrentTab('food')}
                    id="hero-shop-food-btn"
                    className="flex-1 rounded-xl bg-emerald-700 hover:bg-emerald-600 px-6 py-3.5 text-xs font-black tracking-wide text-white shadow-md shadow-emerald-200 transition-all font-sans flex items-center justify-center space-x-2"
                  >
                    <span>Shop Food Products</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => setCurrentTab('eco')}
                    id="hero-shop-eco-btn"
                    className="flex-1 rounded-xl border border-emerald-200 bg-white hover:bg-emerald-50 px-6 py-3.5 text-xs font-bold text-emerald-850 shadow-sm transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Shop Eco Products</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Trust factors */}
                <div className="grid grid-cols-3 gap-8 border-t border-emerald-100 pt-6 w-full max-w-md mx-auto">
                  <div>
                    <h4 className="text-sm font-extrabold text-emerald-900 font-mono">100% Natural</h4>
                    <p className="text-[10px] text-gray-500">Pure farm sourcing</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-emerald-900 font-mono">Chemical-Free</h4>
                    <p className="text-[10px] text-gray-500">No bleach or sulfur</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-emerald-900 font-mono">Bio-Packaged</h4>
                    <p className="text-[10px] text-gray-500">Composts in 60 days</p>
                  </div>
                </div>
              </div>
            </section>

            {/* QUICK SECTOR SUB-NAVIGATION BAR */}
            <div className="sticky top-[66px] z-30 w-full bg-white/95 backdrop-blur-md border-y border-emerald-100 py-3 shadow-xs font-sans">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto whitespace-nowrap scrollbar-none gap-4">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-emerald-800 flex items-center gap-1.5 shrink-0">
                  <Compass className="h-4 w-4 text-emerald-600 animate-spin-slow" />
                  Quick Sector Nav
                </span>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button
                    onClick={() => {
                      setCurrentTab('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all font-sans"
                  >
                    Legacy Story
                  </button>
                  <span className="text-gray-200 text-xs text-[10px] select-none">|</span>
                  <button
                    onClick={() => {
                      setCurrentTab('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all font-sans"
                  >
                    Eco Impact Stats
                  </button>
                  <span className="text-gray-200 text-xs text-[10px] select-none">|</span>
                  <button
                    onClick={() => document.getElementById('eco-calculator-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all font-sans"
                  >
                    Savings Calculator
                  </button>
                  <span className="text-gray-200 text-xs text-[10px] select-none">|</span>
                  <button
                    onClick={() => document.getElementById('popular-items-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all font-sans"
                  >
                    Popular Sourced Items
                  </button>
                  <span className="text-gray-200 text-xs text-[10px] select-none">|</span>
                  <button
                    onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all font-sans"
                  >
                    Customer Testimonials
                  </button>
                </div>
              </div>
            </div>



            {/* INTEGRATED ECO CALCULATOR SECTION */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-28" id="eco-calculator-section">
              <EcoCalculator />
            </section>

            {/* SPOTLIGHT BEST SELLING PRODUCTS */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-28" id="popular-items-section">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-4">
                <div>
                  <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">CUSTOMER FAVORITES</span>
                  <h3 className="text-2xl font-black text-gray-950 tracking-tight font-sans mt-0.5">Popular Sourced Items</h3>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setCurrentTab('food')}
                    className="rounded-lg bg-emerald-50 hover:bg-emerald-100 px-4 py-2 text-xs font-bold text-emerald-850"
                  >
                    View Food Store
                  </button>
                  <button 
                    onClick={() => setCurrentTab('eco')}
                    className="rounded-lg bg-emerald-50 hover:bg-emerald-100 px-4 py-2 text-xs font-bold text-emerald-850"
                  >
                    View Eco Tableware
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.filter(p => p.isBestSeller).slice(0, 3).map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </section>

            {/* VERIFIED CUSTOMER REVIEWS CAROUSEL */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-28" id="reviews-section">
              <div className="text-center space-y-2 mb-8">
                <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">VERIFIED REWARDS</span>
                <h3 className="text-2xl font-black text-gray-950 tracking-tight font-sans">What our sustainable circle says</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="rounded-xl border border-gray-150 bg-white p-5.5 shadow-sm space-y-3 relative font-sans">
                    <div className="flex items-center space-x-0.5 text-amber-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    
                    <p className="text-[11px] text-gray-600 leading-relaxed italic pr-1">
                      &ldquo;{review.comment}&rdquo;
                    </p>

                    <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                      <div>
                        <h5 className="text-xs font-black text-gray-900 leading-none">{review.userName}</h5>
                        <span className="text-[9px] text-gray-400 mt-1 block">Verified Purchaser</span>
                      </div>
                      <span className="bg-emerald-50 text-emerald-800 font-bold text-[9px] px-1.5 py-0.5 rounded">
                        {review.productName.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* =============== PAGE 2: FOOD SHOP PAGE =============== */}
        {currentTab === 'food' && (
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center md:text-left space-y-2">
              <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase bg-emerald-50 px-2.5 py-0.5 rounded">
                CRUDE SOURCING
              </span>
              <h2 className="text-2xl font-black text-gray-905 tracking-tight font-sans sm:text-3xl">
                Organic Sugarcane Food Products
              </h2>
              <p className="text-xs text-gray-500 max-w-2xl leading-normal">
                Chemical-free nutrition. Every batch of our organic solid jaggery, unrefined gold syrups and cold pressed juice is sulfur-free and high in live trace minerals.
              </p>
            </div>

            {/* Filter and search utilities bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-150">
              {/* Search */}
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search organic foods..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-205 py-1.5 px-3 text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* Sub-Categories */}
              <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                {uniqueSubcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSubCategoryFilter(sub)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                      subCategoryFilter === sub
                        ? 'bg-emerald-750 text-white font-bold shadow-sm'
                        : 'bg-slate-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Products listings Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 rounded-xl border border-dashed border-gray-200">
                <p className="text-sm font-semibold text-gray-500">No food items found matching &apos;{searchTerm}&apos;</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}

            {/* FOOD TAB CUSTOMIZATION SECTION */}
            <section className="bg-gradient-to-br from-emerald-500/5 to-emerald-600/10 rounded-2xl border border-emerald-100 p-6 sm:p-8 mt-12 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-100/50 pb-4">
                <div className="space-y-1">
                  <span className="inline-flex items-center space-x-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                    <Sparkles className="h-3 w-3 text-emerald-600" />
                    <span>Exclusive Customizer</span>
                  </span>
                  <h3 className="text-xl font-black text-emerald-950 font-sans tracking-tight">
                    Custom Blend & Label Planner
                  </h3>
                  <p className="text-xs text-gray-500 leading-normal max-w-2xl">
                    Design a customized health infusion, select unique sweetening parameters, and personalize your packaging labels for organic tea shops, corporate events, or premium weddings.
                  </p>
                </div>
              </div>

              {!foodCustSubmitted ? (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFoodCustSubmitted(true);
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-4">
                    {/* Base sugarcane selection */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block">Select Base Product</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Jaggery Block', 'Cold-Pressed Juice', 'Golden Syrup'].map((base) => (
                          <button
                            key={base}
                            type="button"
                            onClick={() => setFoodBase(base)}
                            className={`rounded-lg border px-3 py-2.5 text-xs text-center transition-all font-semibold ${
                              foodBase === base
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-xs'
                                : 'border-gray-200 bg-white text-gray-600 hover:bg-slate-50'
                            }`}
                          >
                            {base}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Blend Infusion selection */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block">Infusion Blend Choice</label>
                      <select
                        value={foodInfusion}
                        onChange={(e) => setFoodInfusion(e.target.value)}
                        className="w-full text-xs font-semibold bg-white border border-gray-200 rounded-lg px-3 py-2 focus:border-emerald-500 focus:outline-none cursor-pointer"
                      >
                        <option value="Pure Cane (No infusion)">Pure Cane (No infusion)</option>
                        <option value="Ginger Boost">Ginger Boost (+ Dry Ginger extract)</option>
                        <option value="Cardamom Delight">Cardamom Delight (+ Kerala Cardamom pods)</option>
                        <option value="Cinnamon twist">Cinnamon Twist (+ High Grade Ceylon Cinnamon)</option>
                        <option value="Herbal Blend">Herbal Immunity (Tulsi, Ashwagandha & Pepper)</option>
                        <option value="Honey Molasses">Rich Molasses (High minerals, light caramelization)</option>
                      </select>
                    </div>

                    {/* Quantity Custom Range */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block">Choose Pack Weight / Volume</label>
                      <div className="grid grid-cols-4 gap-2">
                        {['500g', '1kg', '5kg Jar', 'Wholesale Bulk'].map((w) => (
                          <button
                            key={w}
                            type="button"
                            onClick={() => setFoodWeight(w)}
                            className={`rounded-lg border py-2 text-[11px] text-center transition-all ${
                              foodWeight === w
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-xs'
                                : 'border-gray-200 bg-white text-gray-600 hover:bg-slate-50'
                            }`}
                          >
                            {w}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      {/* Brand Label Input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block">Custom Label Text (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. Ramesh Organic Tea Stall / Arjun & Priya Wedding"
                          value={foodLabel}
                          onChange={(e) => setFoodLabel(e.target.value)}
                          className="w-full rounded-lg border border-gray-200 py-2 px-3 text-xs bg-white focus:border-emerald-500 focus:outline-none placeholder:text-gray-450"
                        />
                        <p className="text-[9px] text-gray-400 leading-normal">This custom text will be beautifully formatted on the front bottle/bag labels.</p>
                      </div>

                      {/* Sweetener Notes */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block">Wellness / Sourcing Notes</label>
                        <textarea
                          rows={2}
                          placeholder="Describe specific sweetness percentages, organic requests, or packaging details..."
                          value={foodNotes}
                          onChange={(e) => setFoodNotes(e.target.value)}
                          className="w-full rounded-lg border border-gray-200 py-1.5 px-3 text-xs bg-white focus:border-emerald-500 focus:outline-none resize-none placeholder:text-gray-450"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white py-3 px-4 text-xs font-black tracking-wide shadow-md shadow-emerald-100 transition-all text-center flex items-center justify-center space-x-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Submit Custom Food Design Enquiry</span>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="bg-white rounded-xl border border-emerald-150 p-6 text-center space-y-4 animate-fade-in shadow-xs">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Check className="h-6 w-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-extrabold text-gray-900">Custom Food Concept Submitted!</h4>
                    <p className="text-xs text-gray-500 max-w-lg mx-auto leading-normal">
                      Excellent! We received your custom blueprint for <strong>{foodBase} ({foodWeight})</strong> with <strong>{foodInfusion}</strong>. 
                      {foodLabel && <> Front Label: &ldquo;{foodLabel}&rdquo;.</>} A sugarcane master blender will analyze your recipe and draft a custom rate sheet.
                    </p>
                  </div>
                  <div className="flex justify-center gap-3 pt-2">
                    <a
                      href={`https://wa.me/919845012345?text=Hello%20Ramesh%2520EcoCane!%20I%20just%2520submitted%20a%20Custom%2520Food%20design%20enquiry%20for%20${foodBase}%20with%20${foodInfusion}%20(${foodWeight}).${foodLabel ? `%20Label:%20${foodLabel}` : ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-emerald-750 hover:bg-emerald-700 text-white font-extrabold text-[11px] px-4 py-2.5 shadow-xs flex items-center gap-1.5"
                    >
                      <span>Let&apos;s Connect on WhatsApp</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setFoodCustSubmitted(false);
                        setFoodLabel('');
                        setFoodNotes('');
                      }}
                      className="rounded-lg border border-gray-200 bg-slate-50 hover:bg-gray-150 text-gray-650 font-bold text-[11px] px-3 py-2.5"
                    >
                      Reset Designer
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {/* =============== PAGE 3: ECO TABLES SHOP PAGE =============== */}
        {currentTab === 'eco' && (
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center md:text-left space-y-2">
              <span className="text-xs font-bold tracking-widest text-amber-700 uppercase bg-amber-50 px-2.5 py-0.5 rounded">
                BIO-REPLACE FOR PLASTICS
              </span>
              <h2 className="text-2xl font-black text-gray-905 tracking-tight font-sans sm:text-3xl">
                Eco-Friendly Sugarcane Tableware
              </h2>
              <p className="text-xs text-gray-500 max-w-2xl leading-normal">
                Best for weddings, hotels, caterers, and events. Created entirely from upcycled post-squeezed bagasse pulp. No polymers, no paraffin wax, and home compostable.
              </p>
            </div>

            {/* Event supply promotion ribbon banner */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/20 p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4.5">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-xs font-bold text-amber-950 flex items-center justify-center sm:justify-start gap-1.5">
                  <Building className="h-4 w-4 text-amber-700" />
                  Eco-Conscious Wedding & Hotel Sourcing Contracts
                </h4>
                <p className="text-xs text-gray-500 max-w-xl leading-normal">
                  Need custom emboss shapes or bulk containers above 10,000 units? Get optimized corporate rates and priority zero-carbon shipping slots.
                </p>
              </div>
              <button
                onClick={() => setCurrentTab('services')}
                className="shrink-0 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs px-4 py-2 shadow-sm transition-all text-center"
              >
                Go to Bulk Services
              </button>
            </div>

            {/* Filter and search utilities bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-150">
              {/* Search */}
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search bio tableware..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-205 py-1.5 px-3 text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* Sub-Categories */}
              <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                {uniqueSubcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSubCategoryFilter(sub)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                      subCategoryFilter === sub
                        ? 'bg-amber-700 text-white font-bold shadow-sm'
                        : 'bg-slate-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Listings Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 rounded-xl border border-dashed border-gray-200">
                <p className="text-sm font-semibold text-gray-500">No tableware items found matching &apos;{searchTerm}&apos;</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}

            {/* ECO TABLEWARE TAB CUSTOMIZATION SECTION */}
            <section className="bg-gradient-to-br from-amber-500/5 to-amber-600/10 rounded-2xl border border-amber-100 p-6 sm:p-8 mt-12 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-100/50 pb-4">
                <div className="space-y-1">
                  <span className="inline-flex items-center space-x-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                    <Sparkles className="h-3 w-3 text-amber-700" />
                    <span>Molding Studio</span>
                  </span>
                  <h3 className="text-xl font-black text-amber-950 font-sans tracking-tight">
                    BioCane Engraving & Compartment Designer
                  </h3>
                  <p className="text-xs text-gray-500 leading-normal max-w-2xl">
                    Configure your high-barrier sugarcane tableware specs. We create custom-molded designs with your coffee shop, hotel or wedding initials beautifully embossed directly on compostable tableware.
                  </p>
                </div>
              </div>

              {!ecoCustSubmitted ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Controls Form Column */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setEcoCustSubmitted(true);
                    }}
                    className="lg:col-span-7 space-y-4"
                  >
                    {/* Item Shape */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block">Step 1: Choose Tableware Product Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Round Plates', 'Heavy Dessert Bowls', 'Clamshell Boxes', 'Bio Portion Cups'].map((shape) => (
                          <button
                            key={shape}
                            type="button"
                            onClick={() => setEcoType(shape)}
                            className={`rounded-lg border px-3 py-2 text-xs text-left transition-all font-semibold ${
                              ecoType === shape
                                ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold shadow-xs'
                                : 'border-gray-200 bg-white text-gray-600 hover:bg-slate-50'
                            }`}
                          >
                            {shape}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Logo/Initials Embossing */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block">Step 2: Brand Embossing Customisation</label>
                      <input
                        type="text"
                        placeholder="e.g. STARBUCKS, THE GREEN CAFE, SANJAY & APARNA 2026"
                        maxLength={32}
                        value={ecoEmboss}
                        onChange={(e) => setEcoEmboss(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 py-2 px-3 text-xs bg-white focus:border-amber-500 focus:outline-none placeholder:text-gray-450 font-medium"
                      />
                      <p className="text-[9px] text-gray-400 leading-normal">Enter words or initials to see a live visual render on the right tableware template!</p>
                    </div>

                    {/* Compartments Split Option */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block">Step 3: Plate/Tray Partition Slices</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 5].map((comp) => (
                          <button
                            key={comp}
                            type="button"
                            onClick={() => setEcoCompartments(comp)}
                            className={`rounded-lg border py-2 text-xs text-center transition-all ${
                              ecoCompartments === comp
                                ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold shadow-xs'
                                : 'border-gray-200 bg-white text-gray-650 hover:bg-slate-50'
                            }`}
                          >
                            {comp === 1 ? '1 Section' : `${comp}-Sections`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pack Sizing */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block">Step 4: Initial Contract Batch Sizing</label>
                      <div className="grid grid-cols-4 gap-2">
                        {['500 units', '1,000 units', '5,000 units', '10,000+ units'].map((pack) => (
                          <button
                            key={pack}
                            type="button"
                            onClick={() => setEcoPacks(pack)}
                            className={`rounded-lg border py-2 text-[11px] text-center transition-all ${
                              ecoPacks === pack
                                ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold shadow-xs'
                                : 'border-gray-200 bg-white text-gray-650 hover:bg-slate-50'
                            }`}
                          >
                            {pack}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full rounded-xl bg-amber-700 hover:bg-amber-800 text-white py-3 px-4 text-xs font-black tracking-wide shadow-md shadow-amber-100 transition-all text-center flex items-center justify-center space-x-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Reserve Mold & Lock Quote</span>
                      </button>
                    </div>
                  </form>

                  {/* Right Realistic Live Schematic Visual Column */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                    <div className="bg-white rounded-xl border border-dashed border-amber-200 overflow-hidden p-6 flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[280px]">
                      <span className="text-[9px] font-extrabold text-amber-700 tracking-widest uppercase bg-amber-50 px-2 py-0.5 rounded-md">
                        Interactive Blueprint Render
                      </span>

                      {/* Plate visual mock */}
                      <div className="relative w-44 h-44 rounded-full border-8 border-slate-100 bg-slate-50 shadow-inner flex items-center justify-center transition-all duration-300">
                        {/* Compartments division lines based on state */}
                        {ecoCompartments === 2 && (
                          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-slate-200" />
                        )}
                        {ecoCompartments === 3 && (
                          <>
                            <div className="absolute top-0 bottom-1/2 left-1/2 w-1 bg-slate-200" />
                            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200" />
                          </>
                        )}
                        {ecoCompartments === 5 && (
                          <>
                            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-slate-200" />
                            <div className="absolute top-1/3 left-0 right-0 h-1 bg-slate-200" />
                            <div className="absolute top-2/3 left-0 right-0 h-1 bg-slate-200" />
                          </>
                        )}

                        {/* Central recess rim */}
                        <div className="w-32 h-32 rounded-full border border-dashed border-slate-200 bg-white/60 flex items-center justify-center text-center p-3">
                          {ecoEmboss ? (
                            <div className="animate-pulse">
                              <p className="text-[10px] uppercase font-serif font-black tracking-widest text-slate-400 rotate-[-12deg] select-none break-all max-w-[100px] leading-tight">
                                {ecoEmboss}
                              </p>
                              <p className="text-[7px] text-slate-300 tracking-wider mt-1 select-none">(DEBOSSED EMBLEM)</p>
                            </div>
                          ) : (
                            <p className="text-[9px] italic text-slate-400 select-none">No custom engraving initials added yet</p>
                          )}
                        </div>
                      </div>

                      <div className="text-center space-y-1">
                        <p className="text-xs font-bold text-gray-800">{ecoType}</p>
                        <p className="text-[10px] text-gray-500 font-mono">
                          {ecoCompartments} {ecoCompartments === 1 ? 'Compartment' : 'Compartments'} &bull; {ecoPacks}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-amber-150 p-6 text-center space-y-4 animate-fade-in shadow-xs">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-750">
                    <Check className="h-6 w-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-extrabold text-gray-900">Custom Tableware Blueprint Reserved!</h4>
                    <p className="text-xs text-gray-500 max-w-lg mx-auto leading-normal">
                      Outstanding! We have allocated a customized mold layout for your <strong>{ecoCompartments}-Compartment {ecoType}</strong> ({ecoPacks} batch). 
                      {ecoEmboss && <> The embossing plates will read: &ldquo;{ecoEmboss}&rdquo;.</>} An EcoCane design engineer will review structural integrity and send a bespoke contract draft within 2 hours.
                    </p>
                  </div>
                  <div className="flex justify-center gap-3 pt-2">
                    <a
                      href={`https://wa.me/919845012345?text=Hello%20Ramesh%2520EcoCane!%20I%20just%20submitted%20a%20Custom%20Tableware%20Molding%20Enquiry%20for%20a%20${ecoCompartments}-Compartment%2520${ecoType}%20with%20debossing%20initials:%20${ecoEmboss || 'None'}%20(${ecoPacks}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-extrabold text-[11px] px-4 py-2.5 shadow-xs flex items-center gap-1.5"
                    >
                      <span>Let&apos;s Connect on WhatsApp</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setEcoCustSubmitted(false);
                        setEcoEmboss('');
                      }}
                      className="rounded-lg border border-gray-200 bg-slate-50 hover:bg-gray-150 text-gray-650 font-bold text-[11px] px-3 py-2.5"
                    >
                      Reset Designer
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {/* =============== SERVICES B2B / BULK SUPPLY PAGE =============== */}
        {currentTab === 'services' && (
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 animate-fade-in font-sans">
            <div className="text-center space-y-2 max-w-3xl mx-auto font-sans">
              <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 px-2.5 py-0.5 rounded">
                Zero-Waste Event Sourcing & B2B Services
              </span>
              <h2 className="text-2xl font-black text-gray-950 tracking-tight sm:text-3xl">
                Sugarcane Bulk Supply & Services
              </h2>
              <p className="text-xs text-gray-500 leading-normal max-w-2xl mx-auto">
                Discover uncompromised circular design configurations tailored for Weddings, Hotels & Restaurants, Corporate Summits, Caterers, and community fests. High rigidity, unbleached look, organic food integration and custom pricing.
              </p>
            </div>

            {/* Wholesale Form Section */}
            <WholesaleForm />
          </div>
        )}

        {/* =============== ABOUT US PAGE =============== */}
        {currentTab === 'about' && (
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 animate-fade-in font-sans">
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 px-2.5 py-0.5 rounded">
                Our Heritage & Sustainability Metrics
              </span>
              <h2 className="text-3xl font-black text-gray-950 tracking-tight">
                About Ramesh EcoCane
              </h2>
              <p className="text-xs text-gray-500 leading-normal max-w-2xl mx-auto">
                Fusing age-old traditional farming wisdom with modern scientific innovations to establish a 100% natural, circular closed-loop sugarcane manufacturing supply.
              </p>
            </div>

            {/* BRAND STORY & HISTORY SECTION (Formerly on Home) */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center bg-white rounded-3xl border border-gray-150 p-8 sm:p-12 overflow-hidden relative shadow-sm">
              <div className="absolute -left-16 -top-16 h-36 w-36 rounded-full bg-emerald-500/10 blur-xl" />
              
              {/* Left col: Description and Story */}
              <div className="space-y-6 lg:col-span-7 relative z-10 font-sans">
                <span className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold tracking-wide text-emerald-800 border border-emerald-200">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
                  <span>The Ramesh Legacy</span>
                </span>
                
                <h3 className="font-sans text-2xl font-black text-emerald-950 sm:text-3xl tracking-tight">
                  Our Story: Sown in Tradition, Grown for Tomorrow
                </h3>
                
                <p className="text-xs sm:text-sm text-gray-650 leading-relaxed">
                  Ramesh EcoCane was founded deep within green sugarcane farmlands with a simple observation: millions of tons of agricultural residue fibers (bagasse) were burned after extraction, releasing thick ash clouds into local communities.
                </p>
                
                <p className="text-xs sm:text-sm text-gray-650 leading-relaxed">
                  We saw this as an opportunity. By re-engineering local farming loops, we created a single vertical chain. First, we capture rich raw sugarcane nectars for wholesome mineral sweets. Then, we gather 100% of the fiber outputs to compress them into beautiful rigid tableware. Zero waste. Zero chemicals. Direct from soil to shelf.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Family-owned roots</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Empowering rural farmers</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Upcycled plant fibers only</span>
                  </div>
                </div>
              </div>

              {/* Right col: Image & Credo */}
              <div className="lg:col-span-5 relative">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-video lg:aspect-square relative shadow-md border border-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80" 
                    alt="Local sugarcane farming"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <p className="text-xs font-bold text-amber-300 tracking-widest uppercase">AGRICULTURAL REVOLUTION</p>
                    <h4 className="text-sm font-black mt-1 leading-normal">"Zero waste is not a target."</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* SUSTAINABILITY HIGHLIGHTS SECTION (Formerly on Home) */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase bg-emerald-50 px-2.5 py-0.5 rounded">ECO IMPACT SCORE</span>
                <h3 className="text-2xl font-black text-gray-950 tracking-tight">Sustainability Highlights Dashboard</h3>
                <p className="text-xs text-gray-500 max-w-lg mx-auto">Explore the raw ecological metrics behind our circular closed-loop sugarcane operations.</p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-gray-150 bg-white p-6 shadow-sm hover:shadow transition-shadow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Plastic Replaced</span>
                    <h4 className="text-3xl font-black text-emerald-950 tracking-tight">50,000+</h4>
                    <p className="text-xs text-gray-500 leading-normal">Single-use plastic dinner plates and petroleum containers replaced with backyard-compostable bagasse.</p>
                  </div>
                  <div className="text-[10px] text-emerald-750 font-bold flex items-center space-x-1 border-t border-gray-50 pt-3">
                    <span>98% Landfill volume avoided</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-150 bg-white p-6 shadow-sm hover:shadow transition-shadow flex flex-col justify-between space-y-4">
                  <div className="space-y-2 font-sans">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Biodegradability</span>
                    <h4 className="text-3xl font-black text-emerald-950 tracking-tight">60 Days</h4>
                    <p className="text-xs text-gray-500 leading-normal">Fibers dissolve fully back into garden soils as nutrient organic bio-humus. Free of PFAS or toxic solvents.</p>
                  </div>
                  <div className="text-[10px] text-emerald-750 font-bold flex items-center space-x-1 border-t border-gray-50 pt-3">
                    <span>100% Home compost certified</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-150 bg-white p-6 shadow-sm hover:shadow transition-shadow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Wholesome Food</span>
                    <h4 className="text-3xl font-black text-emerald-950 tracking-tight">0% Sulfur</h4>
                    <p className="text-xs text-gray-500 leading-normal">Every solid jaggery block and gold caramel syrup has zero sulfuric refining or bleaching chemicals.</p>
                  </div>
                  <div className="text-[10px] text-emerald-750 font-bold flex items-center space-x-1 border-t border-gray-50 pt-3">
                    <span>Trace minerals retained intact</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-150 bg-white p-6 shadow-sm hover:shadow transition-shadow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Global Sourcing</span>
                    <h4 className="text-3xl font-black text-emerald-950 tracking-tight">100%</h4>
                    <p className="text-xs text-gray-500 leading-normal">Renewable Sugarcane fiber raw material. Upcycling native farm crops preserves clean soil loops.</p>
                  </div>
                  <div className="text-[10px] text-emerald-750 font-bold flex items-center space-x-1 border-t border-gray-50 pt-3">
                    <span>Supports carbon offset plans</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =============== PAGE 6: CONTACT PAGE =============== */}
        {currentTab === 'contact' && (
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">COAST TO COAST SOURCING HELP</span>
              <h2 className="text-2xl font-black text-gray-950 tracking-tight font-sans sm:text-3xl">
                Get In Touch With Ramesh EcoCane
              </h2>
              <p className="text-xs text-gray-500 leading-normal">
                Whether you correspond as a curious consumer or an enterprise hospitality buyer, our sugarcane circularity team is prepared to assist you.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
              
              {/* Contact Left information pane */}
              <div className="md:col-span-5 bg-white rounded-2xl border border-gray-150 p-6 space-y-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sourcing Office</h4>

                <div className="space-y-4 text-xs font-sans">
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-800">Agricultural Sourcing Unit & Mill</p>
                      <p className="text-gray-500 mt-1 leading-relaxed">
                        Plot 24, Agri-Industrial Sourcing Zone, <br />
                        Mandya District, Karnataka, India - 571401
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-800">Direct Delivery Support Email</p>
                      <p className="text-gray-500 mt-1 break-all">hello@rameshecocane.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-800">General Information Help Desk</p>
                      <p className="text-gray-500 mt-1">+91 98450 12345</p>
                    </div>
                  </div>

                </div>

                {/* WhatsApp Chat button block */}
                <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
                  <p className="text-[11px] text-gray-400 font-sans">Immediate wholesale rates queries?</p>
                  <a
                    href="https://wa.me/919845012345?text=Hello%20Ramesh%20EcoCane!%20I%20am%20calling%20to%21inquire%20about%20sugarcane%2520packaging."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 border border-emerald-700 hover:scale-[1.01] transition-transform"
                    id="contact-whatsapp-chat-btn"
                  >
                    <MessageCircle className="h-4.5 w-4.5" />
                    <span>WhatsApp Live Chat</span>
                  </a>
                </div>

                {/* Styled static map graphic placeholder to prevent ifame crashes */}
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  <div className="h-32 bg-slate-100 flex flex-col justify-center items-center text-center p-3">
                    <MapPin className="h-6 w-6 text-emerald-700 animate-bounce" />
                    <span className="text-[10px] font-bold text-gray-800 mt-1">Plot 24, Mandya, Karnataka</span>
                    <span className="text-[9px] text-gray-400">Sugarcane Belt Industrial Sourcing</span>
                  </div>
                </div>

              </div>

              {/* Contact Right inquiry Form */}
              <div className="md:col-span-7 bg-white rounded-2xl border border-gray-150 p-6">
                
                {contactSubmitted ? (
                  <div className="text-center py-12 space-y-4" id="contact-success-pane">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-105 text-emerald-700 font-bold">
                      ✓
                    </div>
                    <h4 className="text-md font-bold text-gray-900 font-sans">Message Sent Successfully!</h4>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto leading-normal">
                      Deeply appreciate you writing to us. We will get back to you shortly. Feel free to use checkout or calculators in the mean time!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4" id="contact-inputs-form">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Inquiry Intake Form</h4>
                    
                    <div>
                      <label htmlFor="cnt-name" className="block text-xs font-semibold text-gray-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        id="cnt-name"
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                        placeholder="e.g. Meera Patil"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="cnt-email" className="block text-xs font-semibold text-gray-700 mb-1">Your Email *</label>
                      <input
                        type="email"
                        required
                        id="cnt-email"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        placeholder="e.g. meera@domain.com"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="cnt-message" className="block text-xs font-semibold text-gray-700 mb-1">Your Message / Sourcing inquiry *</label>
                      <textarea
                        required
                        id="cnt-message"
                        rows={5}
                        value={contactData.message}
                        onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                        placeholder="Please describe how many guests you serve, catering specifics, or how you intend to partner in sugarcane zero-waste..."
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      id="contact-submit-btn"
                      className="w-full rounded-xl bg-emerald-700 hover:bg-emerald-600 font-bold text-white text-xs py-3 transition-colors shadow-sm"
                    >
                      Send Message
                    </button>
                  </form>
                )}

              </div>

            </div>

          </div>
        )}

      </main>

      {/* Global Shopping Basket Drawer Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        claimedCoupons={claimedCoupons}
      />

      {/* Global Checkout Panel */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={handleClearCart}
        addPoints={handleAddPoints}
      />

      {/* CanePoints Loyalty Club Modal */}
      {isLoyaltyOpen && (
        <LoyaltyClub
          points={points}
          addPoints={handleAddPoints}
          onClose={() => setIsLoyaltyOpen(false)}
          claimedCoupons={claimedCoupons}
          claimCoupon={handleClaimCoupon}
        />
      )}

      {/* Global Footer Component */}
      <Footer setCurrentTab={(tab) => {
        setCurrentTab(tab);
        setSearchTerm('');
        setSubCategoryFilter('All');
      }} />

    </div>
  );
}
