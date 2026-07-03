'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Mail, Building, Clipboard, Check, FileText } from 'lucide-react';

export default function BrochureForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'stylist',
    salonName: '',
    country: '',
    interest: 'all',
    marketingConsent: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate premium registration logic
    setTimeout(() => {
      setSubmitting(false);
      setIsSuccess(true);
    }, 1800);
  };

  const isNextDisabled = () => {
    if (step === 1) {
      return !formData.name || !formData.email || !formData.email.includes('@');
    }
    if (step === 2) {
      return !formData.salonName || !formData.country;
    }
    return false;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16" id="request-brochure">
      <div className="text-center mb-12">
        <span className="mono-tag text-xs text-gold border-b border-gold/30 pb-2 mb-4 inline-block">
          EXQUISITE CATALOGUE
        </span>
        <h2 className="editorial-text text-4xl md:text-5xl lg:text-6xl text-white font-medium mb-4">
          Request Editorial Brochure
        </h2>
        <p className="text-silver max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Access sixty years of engineering excellence. Request our printed tactile brochure, master handbook, and product specifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Product visual preview */}
        <div className="lg:col-span-5 bg-charcoal border border-white/5 rounded-lg overflow-hidden flex flex-col justify-between p-8 relative min-h-[350px]">
          <div className="absolute inset-0 z-0 opacity-40">
            <img
              src="/images/pegasus_luxury_salon.jpg"
              alt="Luxury Salon Setup"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent"></div>
          </div>

          <div className="relative z-10">
            <span className="font-mono text-[9px] text-gold uppercase tracking-widest block mb-2">printed publication</span>
            <h4 className="editorial-text text-xl text-white font-medium mb-3">
              The Art of Frictionless Control
            </h4>
            <p className="font-sans text-xs text-silver leading-relaxed max-w-xs">
              Printed in Heidelberg, Germany on matte eco-linen tactile paper. Featuring high-resolution technical diagrams of FLEXINITE combs.
            </p>
          </div>

          <div className="relative z-10 border-t border-white/10 pt-6 mt-8">
            <div className="flex gap-4 text-left">
              <div>
                <span className="font-mono text-[10px] text-white block">180 Pages</span>
                <span className="font-sans text-[9px] text-silver block">Premium Print</span>
              </div>
              <div className="border-l border-white/10 pl-4">
                <span className="font-mono text-[10px] text-white block">80+ Countries</span>
                <span className="font-sans text-[9px] text-silver block">Global Distribution</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Multi-step form container */}
        <div className="lg:col-span-7 bg-charcoal border border-white/5 p-8 md:p-10 rounded-lg flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between min-h-[340px]">
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-[10px] font-mono uppercase text-silver mb-2">
                    <span>Step {step} of 3</span>
                    <span>
                      {step === 1 ? 'Credential Details' : step === 2 ? 'Establishment Details' : 'Specification Selection'}
                    </span>
                  </div>
                  <div className="w-full h-[2px] bg-white/10">
                    <motion.div
                      className="h-full bg-gold"
                      initial={{ width: '33.33%' }}
                      animate={{ width: `${step * 33.33}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <label className="font-sans text-xs text-silver block">Full Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="e.g. Laurent Dupond"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-3.5 pl-10 custom-input rounded text-sm"
                          />
                          <Clipboard className="w-4 h-4 text-white/30 absolute left-3 top-4" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-sans text-xs text-silver block">Corporate Email Address</label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="e.g. laurent@salonparis.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-3.5 pl-10 custom-input rounded text-sm"
                          />
                          <Mail className="w-4 h-4 text-white/30 absolute left-3 top-4" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-sans text-xs text-silver block">Professional Role</label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="w-full p-3.5 custom-input rounded text-sm bg-charcoal"
                        >
                          <option value="stylist">Creative Stylist / Hairdresser</option>
                          <option value="owner">Salon Owner / Director</option>
                          <option value="distributor">Wholesale Distributor</option>
                          <option value="retail">Premium Retail Buyer</option>
                          <option value="other">Industry Professional</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <label className="font-sans text-xs text-silver block">Salon or Corporate Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="salonName"
                            required
                            placeholder="e.g. L'Atelier de Coiffure Paris"
                            value={formData.salonName}
                            onChange={handleInputChange}
                            className="w-full p-3.5 pl-10 custom-input rounded text-sm"
                          />
                          <Building className="w-4 h-4 text-white/30 absolute left-3 top-4" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-sans text-xs text-silver block">Country / Territory</label>
                        <input
                          type="text"
                          name="country"
                          required
                          placeholder="e.g. France"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full p-3.5 custom-input rounded text-sm"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <label className="font-sans text-xs text-silver block">Select Catalogue Specialization</label>
                        <select
                          name="interest"
                          value={formData.interest}
                          onChange={handleInputChange}
                          className="w-full p-3.5 custom-input rounded text-sm bg-charcoal"
                        >
                          <option value="all">Full Comprehensive Master Catalogue</option>
                          <option value="rubber">Hard Rubber (Vulcanite & Flexinite) Spec Sheets</option>
                          <option value="cellulose">Handcrafted Plant-Based Cellulose acetate</option>
                          <option value="ecowood">Eco-friendly Natural Wood fiber composite</option>
                        </select>
                      </div>

                      <div className="flex items-start gap-3 pt-4">
                        <input
                          type="checkbox"
                          name="marketingConsent"
                          id="marketingConsent"
                          checked={formData.marketingConsent}
                          onChange={handleInputChange}
                          className="mt-1 h-4 w-4 rounded border-white/10 bg-black/20 text-gold focus:ring-gold"
                        />
                        <label htmlFor="marketingConsent" className="font-sans text-xs text-silver leading-relaxed">
                          I consent to receive exclusive updates, technical specifications, and invitations to professional styling workshops from Pegasus.
                        </label>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Form Navigation Controls */}
                <div className="flex justify-between items-center border-t border-white/5 pt-6 mt-8">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-silver hover:text-white transition-all"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      disabled={isNextDisabled()}
                      onClick={handleNext}
                      className={`flex items-center gap-1.5 px-6 py-3 rounded text-xs font-mono uppercase tracking-widest transition-all ${
                        isNextDisabled()
                          ? 'bg-white/5 text-white/20 cursor-not-allowed'
                          : 'bg-white text-black hover:bg-gold cursor-pointer'
                      }`}
                    >
                      Continue <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center gap-1.5 px-6 py-3 rounded text-xs font-mono uppercase tracking-widest bg-gold text-black hover:bg-white hover:text-black transition-all cursor-pointer font-medium"
                    >
                      {submitting ? 'Transmitting Request...' : 'Submit Credentials'} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 flex flex-col items-center justify-center min-h-[340px]"
              >
                <div className="w-12 h-12 bg-gold/10 border border-gold rounded-full flex items-center justify-center mb-6">
                  <Check className="w-5 h-5 text-gold" />
                </div>
                <span className="mono-tag text-[9px] text-gold tracking-widest block mb-2">request approved</span>
                <h3 className="editorial-text text-2xl md:text-3xl text-white font-medium mb-4">
                  Credentials Verified
                </h3>
                <p className="font-sans text-xs text-silver max-w-sm mx-auto leading-relaxed mb-8">
                  Thank you, {formData.name}. We have logged your request. A digital copy has been sent to <span className="text-white">{formData.email}</span>. Your physical print portfolio will ship shortly.
                </p>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Mock PDF brochure is generating and downloading... Your physical booklet has been placed in the postal queue!');
                  }}
                  className="flex items-center gap-2 border border-white/10 hover:border-gold/30 px-6 py-3.5 rounded text-xs font-mono uppercase tracking-widest text-silver hover:text-white bg-black/30 hover:bg-black/60 transition-all duration-300"
                >
                  <FileText className="w-4 h-4 text-gold" /> Download Digital Catalogue
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
