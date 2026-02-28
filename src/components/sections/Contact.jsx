import React, { useState } from 'react';
import { MapPin, Mail } from 'lucide-react'; 
import Button from '../ui/Button';
import FadeIn from '../ui/FadeIn';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    projectType: 'Pre-Construction & Soil Testing',
    message: ''
  });

  const [status, setStatus] = useState('idle'); 
  
  // ✅ 1. New state to track specific field errors
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Check Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }
    
    // Check Email (with basic regex for valid format)
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    // Check Message
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide some project details.';
    }

    setErrors(newErrors);
    
    // Return true if there are no errors (object is empty)
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // ✅ Clear the error message as soon as the user starts typing to fix it
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ 2. Run validation before trying to submit
    if (!validateForm()) {
      return; // Stop the function if validation fails
    }

    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/mbdabzyz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          fullName: '',
          email: '',
          projectType: 'Pre-Construction & Soil Testing',
          message: ''
        });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[#1a140f] overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        
        {/* Left Side: Text & Info */}
        <FadeIn direction="left">
          <div>
            <span className="text-roi-orange font-bold uppercase text-xs tracking-widest">Book A Consultation</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">Ready to Build<br />With Precision?</h2>
            <p className="text-gray-400 mb-12">Stop guessing when your project will finish. Schedule a project scoping session with our engineers today and let's guarantee a positive ROI on your build.</p>
            
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="bg-[#2a221a] p-3 rounded text-roi-orange"><MapPin size={24} /></div>
                <div>
                  <h4 className="font-bold text-lg">Headquarters</h4>
                  <p className="text-gray-400 text-sm mt-1">Lagos, Nigeria<br />Available for Nationwide Projects</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-[#2a221a] p-3 rounded text-roi-orange"><Mail size={24} /></div>
                <div>
                  <h4 className="font-bold text-lg">Direct Email</h4>
                  <p className="text-gray-400 text-sm mt-1">roiconstructionng@gmail.com<br />We respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Right Side: Form */}
        <FadeIn direction="right" delay={0.2} fullWidth>
          {/* ✅ 3. Added noValidate to suppress HTML5 default tooltips */}
          <form onSubmit={handleSubmit} noValidate className="bg-[#2a221a] p-8 rounded-lg border border-white/5 shadow-2xl h-full">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-gray-400">Full Name</label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  placeholder="John Doe" 
                  // ✅ Dynamic border color based on error state
                  className={`w-full bg-[#1a140f] border p-4 rounded outline-none transition text-white ${
                    errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-roi-orange'
                  }`} 
                />
                {/* ✅ Render specific error message */}
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-gray-400">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="john@example.com" 
                  className={`w-full bg-[#1a140f] border p-4 rounded outline-none transition text-white ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-roi-orange'
                  }`} 
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

            </div>
            
            <div className="space-y-2 mb-6">
              <label className="text-xs uppercase font-bold text-gray-400">Project Type</label>
              <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full bg-[#1a140f] border border-white/10 p-4 rounded focus:border-roi-orange outline-none transition text-white appearance-none cursor-pointer">
                <option>Pre-Construction & Soil Testing</option>
                <option>Structural Engineering & Foundation</option>
                <option>Full Building Construction</option>
                <option>Quality-Assured Materials Quote</option>
              </select>
            </div>
            
            <div className="space-y-2 mb-8">
              <label className="text-xs uppercase font-bold text-gray-400">Project Details</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                rows="4" 
                placeholder="Tell us about your vision..." 
                className={`w-full bg-[#1a140f] border p-4 rounded outline-none transition text-white ${
                  errors.message ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-roi-orange'
                }`} 
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            
            <Button 
              variant="primary" 
              type="submit" 
              className={`w-full ${status === 'success' ? '!bg-green-600' : ''}`}
              disabled={status === 'submitting' || status === 'success'}
            >
              {status === 'idle' && 'Book Scoping Session'}
              {status === 'submitting' && 'Sending Request...'}
              {status === 'success' && 'Request Sent Successfully! ✓'}
              {status === 'error' && 'Error. Please try again.'}
            </Button>
          </form>
        </FadeIn>

      </div>
    </section>
  );
}