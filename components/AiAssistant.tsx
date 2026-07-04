'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Shield, Compass, Feather, ArrowRight, RefreshCw, Layers, CheckCircle } from 'lucide-react';

interface StylingRoutine {
  routineTitle: string;
  hairAnalysis: string;
  pegasusToolRecommendation: {
    name: string;
    collection: string;
    whyItWorks: string;
    techUsed: string;
  };
  morningRitualSteps: string[];
  eveningRitualSteps: string[];
  professionalStylingTip: string;
}

export default function AiAssistant() {
  const [hairType, setHairType] = useState('');
  const [stylingGoal, setStylingGoal] = useState('');
  const [currentRoutine, setCurrentRoutine] = useState('moderate');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [routine, setRoutine] = useState<StylingRoutine | null>(null);
  const [error, setError] = useState('');

  const loadingMessages = [
    "Analyzing follicular density & alignment...",
    "Simulating material heat-responsiveness dynamics...",
    "Selecting premium comb tooth spacing algorithms...",
    "Formulating bespoke morning and evening rituals...",
    "Curating elite session styling recommendations..."
  ];

  const hairTypeOptions = [
    { value: 'Fine & Delicate', label: 'Fine & Delicate', desc: 'Prone to static, flyaways, and follicle breakage.' },
    { value: 'Thick & Coarse', label: 'Thick & Coarse', desc: 'Requires deep tension control and effortless glide.' },
    { value: 'Curly & Textured', label: 'Curly & Textured', desc: 'Demands seamless detangling without curl disruption.' },
    { value: 'Straight & Sleek', label: 'Straight & Sleek', desc: 'Needs cuticle polishing to optimize natural light reflection.' },
    { value: 'Wavy & Natural', label: 'Wavy & Natural', desc: 'Benefits from natural volume retention and separation.' },
    { value: 'Color-Treated / Fragile', label: 'Color-Treated / Fragile', desc: 'Prone to snagging and cuticle friction damage.' }
  ];

  const goalOptions = [
    { value: 'Minimize Frizz & Static', label: 'Dissipate Static & Frizz', icon: Sparkles },
    { value: 'Polished Sleek Straightness', label: 'Sleek Straight Polish', icon: Shield },
    { value: 'Gentle Detangling without Pulling', label: 'Frictionless Detangling', icon: Compass },
    { value: 'Maximize Voluminous Bounce', label: 'Volume & Body Lift', icon: Layers },
    { value: 'Heat Styling Protection', label: 'Thermal Shield Combing', icon: Feather }
  ];

  const handleGenerate = async () => {
    if (!hairType || !stylingGoal) return;
    setLoading(true);
    setRoutine(null);
    setError('');
    
    // Animate loading messages
    setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 1500);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hairType, stylingGoal, currentRoutine }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setRoutine(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate styling advice. Please try again.');
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setRoutine(null);
    setHairType('');
    setStylingGoal('');
    setCurrentRoutine('moderate');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 relative" id="ai-styling-assistant">
      <div className="text-center mb-12">
        <span className="mono-tag text-xs text-accent border-b border-accent/30 pb-2 mb-4 inline-block">
          ENGINEERING INTELLIGENCE
        </span>
        <h2 className="editorial-text text-4xl md:text-5xl lg:text-6xl text-ink font-medium mb-4">
          Bespoke Styling Protocol
        </h2>
        <p className="text-silver max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Leverage our server-side trichology engine to map your specific hair characteristics into a luxurious daily combing and styling ritual.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!loading && !routine && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white border border-black/5 p-8 md:p-12 rounded-lg relative overflow-hidden"
          >
            {/* Step 1: Hair Type */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-accent border border-accent/30 rounded-full w-6 h-6 flex items-center justify-center">01</span>
                <h3 className="font-sans text-lg text-ink font-medium">Select Your Hair Topology</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hairTypeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setHairType(opt.value)}
                    className={`text-left p-5 rounded border transition-all duration-300 ${
                      hairType === opt.value
                        ? 'bg-black/[0.04] border-accent shadow-[0_0_15px_rgba(0,173,187,0.1)]'
                        : 'bg-white/60 border-black/5 hover:border-black/20'
                    }`}
                  >
                    <div className="font-sans font-medium text-sm text-ink mb-1">{opt.label}</div>
                    <div className="font-sans text-xs text-silver leading-relaxed">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Goal */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-accent border border-accent/30 rounded-full w-6 h-6 flex items-center justify-center">02</span>
                <h3 className="font-sans text-lg text-ink font-medium">Define Your Styling Objective</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {goalOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setStylingGoal(opt.value)}
                      className={`flex flex-col items-center text-center p-5 rounded border transition-all duration-300 ${
                        stylingGoal === opt.value
                          ? 'bg-black/[0.04] border-accent shadow-[0_0_15px_rgba(0,173,187,0.1)]'
                          : 'bg-white/60 border-black/5 hover:border-black/20'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-3 ${stylingGoal === opt.value ? 'text-accent' : 'text-silver'}`} />
                      <div className="font-sans font-medium text-xs text-ink leading-snug">{opt.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Intensity */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-accent border border-accent/30 rounded-full w-6 h-6 flex items-center justify-center">03</span>
                <h3 className="font-sans text-lg text-ink font-medium">Select Ritual Intensity</h3>
              </div>
              <div className="flex gap-4">
                {['minimal', 'moderate', ' pampering'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setCurrentRoutine(level)}
                    className={`flex-1 py-3 text-center rounded border text-xs uppercase tracking-widest font-mono transition-all duration-300 ${
                      currentRoutine === level
                        ? 'bg-black/[0.04] border-accent text-ink'
                        : 'bg-white/60 border-black/5 text-silver hover:border-black/25'
                    }`}
                  >
                    {level === 'minimal' ? 'Efficient Care' : level === 'moderate' ? 'Standard Protocol' : 'Luxury Pampering'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                disabled={!hairType || !stylingGoal}
                onClick={handleGenerate}
                className={`flex items-center gap-2 px-8 py-4 rounded text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  hairType && stylingGoal
                    ? 'bg-ink text-paper hover:bg-accent hover:text-paper cursor-pointer'
                    : 'bg-black/5 text-ink/30 cursor-not-allowed'
                }`}
              >
                Generate Protocol <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white border border-black/5 p-16 rounded-lg text-center flex flex-col items-center justify-center min-h-[450px]"
          >
            <div className="relative w-16 h-16 mb-8">
              {/* Spinning Chrome circle */}
              <div className="absolute inset-0 border-t-2 border-r-2 border-accent rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-b-2 border-black/10 rounded-full animate-pulse"></div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={loadingStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-xs uppercase text-accent tracking-widest mb-2"
              >
                {loadingMessages[loadingStep]}
              </motion.div>
            </AnimatePresence>
            <span className="font-sans text-xs text-silver mt-1">
              Establishing server-side neural grounding...
            </span>
          </motion.div>
        )}

        {routine && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white border border-black/5 p-8 md:p-12 rounded-lg relative"
          >
            {/* Top Bar with resetting option */}
            <div className="flex justify-between items-start border-b border-black/10 pb-6 mb-8">
              <div>
                <span className="mono-tag text-[11px] text-accent tracking-widest block mb-1">bespoke formulation</span>
                <h3 className="editorial-text text-2xl md:text-3xl lg:text-4xl text-ink font-medium">
                  {routine.routineTitle}
                </h3>
              </div>
              <button
                onClick={resetForm}
                className="flex items-center gap-2 border border-black/10 hover:border-accent/30 px-4 py-2 rounded text-[11px] font-mono uppercase tracking-widest text-silver hover:text-ink transition-all duration-300"
              >
                <RefreshCw className="w-3 h-3" /> Reconfigure
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Hair Analysis & Product Spotlight */}
              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white border border-black/5 p-6 rounded">
                  <h4 className="font-mono text-[11px] text-accent tracking-widest uppercase mb-3">Expert Analysis</h4>
                  <p className="font-sans text-xs text-silver leading-relaxed">
                    {routine.hairAnalysis}
                  </p>
                </div>

                <div className="bg-white border border-accent/20 p-6 rounded relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-accent text-paper font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-bl">
                    Spotlight Tool
                  </div>
                  <h4 className="font-sans text-sm text-ink font-medium mb-1">
                    {routine.pegasusToolRecommendation.name}
                  </h4>
                  <span className="font-mono text-[11px] text-accent uppercase tracking-wider block mb-4">
                    {routine.pegasusToolRecommendation.collection}
                  </span>
                  
                  <div className="space-y-4 mb-4">
                    <div>
                      <span className="font-mono text-[10px] text-silver uppercase block mb-1">Integrated Technology</span>
                      <span className="font-sans text-xs text-ink font-medium flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-accent" /> {routine.pegasusToolRecommendation.techUsed}
                      </span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-silver uppercase block mb-1">Scientific Efficacy</span>
                      <p className="font-sans text-xs text-silver leading-relaxed">
                        {routine.pegasusToolRecommendation.whyItWorks}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Steps Timeline */}
              <div className="lg:col-span-2 space-y-8">
                {/* Morning Steps */}
                <div>
                  <h4 className="font-mono text-[11px] text-accent tracking-widest uppercase mb-4 border-b border-black/5 pb-2">
                    AM: Active Styling Protocol
                  </h4>
                  <div className="space-y-4">
                    {routine.morningRitualSteps.map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <span className="font-mono text-xs text-ink/30 pt-0.5">0{idx + 1}</span>
                        <p className="font-sans text-xs text-silver leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evening Steps */}
                <div>
                  <h4 className="font-mono text-[11px] text-accent tracking-widest uppercase mb-4 border-b border-black/5 pb-2">
                    PM: Follicular Regeneration Protocol
                  </h4>
                  <div className="space-y-4">
                    {routine.eveningRitualSteps.map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <span className="font-mono text-xs text-ink/30 pt-0.5">0{idx + 1}</span>
                        <p className="font-sans text-xs text-silver leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expert tip */}
                <div className="bg-accent/5 border-l-2 border-accent p-5">
                  <span className="font-mono text-[11px] text-accent tracking-widest uppercase block mb-1">
                    Session Stylist Master Secret
                  </span>
                  <p className="font-sans text-xs text-ink italic leading-relaxed">
                    &ldquo;{routine.professionalStylingTip}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 p-4 rounded text-center text-xs font-mono text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
