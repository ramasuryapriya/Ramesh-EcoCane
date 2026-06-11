import React, { useState } from 'react';
import { Leaf, Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const navTo = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-emerald-100/90 border-t-4 border-emerald-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-12 lg:gap-8">
          {/* Brand and Mission */}
          <div className="md:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Leaf className="h-5.5 w-5.5" />
              </div>
              <span className="font-sans text-xl font-bold tracking-tight">Ramesh EcoCane</span>
            </div>
            
            <p className="text-xs text-emerald-250 italic leading-relaxed font-sans max-w-sm">
              &ldquo;From sugarcane to sustainable living &mdash; we ensure zero waste by using every part of sugarcane to create food products and eco-friendly alternatives to plastic.&rdquo;
            </p>
            
            <div className="pt-2 text-xs text-emerald-300">
              © 2026 Ramesh EcoCane. All rights reserved.
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-1 lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold tracking-wider text-amber-400 uppercase">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navTo('food')} className="hover:text-amber-300 hover:underline transition-all">
                  Organic Jaggery
                </button>
              </li>
              <li>
                <button onClick={() => navTo('food')} className="hover:text-amber-300 hover:underline transition-all">
                  Sugarcane Juices
                </button>
              </li>
              <li>
                <button onClick={() => navTo('eco')} className="hover:text-amber-300 hover:underline transition-all">
                  Biodegradable Plates
                </button>
              </li>
              <li>
                <button onClick={() => navTo('eco')} className="hover:text-amber-300 hover:underline transition-all">
                  Bio Straws & Cups
                </button>
              </li>
            </ul>
          </div>

          {/* Services B2B */}
          <div className="md:col-span-1 lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold tracking-wider text-amber-400 uppercase">Sustainable B2B</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navTo('services')} className="hover:text-amber-300 hover:underline transition-all">
                  Bulk Supply / B2B Services
                </button>
              </li>
              <li>
                <button onClick={() => navTo('about')} className="hover:text-amber-300 hover:underline transition-all">
                  Sugarcane Circularity
                </button>
              </li>
              <li>
                <button onClick={() => navTo('contact')} className="hover:text-amber-300 hover:underline transition-all">
                  Restaurant Supply
                </button>
              </li>
              <li>
                <button onClick={() => navTo('contact')} className="hover:text-amber-300 hover:underline transition-all">
                  Catering Contracts
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-1 lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold tracking-wider text-amber-400 uppercase">Direct Contact</h3>
            <ul className="space-y-2.5 text-xs text-emerald-200">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="break-all">hello@rameshecocane.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>+91 98450 12345</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Plot 24, Agri-Industrial Zone, Mandya, KA - 571401</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-1 lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold tracking-wider text-amber-400 uppercase">Eco Club News</h3>
            <p className="text-xs text-emerald-300 leading-normal">
              Sign up for updates on sugarcane innovation and seasonal releases.
            </p>
            <form onSubmit={handleSub} className="flex flex-col space-y-2 pt-1">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full rounded bg-emerald-900 border border-emerald-800 py-1.5 pl-3 pr-8 text-xs text-white placeholder-emerald-400 focus:border-amber-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-amber-300 transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-amber-300 font-medium">Thank you for joining our green tribe!</p>
              )}
            </form>
          </div>
        </div>

        {/* Dynamic Buttons in Footer */}
        <div className="mt-10 pt-8 border-t border-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4 text-xs text-emerald-400">
            <span className="hover:text-emerald-250 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-emerald-250 cursor-pointer">Terms of Zero-Waste Supply</span>
            <span>•</span>
            <span className="hover:text-emerald-250 cursor-pointer">Sourcing Trust</span>
          </div>
          <a
            href="https://wa.me/919845012345?text=Hello%20Ramesh%20EcoCane!%20I%20am%20interested%20in%20your%20sugarcane%2520products."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-4 py-2 transition-transform hover:scale-105"
            id="whatsapp-footer-link"
          >
            <MessageCircle className="h-4 m-0" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
