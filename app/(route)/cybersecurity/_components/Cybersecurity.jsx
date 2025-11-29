'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Users, Shield, Heart, CheckCircle, Phone, Mail, MapPin, ArrowRight, Star, Calendar, Infinity, Lock } from 'lucide-react';
import { cn } from "@/lib/utils";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Marquee } from "@/components/magicui/marquee";


const Cybersecurity = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    location: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    setSubmitted(false);

    try {
      // Client-side validation
      if (!formData.name.trim()) throw new Error("Please enter your name");
      if (!validateEmail(formData.email)) throw new Error("Please enter a valid email address");
      if (!validatePhone(formData.number)) throw new Error("Please enter a valid 10-digit mobile number");
      if (!formData.location.trim()) throw new Error("Please enter your location");

      // Prepare the request body
      const requestBody = JSON.stringify(formData);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestBody,
      };

      // Call both API routes in parallel using Promise.all
      const [sheetsResponse, emailResponse] = await Promise.all([
        fetch('/api/submit-to-sheets', requestOptions),
        fetch('/api/cybersecurityEmail', requestOptions) // Call the email route
      ]);

      // Check if BOTH requests were successful
      if (!sheetsResponse.ok || !emailResponse.ok) {
        throw new Error('One or more tasks failed. Please try again.');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        number: '',
        email: '',
        location: ''
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Identity Theft Protection",
      description: "Protect identity theft, monitor financial accounts, and recover from identity theft with our comprehensive identity theft protection services."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Cyber Stalking & Cyber Bullying Protection",
      description: "Protect yourself from cyber stalking and cyber bullying with our comprehensive cyberstalking and cyberbullying protection services."
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "Social Media Protection",
      description: "Protect your social media accounts from cyber threats and cyberbullying with our comprehensive social media protection services."
    },
    {
      icon: <Building className="w-8 h-8 text-purple-600" />,
      title: "Privacy Breach Protection & Data Loss Prevention",
      description: "Protect your privacy and data from breaches and loss with our comprehensive privacy breach protection and data loss prevention services."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-teal-600" />,
      title: "Online Banking & E-commerce Protection",
      description: "Protect your online banking and e-commerce accounts from cyber threats and cyberbullying with our comprehensive online banking and e-commerce protection services."
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      title: "Personal Information Protection",
      description: "Protect your personal information from cyber threats and cyberbullying with our comprehensive personal information protection services."
    }
  ];
  
  const ReviewCard = ({ img, name, username, body }) => {
    return (
      <figure
        className={cn(
          "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        )}
      >
        <div className="flex flex-row items-center gap-2">
          {/* Note: In Next.js, local images in the `public` folder are referenced from the root `/` */}
          <img className="rounded-full" style={{ width: '80px', height: '80px', objectFit: 'cover' }} alt={name} src={img} />
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium dark:text-white">
              {name}
            </figcaption>
            <p className="text-xs font-medium dark:text-white/40">{username}</p>
          </div>
        </div>
        <blockquote className="mt-2 text-sm">{body}</blockquote>
      </figure>
    );
  };


  return (
    
    <div className="min-h-screen bg-gray-50">
              {/* Section 1 - Hero with Split Layout */}
      <section className="min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Cybersecurity  
                  <span className="text-blue-600 block">Protecting your online presence</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-justify">
                  MGood revolutionizes cybersecurity with comprehensive identity theft protection, cyberstalking and cyberbullying protection, social media protection, privacy breach protection and data loss prevention, online banking and e-commerce protection, and personal information protection to ensure your online presence is secure and your patient care is uninterrupted.
                </p>
              </div>
              
            

              <div className="grid grid-cols-3 gap-6 md:gap-8 pt-8 border-t border-gray-200">
                <div className="text-center space-y-2">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">Day 1</div>
                  <div className="text-sm md:text-base font-semibold text-gray-700">Coverage</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-green-100 rounded-full flex items-center justify-center">
                      <Infinity className="w-6 h-6 md:w-7 md:h-7 text-green-600" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-green-600">No</div>
                  <div className="text-sm md:text-base font-semibold text-gray-700">Sublimits</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-100 rounded-full flex items-center justify-center">
                      <Lock className="w-6 h-6 md:w-7 md:h-7 text-purple-600" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-purple-600">Annual</div>
                  <div className="text-sm md:text-base font-semibold text-gray-700">Coverage</div>
                </div>
              </div>
            </motion.div>

            {/* Form Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-teal-500 rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 md:p-8 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg md:text-xl">Get Protected Today</h3>
                      <p className="text-gray-600 text-sm md:text-base">Fill out the form to get started</p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {submitted && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-green-800 text-sm md:text-base">Form Submitted Successfully!</h3>
                          <p className="text-green-600 text-xs md:text-sm mt-1">We'll get back to you shortly.</p>
                        </div>
                      </div>
                    )}
                    
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                      </div>
                    )}

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                        placeholder="10-digit mobile number"
                        maxLength="10"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm md:text-base"
                        placeholder="Your city or location"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center px-6 py-3 ${
                        isSubmitting 
                          ? 'bg-blue-300 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-16 h-16 md:w-24 md:h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Secure your online presence, Focus on Patient Care
            </motion.h2>
            <motion.p 
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
              At MGood, we go beyond traditional cybersecurity. Our integrated approach combines identity theft protection, cyberstalking and cyberbullying protection, social media protection, privacy breach protection and data loss prevention, online banking and e-commerce protection, and personal information protection to ensure your online presence is secure and your patient care is uninterrupted. 
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                >
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-justify">
                    {feature.description}
                  </p>
                </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Secure Your Online Presence?
              </h3>
              <p className="text-blue-100 text-base md:text-lg mb-8 leading-relaxed">
                Join hundreds of Doctors and businesses that have already secured their digital lives with MGood's comprehensive cybersecurity protection services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+918923894358" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91-8923894358
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cybersecurity;

