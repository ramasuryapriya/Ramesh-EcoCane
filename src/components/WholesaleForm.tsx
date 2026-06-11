import React, { useState } from 'react';
import { 
  Building2, 
  Percent, 
  CheckCircle, 
  ArrowRight, 
  ClipboardList, 
  Info, 
  Users, 
  Briefcase, 
  Utensils, 
  Sparkles, 
  PartyPopper, 
  Store, 
  GraduationCap, 
  Truck, 
  PhoneCall, 
  MessageCircle,
  HelpCircle,
  Package,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WholesaleForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    eventType: 'Weddings & Marriages',
    expectedVolume: '200-500 people (Medium)',
    message: '',
    eventDate: '',
    customRequests: false,
    selectedPack: 'None'
  });

  const bulkSectors = [
    {
      id: 'weddings',
      title: 'Weddings & Marriages',
      icon: PartyPopper,
      color: 'bg-rose-50 text-rose-700 border-rose-100Header',
      description: 'Provide an elegant, plastic-free dining experience for your special day. Free custom design consulting for couple initials or custom decals.',
      audience: 'Best for 50 - 1000+ Guests'
    },
    {
      id: 'hotels',
      title: 'Hotels & Restaurants',
      icon: Store,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      description: 'Steady recurring supply pipelines for high-grade sugarcane bagasse dinnerware, cups, and takeaway delivery boxes at strict business-tier rates.',
      audience: 'Best for continuous daily operations'
    },
    {
      id: 'corporate',
      title: 'Corporate Events',
      icon: Briefcase,
      color: 'bg-blue-50 text-blue-700 border-blue-100',
      description: 'Impeccable premium catering kits for office celebrations, summits, and annual milestone galas. Speaks volume of your brand values.',
      audience: 'Best for 100 - 800+ Attendees'
    },
    {
      id: 'catering',
      title: 'Catering Services',
      icon: Utensils,
      color: 'bg-amber-50 text-amber-700 border-amber-100',
      description: 'Super rugged rigid plates and spill-proof curry bowls built to withstand high temperatures and rapid buffet service lines.',
      audience: 'Scalable to any guest capacity'
    },
    {
      id: 'festivals',
      title: 'Festivals & Community Events',
      icon: Sparkles,
      color: 'bg-purple-50 text-purple-700 border-purple-100',
      description: 'Ultra high-volume bio supplies with swift nationwide delivery lanes. Easy sorting bundles for fast-paced food courts.',
      audience: 'Best for 500 - 5000+ Attendees'
    },
    {
      id: 'schools',
      title: 'Schools & Colleges Events',
      icon: GraduationCap,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      description: 'Eco-safe, budget-conscious supplies for university sports meets, convocation dinners, hostel cafes, and youth carnivals.',
      audience: 'Supported with special youth discounts'
    }
  ];

  const bulkPackages = [
    {
      id: 'small',
      badge: '🥇 Small Event Pack',
      title: 'Small Event Pack',
      capacity: '50–200 people',
      price: '₹14,900.00',
      originalPrice: '₹21,000.00',
      comboName: 'Plates + cups + cutlery combo',
      items: [
        '150x EP-01 Round Dinner Plates (10 inch)',
        '150x CP-02 Premium Coffee Cups (200 ml)',
        '150x ST-04 Heavy-duty Eco Cutlery Sets',
        '150x ST-01 Premium Fiber Straws',
        'Direct venue doorstep dispatch'
      ],
      savings: 'Save ₹6,100.00 immediately'
    },
    {
      id: 'medium',
      badge: '🥈 Medium Event Pack',
      title: 'Medium Event Pack',
      capacity: '200–500 people',
      price: '₹34,900.00',
      originalPrice: '₹55,000.00',
      comboName: 'Full catering eco kit',
      items: [
        '400x EP-01 Round Dinner Plates (10 inch)',
        '400x BW-02 Medium Soup Bowls',
        '400x CP-03 Cold Drink Cups (300 ml)',
        '400x ST-01 Premium Fiber Straws',
        '400x ST-04 Heavy-duty Eco Cutlery Sets',
        'Robust zero-leak curry containers included',
        'Same-day express transport assignment'
      ],
      savings: 'Save ₹20,100.00 (36% Off)'
    },
    {
      id: 'large',
      badge: '🥉 Large Event Pack',
      title: 'Large Event Pack',
      capacity: '500–2000+ people',
      price: 'Custom Quote',
      originalPrice: 'Volume Wholesale',
      comboName: 'Customized supply + delivery support',
      items: [
        'Bespoke blend of plates, compartment bowls, & cups',
        'Optional customized hot-press brand logo embossing',
        'Dedicated 7-ton carrier vehicle assignment',
        'Staggered batch delivery options',
        'Dedicated personal accounts manager support'
      ],
      savings: 'Highest corporate discount applied'
    }
  ];

  const selectSector = (title: string) => {
    setFormData(prev => ({
      ...prev,
      eventType: title,
      message: `Hi team, we are organizing a bulk supply setup for ${title}. We would appreciate a customized rate calculation and supply availability check.`
    }));
    scrollToForm();
  };

  const selectPack = (packId: string, packTitle: string, volumeText: string) => {
    setFormData(prev => ({
      ...prev,
      selectedPack: packTitle,
      expectedVolume: volumeText,
      message: `Hi team! I would like to enquire about ordering the "${packTitle}" custom event pack. Please confirm shipping schedules and customized tax structure.`
    }));
    scrollToForm();
  };

  const scrollToForm = () => {
    const el = document.getElementById('bulk-order-inputs-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockTicket = 'ECO-BULK-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(mockTicket);
    setFormSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      companyName: '',
      eventType: 'Weddings & Marriages',
      expectedVolume: '200-500 people (Medium)',
      message: '',
      eventDate: '',
      customRequests: false,
      selectedPack: 'None'
    });
    setFormSubmitted(false);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-16" id="bulk-supply-section">
      
      {/* 1. SECTORS DISPLAY GRID */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase bg-emerald-50 px-2.5 py-0.5 rounded">Tailored Sourcing Channels</span>
          <h3 className="text-2xl font-black text-gray-905 tracking-tight font-sans">For Every Scale & Industry</h3>
          <p className="text-xs text-gray-500 max-w-lg mx-auto">We supply premium unbleached sugarcane products specifically optimized for different events.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bulkSectors.map((sector) => {
            const IconComponent = sector.icon;
            return (
              <div 
                key={sector.id} 
                className="group relative rounded-2xl border border-gray-150 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`p-3 rounded-xl inline-flex ${sector.color} border`}>
                    <IconComponent className="h-5.5 w-5.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-905 font-sans group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{sector.title}</h4>
                    <p className="text-[10px] text-emerald-700 font-bold tracking-wide mt-0.5 font-mono">{sector.audience}</p>
                    <p className="text-xs text-gray-500 mt-2.5 leading-relaxed font-sans">{sector.description}</p>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-50">
                  <button 
                    onClick={() => selectSector(sector.title)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
                  >
                    <span>Request a Quote</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. HOW THE SYSTEM WORKS FLOWCHART */}
      <section className="bg-emerald-950 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden">
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-emerald-900 opacity-25 blur-3xl" />
        
        <div className="text-center space-y-2 mb-10 relative z-10">
          <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase">SYSTEM FLOW</span>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight font-sans text-white">How Our Bulk Order System Works</h3>
          <p className="text-xs text-emerald-200 max-w-xl mx-auto font-sans leading-normal">Our team guarantees frictionless logistical pipelines, secure delivery trucks, and custom discounts.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10 font-sans">
          <div className="bg-emerald-900/50 rounded-xl p-5 border border-emerald-800/40 space-y-3">
            <div className="bg-amber-400 text-emerald-950 font-black rounded-lg h-7 w-7 flex items-center justify-center text-xs">1</div>
            <h5 className="font-bold text-xs">Choose or Customize</h5>
            <p className="text-[11px] text-emerald-100/85 leading-normal">Select a curated Event Pack above or fill the form below specifying total pieces needed.</p>
          </div>
          
          <div className="bg-emerald-900/50 rounded-xl p-5 border border-emerald-800/40 space-y-3">
            <div className="bg-amber-400 text-emerald-950 font-black rounded-lg h-7 w-7 flex items-center justify-center text-xs">2</div>
            <h5 className="font-bold text-xs">Receive Custom Discount</h5>
            <p className="text-[11px] text-emerald-100/85 leading-normal">A dedicated manager reviews your guest counts and quotes direct sugar-mill wholesale rates within 6 hours.</p>
          </div>

          <div className="bg-emerald-900/50 rounded-xl p-5 border border-emerald-800/40 space-y-3">
            <div className="bg-amber-400 text-emerald-950 font-black rounded-lg h-7 w-7 flex items-center justify-center text-xs">3</div>
            <h5 className="font-bold text-xs">Optional Mold Embossing</h5>
            <p className="text-[11px] text-emerald-100/85 leading-normal">For setups above 5000+ units, we can deboss custom emblems, bride & groom logos, or corporate slogans.</p>
          </div>

          <div className="bg-emerald-900/50 rounded-xl p-5 border border-emerald-800/40 space-y-3">
            <div className="bg-amber-400 text-emerald-950 font-black rounded-lg h-7 w-7 flex items-center justify-center text-xs">4</div>
            <h5 className="font-bold text-xs">Direct Doorstep Dispatch</h5>
            <p className="text-[11px] text-emerald-100/85 leading-normal">Confirmed schedules are dispatched in clean, zero-waste delivery vehicles directly to your event venue.</p>
          </div>
        </div>
      </section>

      {/* 3. BULK EVENT PACKAGES SUGGESTIONS */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-700 tracking-wider uppercase bg-amber-50 px-2.5 py-0.5 rounded">All-Inclusive Sourcing Kits</span>
          <h3 className="text-2xl font-black text-gray-905 tracking-tight font-sans">Curated Bulk Sourcing Packages</h3>
          <p className="text-xs text-gray-500 max-w-lg mx-auto">Get massive savings with pre-sorted, comprehensive event bundles.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bulkPackages.map((pack) => {
            const isCustom = pack.id === 'large';
            return (
              <div 
                key={pack.id} 
                className={`rounded-2xl border bg-white p-6 shadow-sm flex flex-col justify-between transition-all ${
                  pack.id === 'medium' ? 'ring-2 ring-emerald-600 border-emerald-200 relative scale-[1.01]' : 'border-gray-150'
                }`}
              >
                {pack.id === 'medium' && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-650 text-white font-black text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow">Most Popular</span>
                )}
                
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">{pack.badge}</span>
                    <h4 className="text-md font-bold text-gray-905 mt-2.5 font-sans tracking-tight">{pack.title}</h4>
                    <span className="text-xs text-gray-400 block mt-0.5 font-sans">{pack.capacity} • {pack.comboName}</span>
                  </div>

                  <div className="py-2.5 border-y border-dashed border-gray-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-black text-emerald-950 font-sans tracking-tight">{pack.price}</span>
                      {!isCustom && <span className="text-xs text-gray-400 line-through ml-1.5">{pack.originalPrice}</span>}
                    </div>
                    <span className="text-[10px] bg-amber-550/20 text-amber-900 border border-amber-250/50 font-bold px-1.5 py-0.5 rounded font-mono">{pack.savings}</span>
                  </div>

                  <ul className="space-y-2 font-sans text-xs text-gray-600">
                    {pack.items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <button 
                    onClick={() => selectPack(pack.id, pack.title, pack.capacity)}
                    className={`w-full py-2.5 rounded-xl text-center text-xs font-black tracking-wide shadow-sm transition-all ${
                      pack.id === 'medium' 
                        ? 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-emerald-100' 
                        : 'bg-slate-50 hover:bg-slate-100 text-emerald-900'
                    }`}
                  >
                    Select Event Pack & Inquire
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. ACTUAL ENRICED FORM WORK */}
      <section className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-sm" id="bulk-order-inputs-form">
        <div className="bg-emerald-900 p-6 sm:p-8 text-white relative overflow-hidden">
          <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-emerald-850 opacity-50 blur-xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center space-x-1 rounded bg-emerald-800 text-amber-300 font-extrabold text-[9px] px-2 py-0.5 uppercase tracking-widest font-mono">
                <ClipboardList className="h-3 w-3 shrink-0" />
                <span>B2B Quoting Desk</span>
              </span>
              <h4 className="text-xl font-bold font-sans tracking-tight">Request Sourcing Quote & Custom Pricing</h4>
              <p className="text-xs text-emerald-150 max-w-xl font-sans">Submit details on your desired quantities and event dates. Our local coordinator Ramesh will draft your package within 6 hours.</p>
            </div>
            
            <a
              href="https://wa.me/919845012345?text=Hello%20Ramesh%20EcoCane!%20I%2527m%20planning%20an%20event%20and%20need%20bulk%20sugarcane%20supplies.%20Can%20you%20share%20wholesale%20rates%20instantly%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center space-x-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 text-white font-black text-xs px-5 py-3 shadow transition-all duration-200"
              id="instant-whatsapp-cta"
            >
              <MessageCircle className="h-4.5 w-4.5" />
              <span>Inquire via WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                
                {formData.selectedPack !== 'None' && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-amber-600" />
                      <span>Inquiring for: <strong>{formData.selectedPack}</strong></span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setFormData(prev => ({ ...prev, selectedPack: 'None' }))}
                      className="text-[10px] underline hover:no-underline font-semibold"
                    >
                      Clear Selection
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="bulk-contact-name" className="block text-xs font-bold text-gray-700 mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      id="bulk-contact-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Meera Patil"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
                    />
                  </div>

                  {/* Company/Event Name */}
                  <div>
                    <label htmlFor="bulk-company" className="block text-xs font-bold text-gray-700 mb-1.5">Event, Organization, or Restaurant Name *</label>
                    <input
                      type="text"
                      required
                      id="bulk-company"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Grand Sangeet Caterers or Patil Wedding"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Email */}
                  <div>
                    <label htmlFor="bulk-email" className="block text-xs font-bold text-gray-700 mb-1.5">Professional Email Address *</label>
                    <input
                      type="email"
                      required
                      id="bulk-email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. planner@weddingcorp.com"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="bulk-phone" className="block text-xs font-bold text-gray-700 mb-1.5">WhatsApp Contact Number *</label>
                    <input
                      type="tel"
                      required
                      id="bulk-phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98450 12345"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {/* Event/Operational Sector */}
                  <div>
                    <label htmlFor="bulk-event-type" className="block text-xs font-bold text-gray-700 mb-1.5">Event or Supply Type *</label>
                    <select
                      id="bulk-event-type"
                      required
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-xs focus:border-emerald-500 focus:outline-none font-sans"
                    >
                      <option value="Weddings & Marriages">Weddings & Marriages</option>
                      <option value="Hotels & Restaurants">Hotels & Restaurants</option>
                      <option value="Corporate Events">Corporate Events</option>
                      <option value="Catering Services">Catering Services</option>
                      <option value="Festivals & Community Events">Festivals & Community Events</option>
                      <option value="Schools & Colleges Events">Schools & Colleges Events</option>
                      <option value="Custom Agricultural Sugar Mill Sourcing">Custom Large Sourcing</option>
                    </select>
                  </div>

                  {/* Volume/Attendee Scale */}
                  <div>
                    <label htmlFor="bulk-volume" className="block text-xs font-bold text-gray-700 mb-1.5">Expected Scale / Audience Size *</label>
                    <select
                      id="bulk-volume"
                      required
                      value={formData.expectedVolume}
                      onChange={(e) => setFormData({ ...formData, expectedVolume: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-xs focus:border-emerald-500 focus:outline-none font-sans"
                    >
                      <option value="50-200 people (Small)">50 - 200 People (Small Pack)</option>
                      <option value="200-500 people (Medium)">200 - 500 People (Medium Pack)</option>
                      <option value="500-1000 people (Large)">500 - 1000 People (Large Pack)</option>
                      <option value="1000-2000 people (Enterprise)">1000 - 2000 People (Enterprise Capacity)</option>
                      <option value="Over 2000 people (Mega)">Over 2000 People (Massive Crowds)</option>
                      <option value="Stable Daily Sourcing Contract">Recurring Commercial Operations</option>
                    </select>
                  </div>

                  {/* Target Date */}
                  <div>
                    <label htmlFor="bulk-event-date" className="block text-xs font-bold text-gray-700 mb-1.5">Expected Delivery Date *</label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        id="bulk-event-date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-xs focus:border-emerald-500 focus:outline-none font-sans"
                      />
                    </div>
                  </div>
                </div>

                {/* Requirements details Textarea */}
                <div>
                  <label htmlFor="bulk-message" className="block text-xs font-bold text-gray-700 mb-1.5">Provide detailed specifications / Custom pricing limits *</label>
                  <textarea
                    required
                    id="bulk-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe what meals are being served (curries, soups, hot teas, sweets), whether you require custom branding stamps, or continuous delivery rotations..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
                  />
                </div>

                {/* Custom Brand check */}
                <div className="flex items-start bg-slate-50/50 p-4 rounded-xl border border-gray-100">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      id="bulk-custom-branding"
                      checked={formData.customRequests}
                      onChange={(e) => setFormData({ ...formData, customRequests: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="ml-3 text-xs font-sans">
                    <label htmlFor="bulk-custom-branding" className="font-bold text-gray-900 block cursor-pointer">We request custom logo/monogram hot-press embossing</label>
                    <span className="text-gray-400">Available for tableware orders above 5,000 pieces. Embosses letters directly on bagasse base using non-toxic mechanical bio-dies.</span>
                  </div>
                </div>

                {/* Form Action Buttons */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 pt-2">
                  <button
                    type="submit"
                    className="sm:col-span-3 flex items-center justify-center space-x-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs py-3.5 shadow-sm hover:shadow transition-all"
                  >
                    <span>Request custom pricing quote</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-650 font-bold text-xs py-3.5 transition-all text-center"
                  >
                    Reset Form
                  </button>
                </div>

              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="text-center py-10 space-y-6 font-sans"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
                  <CheckCircle className="h-8 w-8" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-gray-900 tracking-tight">Bulk Supply Proposal Initiated!</h4>
                  <p className="text-xs text-gray-500 max-w-md mx-auto">Thank you for opting into sugarcane zero-waste. Your bulk quotation draft ticket details are displayed below:</p>
                </div>

                <div className="max-w-md mx-auto rounded-xl border border-dashed border-emerald-250 bg-emerald-50/20 p-5 text-left text-xs space-y-3 font-sans">
                  <div className="flex justify-between items-center border-b border-emerald-200/50 pb-2">
                    <span className="text-[9px] font-black tracking-widest text-emerald-800 uppercase">Consultation Ref:</span>
                    <span className="font-mono font-black text-emerald-950 text-sm">{ticketId}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-gray-400 font-semibold block text-[10px]">ORGANIZATION:</span>
                      <span className="font-bold text-gray-800">{formData.companyName}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold block text-[10px]">AUTHORIZED PARTNER:</span>
                      <span className="font-bold text-gray-800">{formData.name}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50">
                    <div>
                      <span className="text-gray-400 font-semibold block text-[10px]">EVENT / OPERATION TYPE:</span>
                      <span className="font-medium text-gray-800">{formData.eventType}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold block text-[10px]">ATTENDEE SIZE RANGE:</span>
                      <span className="font-medium text-gray-800">{formData.expectedVolume}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50">
                    <div>
                      <span className="text-gray-400 font-semibold block text-[10px]">TARGET TIMELINE:</span>
                      <span className="font-medium text-gray-800">{formData.eventDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold block text-[10px]">SELECTED PRESET PACK:</span>
                      <span className="font-bold text-emerald-800">{formData.selectedPack !== 'None' ? formData.selectedPack : 'Custom Mix Sourcing'}</span>
                    </div>
                  </div>

                  {formData.customRequests && (
                    <div className="p-2 border border-amber-200 bg-amber-50 rounded text-amber-900 text-[10px] font-bold">
                      ★ Active Request: Logo brand die manufacturing requested
                    </div>
                  )}
                </div>

                <div className="p-3 bg-slate-50 border border-gray-100 rounded-lg text-xs text-gray-500 max-w-md mx-auto">
                  Ramesh EcoCane advisor has been notified on <strong>{formData.phone}</strong> and email <strong>{formData.email}</strong>. Our custom price structures will arrive soon.
                </div>

                <div className="flex justify-center space-x-3">
                  <button
                    onClick={handleReset}
                    className="rounded-xl border border-gray-200 bg-white hover:bg-gray-50 px-5 py-2.5 text-xs font-semibold text-gray-650"
                  >
                    Fill Another Form
                  </button>
                  <a
                    href={`https://wa.me/919845012345?text=Hello%20Ramesh%20EcoCane!%2520I%20have%2520submitted%20Bulk%20Inquiry%20${ticketId}.%20Can%20you%20share%20contract%20drafts%3F`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 rounded-xl bg-emerald-650 hover:bg-emerald-600 text-white font-black text-xs px-5 py-2.5 shadow-sm"
                  >
                    <span>Speed up on WhatsApp</span>
                  </a>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
}
