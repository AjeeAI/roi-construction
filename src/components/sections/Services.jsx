import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import { HardHat, Building2, ClipboardCheck, ShieldCheck, Microscope, LineChart } from 'lucide-react';
import FadeIn from '../ui/FadeIn';

const services = [
  {
    icon: <Microscope size={24} className="text-roi-orange" />,
    title: 'Pre-Construction & Foundation',
    desc: "Choosing a foundation isn't guesswork. We conduct professional soil testing, site evaluations, and rigorous compaction before a single drop of concrete is poured.",
    list: ['Soil Testing & Site Inspection', 'Excavation & Compaction', 'Foundation Waterproofing']
  },
  {
    icon: <Building2 size={24} className="text-roi-orange" />,
    title: 'Structural Engineering',
    desc: "Safety isn't optional. It's structural. We rely on certified engineers to design unique steel reinforcements, perfectly positioned columns, and flawless formwork.",
    list: ['Custom Steel Reinforcement', 'Load-Bearing Calculations', 'Concrete Casting & Curing']
  },
  {
    icon: <ClipboardCheck size={24} className="text-roi-orange" />,
    title: 'Lean Project Management',
    desc: "Stop guessing when your project will finish. Our lean management process replaces hopeful deadlines with certain completion and seamless handover documentation.",
    list: ['Predictive Timelines', 'Whole Life Costing', 'Comprehensive Handover']
  }
];

const features = [
  { icon: <HardHat size={24} className="text-roi-orange" />, title: 'No Guesswork', desc: 'From soil assessment to execution, every step is intentional.' },
  { icon: <ShieldCheck size={24} className="text-roi-orange" />, title: 'Built-in Safety', desc: "Safety isn't a checklist; it's built into how we plan and supervise." },
  { icon: <LineChart size={24} className="text-roi-orange" />, title: 'Guaranteed ROI', desc: 'We protect property owners from errors that cost millions to fix.' }
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-roi-dark">
      <div className="max-w-7xl mx-auto">
        

        <FadeIn direction="up">
          <SectionHeader subtitle="The ROi Standard" title="Engineering & Construction Solutions" centered />
        </FadeIn>
        
        {/* Main Services Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {services.map((srv, idx) => (
            <FadeIn key={idx} delay={idx * 0.2} direction="up" fullWidth className="h-full">
              <div className="bg-roi-accent p-8 rounded-lg border border-white/5 hover:border-roi-orange/30 transition duration-300 h-full flex flex-col">
                <div className="bg-roi-dark w-12 h-12 rounded flex items-center justify-center mb-6">
                  {srv.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{srv.title}</h3>
                
                <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow">{srv.desc}</p>
                <ul className="space-y-3 mb-8">
                  {srv.list.map((item, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-roi-orange" /> {item}
                    </li>
                  ))}
                </ul>
                <a href="#" className="text-roi-orange text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-wider mt-auto">
                  Learn More &rarr;
                </a>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom Feature Row */}
        <div className="bg-roi-accent rounded-lg border border-white/5 p-12 grid md:grid-cols-3 gap-12 text-center">
           {features.map((feat, idx) => (
             <FadeIn key={idx} delay={idx * 0.2} direction="up">
               <div className="flex flex-col items-center">
                 <div className="bg-roi-dark w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-white/5">
                   {feat.icon}
                 </div>
                 <h4 className="font-bold text-lg mb-2">{feat.title}</h4>
                 <p className="text-gray-400 text-sm">{feat.desc}</p>
               </div>
             </FadeIn>
           ))}
        </div>
        
      </div>
    </section>
  );
}