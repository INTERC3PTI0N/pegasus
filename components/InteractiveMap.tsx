'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, Phone, Globe, ExternalLink, Send, Check } from 'lucide-react';

interface MarketLocation {
  id: string;
  name: string;
  role: string;
  address: string;
  phone: string;
  email: string;
  coords: { x: number; y: number }; // Relative percentage coordinates for our map canvas
  details: string;
}

export default function InteractiveMap() {
  const [activeLoc, setActiveLoc] = useState<string>('mumbai');
  const [enquiryType, setEnquiryType] = useState<'dealer' | 'business'>('dealer');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    businessName: '',
    contactName: '',
    email: '',
    message: '',
  });

  const locations: Record<string, MarketLocation> = {
    paris: {
      id: 'paris',
      name: 'Paris',
      role: 'Creative & Couture Division Office',
      address: '24 Rue du Faubourg Saint-Honoré, 75008 Paris, France',
      phone: '+33 (0) 1 44 55 66 00',
      email: 'couture.paris@pegasushairtools.com',
      coords: { x: 48.5, y: 38 },
      details: 'Serving high-fashion runway stylists across France, Italy, and Spain.'
    },
    london: {
      id: 'london',
      name: 'London',
      role: 'Creative Salon Academy & Logistics',
      address: '18 Savile Row, Mayfair, London W1S 3JR, United Kingdom',
      phone: '+44 (0) 20 7946 0958',
      email: 'academy.uk@pegasushairtools.com',
      coords: { x: 47, y: 35 },
      details: 'The educational epicentre of Pegasus professional styling courses.'
    },
    newyork: {
      id: 'newyork',
      name: 'New York',
      role: 'North American Logistics & Corporate HQ',
      address: 'Fifth Avenue, Flatiron District, New York, NY 10010, USA',
      phone: '+1 (212) 555-0199',
      email: 'americas@pegasushairtools.com',
      coords: { x: 28, y: 41 },
      details: 'Direct distribution network and support for salon conglomerates in the US and Canada.'
    },
    tokyo: {
      id: 'tokyo',
      name: 'Tokyo',
      role: 'Asia Pacific Distribution Center',
      address: '5-Chome Minami-Aoyama, Minato City, Tokyo 107-0062, Japan',
      phone: '+81 3-5555-0143',
      email: 'apac.tokyo@pegasushairtools.com',
      coords: { x: 82, y: 44 },
      details: 'Connecting elite Japanese hairdressers with German precision engineering.'
    },
    mumbai: {
      id: 'mumbai',
      name: 'Mumbai',
      role: 'Presto Industries Headquarters & Works',
      address: '215/216, Vasan Udyog Bhavan, 2nd Floor, Senapati Bapat Marg, opp. Phoenix Mill, Lower Parel, Mumbai, Maharashtra 400013',
      phone: '+91 22431 51400',
      email: 'info@pegasushairtools.com',
      coords: { x: 66, y: 52 },
      details: 'Where our six-decade manufacturing legacy and FLEXINITE material research resides.'
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEnquiryForm({ ...enquiryForm, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setEnquiryForm({ businessName: '', contactName: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16" id="global-contact">
      <div className="text-center mb-12">
        <span className="mono-tag text-xs text-accent border-b border-accent/30 pb-2 mb-4 inline-block">
          GLOBAL PRESENCE
        </span>
        <h2 className="editorial-text text-4xl md:text-5xl lg:text-6xl text-ink font-medium mb-4">
          Dealer & Corporate Enquiries
        </h2>
        <p className="text-silver max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Connecting professional salons, elite distributors, and retail groups worldwide with Presto Industries manufacturing support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Global Interactive Map */}
        <div className="lg:col-span-7 bg-white border border-black/5 rounded-lg p-6 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
          {/* Map Grid and Abstract background */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            {/* Minimal World outline SVG or geometric matrix representation */}
            <svg viewBox="0 0 1000 500" className="w-full h-full stroke-black/20 fill-none stroke-[0.5]">
              {/* Abstract longitude/latitude lines */}
              <line x1="0" y1="100" x2="1000" y2="100" />
              <line x1="0" y1="200" x2="1000" y2="200" />
              <line x1="0" y1="300" x2="1000" y2="300" />
              <line x1="0" y1="400" x2="1000" y2="400" />
              <line x1="200" y1="0" x2="200" y2="500" />
              <line x1="400" y1="0" x2="400" y2="500" />
              <line x1="600" y1="0" x2="600" y2="500" />
              <line x1="800" y1="0" x2="800" y2="500" />
              
              {/* Very minimal abstract continent paths */}
              <path d="M 150,150 Q 250,120 300,200 T 280,350 T 200,420 Z" /> {/* Americas simplified */}
              <path d="M 400,120 Q 550,100 650,150 T 600,320 T 500,400 Z" /> {/* Eurasia/Africa simplified */}
              <path d="M 750,300 Q 850,320 820,410 Z" /> {/* Oceania simplified */}
            </svg>
          </div>

          <div className="relative z-10">
            <span className="mono-tag text-[11px] text-accent tracking-widest block mb-4">
              interactive network terminals
            </span>
          </div>

          {/* Interactive Plot Area */}
          <div className="relative w-full h-64 md:h-80 border border-black/5 bg-white rounded overflow-hidden z-10 mb-6">
            {/* Location Hotspots */}
            {Object.values(locations).map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActiveLoc(loc.id)}
                style={{ left: `${loc.coords.x}%`, top: `${loc.coords.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none cursor-pointer"
              >
                {/* Outer pulsing gold halo */}
                <span className={`absolute -inset-2.5 rounded-full border border-accent/40 scale-75 group-hover:scale-110 transition-all duration-300 ${activeLoc === loc.id ? 'animate-ping' : ''}`} />
                {/* Core dot */}
                <span className={`relative block w-3.5 h-3.5 rounded-full border border-black transition-all duration-300 ${activeLoc === loc.id ? 'bg-accent' : 'bg-ink/90'}`} />
                {/* Tooltip on hover */}
                <span className="absolute left-1/2 -translate-x-1/2 bottom-5 bg-white border border-black/10 px-2 py-1 rounded text-[11px] font-mono uppercase tracking-wider text-ink opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap">
                  {loc.name}
                </span>
              </button>
            ))}

            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur border border-black/10 p-4 rounded max-w-xs">
              <span className="font-mono text-[10px] text-accent uppercase tracking-wider block mb-1">active coordinate</span>
              <h4 className="font-sans text-xs text-ink font-medium">
                {locations[activeLoc].name} Terminal Map
              </h4>
              <p className="font-sans text-[11px] text-silver mt-1 leading-normal">
                {locations[activeLoc].details}
              </p>
            </div>
          </div>

          {/* Location details card */}
          <div className="relative z-10 border-t border-black/10 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-sans text-xs text-ink font-medium mb-1">{locations[activeLoc].role}</h4>
              <p className="font-sans text-xs text-silver leading-relaxed flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                {locations[activeLoc].address}
              </p>
            </div>
            <div className="space-y-1 sm:pl-4 border-l border-black/5">
              <a href={`tel:${locations[activeLoc].phone}`} className="font-sans text-xs text-silver hover:text-ink flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-accent" /> {locations[activeLoc].phone}
              </a>
              <a href={`mailto:${locations[activeLoc].email}`} className="font-sans text-xs text-silver hover:text-ink flex items-center gap-1.5 break-all">
                <Mail className="w-3.5 h-3.5 text-accent" /> {locations[activeLoc].email}
              </a>
            </div>
          </div>
        </div>

        {/* Right: Dealer / Business Enquiry Form */}
        <div className="lg:col-span-5 bg-white border border-black/5 p-8 rounded-lg flex flex-col justify-between">
          <div>
            <div className="flex gap-2 border-b border-black/10 pb-4 mb-6">
              <button
                onClick={() => setEnquiryType('dealer')}
                className={`flex-1 py-2 text-center text-[11px] font-mono uppercase tracking-widest border transition-all ${
                  enquiryType === 'dealer'
                    ? 'border-accent text-ink bg-black/[0.04]'
                    : 'border-transparent text-silver hover:text-ink'
                }`}
              >
                Dealer Enquiry
              </button>
              <button
                onClick={() => setEnquiryType('business')}
                className={`flex-1 py-2 text-center text-[11px] font-mono uppercase tracking-widest border transition-all ${
                  enquiryType === 'business'
                    ? 'border-accent text-ink bg-black/[0.04]'
                    : 'border-transparent text-silver hover:text-ink'
                }`}
              >
                Business Enquiry
              </button>
            </div>

            <p className="font-sans text-xs text-silver leading-relaxed mb-6">
              {enquiryType === 'dealer'
                ? 'Register interest to become an authorized salon distributor or retail partner. Receive priority allocations on high-demand FLEXINITE collections.'
                : 'For custom brand integrations, education partnerships, fashion-week runway sponsorship, or corporate bulk procurement orders.'}
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-sans text-[11px] text-silver uppercase">Company / Salon Name</label>
                <input
                  type="text"
                  name="businessName"
                  required
                  placeholder="e.g. Madison Hair Group"
                  value={enquiryForm.businessName}
                  onChange={handleFormChange}
                  className="w-full p-3 custom-input rounded text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-[11px] text-silver uppercase">Primary Contact Person</label>
                <input
                  type="text"
                  name="contactName"
                  required
                  placeholder="e.g. Charles Madison"
                  value={enquiryForm.contactName}
                  onChange={handleFormChange}
                  className="w-full p-3 custom-input rounded text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-[11px] text-silver uppercase">Corporate Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. procurement@madisonhair.com"
                  value={enquiryForm.email}
                  onChange={handleFormChange}
                  className="w-full p-3 custom-input rounded text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-[11px] text-silver uppercase">Enquiry Specifications</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Briefly state your company background, target annual volume, and regions served..."
                  value={enquiryForm.message}
                  onChange={handleFormChange}
                  className="w-full p-3 custom-input rounded text-xs resize-none"
                />
              </div>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-accent/10 border border-accent p-4 rounded text-center text-xs font-sans text-ink flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 text-accent" /> Enquiry Transmitted. We will reply within 24 Hours.
                </motion.div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3.5 bg-ink text-paper hover:bg-accent hover:text-paper transition-colors font-mono text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 cursor-pointer"
                >
                  Transmit Message <Send className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
