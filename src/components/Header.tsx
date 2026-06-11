import { useState } from 'react';
import { ShoppingBag, Leaf, Award, Menu, X, ChevronDown, Utensils, Award as EcoIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  points: number;
  onOpenLoyalty: () => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  cartCount,
  onOpenCart,
  points,
  onOpenLoyalty
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    setIsProductsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex cursor-pointer items-center space-x-2"
          id="brand-logo"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md shadow-emerald-200">
            <Leaf className="h-6.5 w-6.5" />
          </div>
          <div>
            <h1 className="font-sans text-xl font-bold tracking-tight text-emerald-900 sm:text-2xl">
              Ramesh <span className="font-medium text-emerald-600">EcoCane</span>
            </h1>
            <p className="hidden text-[9px] font-semibold tracking-widest text-amber-850 uppercase sm:block">
              Zero-Waste Sugarcane Ecosystem
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:space-x-8">
          {/* Home */}
          <button
            onClick={() => handleNavClick('home')}
            className={`relative py-2 text-sm font-semibold tracking-wide transition-colors ${
              currentTab === 'home' ? 'text-emerald-700 font-bold' : 'text-gray-650 hover:text-emerald-600'
            }`}
          >
            Home
            {currentTab === 'home' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-600"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          {/* Products Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsProductsDropdownOpen(true)}
            onMouseLeave={() => setIsProductsDropdownOpen(false)}
          >
            <button
              className={`relative py-2 text-sm font-semibold tracking-wide transition-colors flex items-center space-x-1 ${
                currentTab === 'food' || currentTab === 'eco' ? 'text-emerald-700 font-bold' : 'text-gray-650 hover:text-emerald-600'
              }`}
            >
              <span>Products</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
              {(currentTab === 'food' || currentTab === 'eco') && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-600"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isProductsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 mt-1 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-black/5 z-50 font-sans"
                >
                  <button
                    onClick={() => handleNavClick('food')}
                    className={`flex w-full items-center space-x-2.5 rounded-lg p-2.5 text-left text-xs font-semibold tracking-wide transition-all ${
                      currentTab === 'food' ? 'bg-emerald-50 text-emerald-800' : 'text-gray-700 hover:bg-slate-50'
                    }`}
                  >
                    <Utensils className="h-4 w-4 text-emerald-600" />
                    <div>
                      <p className="font-bold">Natural Cane Foods</p>
                      <p className="text-[10px] text-gray-400 font-normal">Pure organic sugarcane foods</p>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('eco')}
                    className={`flex w-full items-center space-x-2.5 rounded-lg p-2.5 text-left text-xs font-semibold tracking-wide transition-all ${
                      currentTab === 'eco' ? 'bg-emerald-50 text-emerald-800' : 'text-gray-700 hover:bg-slate-50'
                    }`}
                  >
                    <EcoIcon className="h-4 w-4 text-amber-600" />
                    <div>
                      <p className="font-bold">Eco Tableware</p>
                      <p className="text-[10px] text-gray-400 font-normal">Biodegradable tableware & cups</p>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Services */}
          <button
            onClick={() => handleNavClick('services')}
            className={`relative py-2 text-sm font-semibold tracking-wide transition-colors ${
              currentTab === 'services' ? 'text-emerald-700 font-bold' : 'text-gray-650 hover:text-emerald-600'
            }`}
          >
            Services
            {currentTab === 'services' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-600"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          {/* About Us */}
          <button
            onClick={() => handleNavClick('about')}
            className={`relative py-2 text-sm font-semibold tracking-wide transition-colors ${
              currentTab === 'about' ? 'text-emerald-700 font-bold' : 'text-gray-650 hover:text-emerald-600'
            }`}
          >
            About Us
            {currentTab === 'about' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-600"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          {/* Contact Us */}
          <button
            onClick={() => handleNavClick('contact')}
            className={`relative py-2 text-sm font-semibold tracking-wide transition-colors ${
              currentTab === 'contact' ? 'text-emerald-700 font-bold' : 'text-gray-650 hover:text-emerald-600'
            }`}
          >
            Contact Us
            {currentTab === 'contact' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-600"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Loyalty CanePoints Widget */}
          <button
            onClick={onOpenLoyalty}
            id="loyalty-pill-btn"
            className="flex items-center space-x-1.5 rounded-full bg-amber-50 px-3 py-1.5 border border-amber-250/50 text-amber-800 transition-all hover:bg-amber-100/70"
            title="Your CanePoints Balance"
          >
            <EcoIcon className="h-4 w-4 text-amber-600 animate-pulse" />
            <span className="text-xs font-bold font-mono tracking-tight">{points} pts</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            id="cart-trigger-btn"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-emerald-50 text-emerald-800 shadow-sm transition-all hover:bg-emerald-100 hover:scale-105"
            aria-label="Toggle Shopping Cart"
          >
            <ShoppingBag className="h-5 w-5 text-emerald-750" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                key={cartCount}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-md"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-trigger"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 text-gray-700 hover:bg-gray-50 lg:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-emerald-50 bg-white px-4 py-3 shadow-lg lg:hidden"
          id="mobile-menu-container"
        >
          <div className="flex flex-col space-y-2 pb-2 pt-1 font-semibold">
            <button
              onClick={() => handleNavClick('home')}
              className={`flex w-full py-2 px-3 rounded-lg text-left text-sm font-semibold transition-all ${
                currentTab === 'home' ? 'bg-emerald-50 text-emerald-800 pl-4' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Home
            </button>
            
            <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Products</div>
            <button
              onClick={() => handleNavClick('food')}
              className={`flex w-full py-1.5 px-6 rounded-lg text-left text-sm font-medium transition-all ${
                currentTab === 'food' ? 'bg-emerald-50/50 text-emerald-800' : 'text-gray-650 hover:bg-gray-50'
              }`}
            >
              ↳ Natural Cane Foods
            </button>
            <button
              onClick={() => handleNavClick('eco')}
              className={`flex w-full py-1.5 px-6 rounded-lg text-left text-sm font-medium transition-all ${
                currentTab === 'eco' ? 'bg-emerald-50/50 text-emerald-800' : 'text-gray-650 hover:bg-gray-50'
              }`}
            >
              ↳ Eco Tableware
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`flex w-full py-2 px-3 rounded-lg text-left text-sm font-semibold transition-all ${
                currentTab === 'services' ? 'bg-emerald-50 text-emerald-850 pl-4' : 'text-gray-650 hover:bg-gray-50'
              }`}
            >
              Services
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`flex w-full py-2 px-3 rounded-lg text-left text-sm font-semibold transition-all ${
                currentTab === 'about' ? 'bg-emerald-50 text-emerald-850 pl-4' : 'text-gray-650 hover:bg-gray-50'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`flex w-full py-2 px-3 rounded-lg text-left text-sm font-semibold transition-all ${
                currentTab === 'contact' ? 'bg-emerald-50 text-emerald-850 pl-4' : 'text-gray-650 hover:bg-gray-50'
              }`}
            >
              Contact Us
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
