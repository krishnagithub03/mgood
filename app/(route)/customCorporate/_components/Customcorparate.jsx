'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Users, Shield, Heart, CheckCircle, Phone, Mail, MapPin, ArrowRight, Star } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";


const Customcorporate = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
    employeeCount: '',
    industry: '',
    currentProvider: '',
    specificNeeds: ''
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

// In Customcorporate.js

const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    setSubmitted(false);

    try {
      // Client-side validation
      if (!formData.companyName.trim()) throw new Error("Please enter your company name");
      if (!formData.contactPerson.trim()) throw new Error("Please enter contact person name");
      if (!validateEmail(formData.email)) throw new Error("Please enter a valid email address");
      if (!validatePhone(formData.phoneNumber)) throw new Error("Please enter a valid 10-digit mobile number");
      if (!formData.employeeCount) throw new Error("Please select employee count");

      // Make the API call
      // Ensure '/api/submit-data' is the correct path to your API route
      const response = await fetch("/api/submit-to-sheets", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Server-side error occurred.');
      }

      setSubmitted(true);
   
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phoneNumber: '',
        employeeCount: '',
        industry: '',
        currentProvider: '',
        specificNeeds: ''
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  const reviews = [
    {
      name: "Balaji Publication",
      body: "Our employees are happy using MGood services, because they are very proactive in providing solutions.",
      img: "https://avatar.vercel.sh/jill", // Corrected Path for Public Directory
    },
    {
      name: "NMV India Private Limited",
      body: "We are in the oil and chemical industry, and MGood has provided good health checkups for our contractual employees.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "Pyramid Engineering",
      body: "MGood is offering our employees a unique plan which is so customized that we feel health empowered.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Pyramid Buildtech",
      body: "We have been offered full access of the MGood platform. Looking forward to a long term association.",
      img: "https://avatar.vercel.sh/jane",
    },
  ];

  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Employee Wellness Programs",
      description: "Comprehensive health screenings, preventive care, and wellness initiatives designed to keep your workforce healthy and productive."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Mediclaim Assessment Report",
      description: "Through a detailed analysis of your claims MIS, we deliver a strategic assessment report designed to support more informed and advantageous negotiations with insurers."
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "24/7 Assistance & Support",
      description: "We are available 24/7 to accept service requests, with a guaranteed response time of within 30 minutes."
    },
    {
      icon: <Building className="w-8 h-8 text-purple-600" />,
      title: "Elderly Care Program ",
      description: "Your parents are now under MGood’s care. Enroll them in our elderly care program and provide them with a dedicated personal health buddy."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-teal-600" />,
      title: "Serving Over 10,000 Pincodes",
      description: "With our extensive pan-India network of service providers, we enable users to access our services nationwide. Simply send us a request, and we will ensure your needs are promptly addressed."
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      title: "Expert Care, Exceptional Medicines",
      description: "Upon specific request, we facilitate access to super specialist doctors and procure rare medicines essential for specialized treatments."
    }
  ];

  const ReviewCard = ({ img, name, username, body }) => {
    return (
      <figure className={cn("relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4", "border-gray-200 bg-white hover:shadow-lg transition-shadow")}>
        <div className="flex flex-row items-center gap-4">
          <img className="rounded-full" style={{ width: '64px', height: '64px', objectFit: 'cover' }} alt={name} src={img} />
          <div className="flex flex-col">
            <figcaption className="text-sm font-semibold text-gray-800">{name}</figcaption>
            {username && <p className="text-xs font-medium text-gray-500">{username}</p>}
          </div>
        </div>
        <blockquote className="mt-4 text-sm text-gray-600">{body}</blockquote>
      </figure>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section 1 - Hero with Split Layout */}
      <section className="min-h-screen flex items-center overflow-hidden">
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
                <div className="inline-flex mt-3 items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <Building className="w-4 h-4 mr-2 mt-3" />
                  Your Corporate Healthcare Partner
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Transform Your 
                  <span className="text-blue-600 block">Employee Wellness</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  MGood revolutionizes corporate healthcare with comprehensive wellness programs, preventive care, and seamless health management solutions.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#register" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl group">
                   Schedule Demo
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div className="text-center"><div className="text-3xl font-bold text-blue-600">20+</div><div className="text-sm text-gray-600">Companies Trust Us</div></div>
                <div className="text-center"><div className="text-3xl font-bold text-green-600">1200+</div><div className="text-sm text-gray-600">Employees Covered</div></div>
                <div className="text-center"><div className="text-3xl font-bold text-purple-600">97%</div><div className="text-sm text-gray-600">Satisfaction Rate</div></div>
              </div>
            </motion.div>

            {/* Image/Visual Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-teal-500 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-8 space-y-6">
                  <div className="flex items-center space-x-4"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><Heart className="w-6 h-6 text-blue-600" /></div><div><h3 className="font-semibold text-gray-900">Health Dashboard</h3><p className="text-gray-600 text-sm">Real-time wellness insights</p></div></div>
                  <div className="space-y-3"><div className="flex justify-between items-center"><span className="text-gray-600">Employee Wellness Score</span><span className="font-semibold text-green-600">92%</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full w-[92%]"></div></div></div>
                  <div className="grid grid-cols-2 gap-4"><div className="bg-blue-50 p-4 rounded-lg"><div className="text-2xl font-bold text-blue-600">24/7</div><div className="text-sm text-gray-600">Health Support</div></div><div className="bg-green-50 p-4 rounded-lg"><div className="text-2xl font-bold text-green-600">376+</div><div className="text-sm text-gray-600">Health Service Providers</div></div></div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"><Star className="w-8 h-8 text-white" /></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg"><CheckCircle className="w-6 h-6 text-white" /></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-20 bg-white">
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='text-4xl lg:text-5xl font-extrabold text-blue-600 mb-12 text-center'
          >
            Our Onboarded Corporates
          </motion.h2>
          <Marquee pauseOnHover className="[--duration:30s]">
            {reviews.map((review) => <ReviewCard key={review.name} {...review} />)}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Healthy Employees, Happy Organization</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our integrated approach combines health optimization, employee engagement, and strategic cost management to ensure your workforce thrives.
            </p>
          </motion.div>
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
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Employee Healthcare?</h3>
              <p className="text-blue-100 text-lg mb-8">Join companies that have already revolutionized their employee wellness programs with MGood.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#register" className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg">
                  Start Registration <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                <a href="tel:+918923894358" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                  <Phone className="w-5 h-5 mr-2" /> Call: +91-8923894358
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="register" className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Register Your Organization</h2>
              <p className="text-xl text-gray-600">Take the first step. Our team will contact you within 24 hours.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="grid lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <form onSubmit={handleSubmit}>
                    {submitted && (<div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-xl flex items-center"><CheckCircle className="w-6 h-6 text-green-600 mr-3" /><div><h3 className="font-semibold text-green-800">Registration Successful!</h3><p className="text-green-600 text-sm mt-1">Our team will be in touch shortly.</p></div></div>)}
                    <div className="space-y-6">
                      {error && (<div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>)}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div><label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label><input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="Your company name"/></div>
                        <div><label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label><input type="text" id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="Your full name"/></div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div><label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Business Email *</label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="company@domain.com"/></div>
                        <div><label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label><input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="10-digit mobile number" maxLength="10"/></div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div><label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700 mb-2">Employee Count *</label><select id="employeeCount" name="employeeCount" value={formData.employeeCount} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"><option value="">Select count</option><option value="1-50">1-50</option><option value="51-200">51-200</option><option value="201-500">201-500</option><option value="501-1000">501-1000</option><option value="1000+">1000+</option></select></div>
                        <div><label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">Industry</label><input type="text" id="industry" name="industry" value={formData.industry} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="e.g., Technology"/></div>
                      </div>
                      <button type="submit" disabled={isSubmitting} className={`w-full flex items-center justify-center px-8 py-4 ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl`}>
                        {isSubmitting ? (<><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>Processing...</>) : (<>Register Organization <ArrowRight className="w-5 h-5 ml-2" /></>)}
                      </button>
                    </div>
                  </form>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 lg:p-12 text-white">
                  <div className="space-y-8">
                    <div><h3 className="text-2xl font-bold mb-4">Get in Touch</h3><p className="text-blue-100 mb-8">Our experts are standing by to help you create a customized MGood Program for your team.</p></div>
                    <div className="space-y-6">
                      <div className="flex items-center"><Phone className="w-6 h-6 mr-4 flex-shrink-0" /><div><p className="font-semibold">Call Us</p><p className="text-blue-100">+91-8923894358</p></div></div>
                      <div className="flex items-center"><Mail className="w-6 h-6 mr-4 flex-shrink-0" /><div><p className="font-semibold">Email Us</p><p className="text-blue-100">info@mgood.org</p></div></div>
                      <div className="flex items-center"><MapPin className="w-6 h-6 mr-4 flex-shrink-0" /><div><p className="font-semibold">Visit Us</p><p className="text-blue-100">73/71 Chagan Pura, Mathura</p></div></div>
                    </div>
                    <div className="pt-8 border-t border-blue-400">
                      <h4 className="font-semibold mb-4">Our Trusted Partners</h4>
                      <div className="space-y-2 text-sm text-blue-100">
                        <p><span className="font-medium text-white">Doctors:</span> MGood Super Speciality Network</p>
                        <p><span className="font-medium text-white">Pharmacy:</span> AVA Pharma & Safe Meds</p>
                        <p><span className="font-medium text-white">Pathology:</span> Thyrocare / Max / Sarvodaya</p>
                        <p><span className="font-medium text-white">MIS Analysis:</span> In-House Team of Experts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Customcorporate;