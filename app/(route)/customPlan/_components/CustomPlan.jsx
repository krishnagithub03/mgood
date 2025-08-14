'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Building, Users, Shield, Heart, CheckCircle, Phone, Mail, MapPin, ArrowRight, Star, Check } from 'lucide-react';
import { cn } from "@/lib/utils";
import Country from '@/app/_components/Country';

// --- Updated Company Data with Logo Paths ---
// NOTE: Ensure your logo images are placed in the `public/logos/` directory.
const companyData = [
  { id: '0709', name: 'Pyramid Buildtech', logo: null },
  { id: '2611', name: 'Balaji Publication', logo: null },
  { id: '1303', name: 'NMV India Private Limited', logo: null },
  { id: '0507', name: 'Pyramid Engineering', logo: null },
  { id: '0809', name: 'ObserveNow Media', logo: './observenow.png' },
];

// --- Reusable Pricing Card Component ---
const PricingCard = ({ plan, index }) => {
  const isHighlighted = plan.highlight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative flex h-full flex-col rounded-2xl p-8 border shadow-lg transition-transform hover:scale-105",
        isHighlighted
          ? "bg-blue-600 text-white ring-2 ring-blue-700"
          : "bg-white text-gray-900 border-gray-200"
      )}
    >
      {isHighlighted && (
        <p className="absolute top-0 -translate-y-1/2 rounded-full bg-yellow-400 px-4 py-1 text-sm font-semibold text-gray-800">
          Most Popular
        </p>
      )}
      <div className="flex-grow">
        <div className="text-center">
          <h2 className={cn("text-2xl font-bold", isHighlighted ? "text-white" : "text-gray-900")}>
            {plan.name}
          </h2>
          <p className={cn("mt-2 text-sm", isHighlighted ? "text-blue-100" : "text-gray-600")}>
            {plan.description}
          </p>
          <p className="mt-4">
            <strong className={cn("text-4xl font-bold", isHighlighted ? "text-white" : "text-gray-900")}>
              {plan.price.startsWith('C') ? plan.price : `₹${plan.price}`}
            </strong>
            { !plan.price.startsWith('C') && <span className={cn("text-sm font-medium", isHighlighted ? "text-blue-200" : "text-gray-700")}>/employee</span> }
          </p>
        </div>
        <ul className="mt-8 space-y-3">
        {plan.features.map((feature, i) => (
  <li key={i} className="flex items-start gap-2">
    <Check className={cn("size-5 flex-shrink-0 mt-1", isHighlighted ? "text-yellow-400" : "text-blue-600")} />
    <span className={cn(isHighlighted ? "text-blue-50" : "text-gray-700")}>
      {feature.toLowerCase().includes("you saved") ? (
        <strong>{feature}</strong>
      ) : (
        feature
      )}
    </span>
  </li>
))}

        </ul>
      </div>
      <a
        href={plan.ctaLink}
        className={cn(
          "mt-8 block w-full rounded-full px-12 py-3 text-center text-sm font-medium focus:ring-4 focus:outline-none transition-colors",
          isHighlighted
            ? "bg-white text-blue-600 hover:bg-blue-50 focus:ring-blue-200"
            : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300 border border-blue-600"
        )}
      >
        BOOK NOW
      </a>
    </motion.div>
  );
};

// --- Marquee Component ---
const Marquee = ({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        { "flex-row": !vertical, "flex-col": vertical },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
};

const CustomPlan = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
    plan: '',
    address: '',
    pincode: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [company,setcompany]=useState('');
  const [companyId,setcompanyId]=useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const currentCompanyId = searchParams.get('companyId');
    if (currentCompanyId) {
      const companyDetails = companyData.find(c => c.id === currentCompanyId);
      if (companyDetails) {
        setFormData(prev => ({
          ...prev,
          companyName: companyDetails.name
        }));
        setcompany(companyDetails.name);
        setcompanyId(companyDetails.id);
        setCompanyLogo(companyDetails.logo);
      }
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);
  const validatePincode = (pincode) => /^\d{6}$/.test(pincode);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setIsSubmitting(true);
  //   setSubmitted(false);

  //   try {
  //     if (!formData.companyName.trim()) throw new Error("Please enter your company name");
  //     if (!formData.contactPerson.trim()) throw new Error("Please enter contact person name");
  //     if (!validateEmail(formData.email)) throw new Error("Please enter a valid email address");
  //     if (!validatePhone(formData.phoneNumber)) throw new Error("Please enter a valid 10-digit mobile number");
  //     if (!formData.plan) throw new Error("Please select a plan");
  //     if (!formData.address.trim()) throw new Error("Please enter your address");
  //     if (!validatePincode(formData.pincode)) throw new Error("Please enter a valid 6-digit pincode");

  //     const response = await fetch('/api/submit-to-sheets', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || 'Something went wrong on the server.');
  //     }

  //     setSubmitted(true);
      
  //     // --- FIX: Preserve the company name on form reset ---
  //     setFormData({
  //       companyName: company, // Keep the original company name
  //       contactPerson: '',
  //       email: '',
  //       phoneNumber: '',
  //       plan: '',
  //       address: '',
  //       pincode: ''
  //     });

  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    setSubmitted(false);

    try {
      // 1. Your validation logic remains the same (it's perfect)
      if (!formData.companyName.trim()) throw new Error("Please enter your company name");
      if (!formData.contactPerson.trim()) throw new Error("Please enter contact person name");
      if (!validateEmail(formData.email)) throw new Error("Please enter a valid email address");
      if (!validatePhone(formData.phoneNumber)) throw new Error("Please enter a valid 10-digit mobile number");
      if (!formData.plan) throw new Error("Please select a plan");
      if (!formData.address.trim()) throw new Error("Please enter your address");
      if (!validatePincode(formData.pincode)) throw new Error("Please enter a valid 6-digit pincode");

      // 2. Prepare the request body
      const requestBody = JSON.stringify(formData);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestBody,
      };

      // 3. Call both API routes in parallel using Promise.all
      const [sheetsResponse, emailResponse] = await Promise.all([
        fetch('/api/submit-to-sheets', requestOptions),
        fetch('/api/corporateEmail', requestOptions) // Call the new email route
      ]);

      // 4. Check if BOTH requests were successful
      if (!sheetsResponse.ok || !emailResponse.ok) {
        throw new Error('One or more tasks failed. Please try again.');
      }

      // 5. If everything is successful, update the UI
      setSubmitted(true);
      
      // Reset the form
      setFormData({
        companyName: company, 
        contactPerson: '',
        email: '',
        phoneNumber: '',
        plan: '',
        address: '',
        pincode: ''
      });

    } catch (err) {
      // The catch block will now handle failures from validation or either API call
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
};
  const reviews = [
    { name: "Balaji Publication", body: "Our employees are happy using MGood services...", img: "https://avatar.vercel.sh/jill", id: 1 },
    { name: "NMV India Private Limited", body: "MGood has provided good health checkups...", img: "https://avatar.vercel.sh/jill", id: 2 },
    { name: "Pyramid Engineering", body: "MGood is offering our employees a unique plan...", img: "https://avatar.vercel.sh/john", id: 3 },
    { name: "Pyramid Buildtech", body: "We have been offered full access of the MGood platform...", img: "https://avatar.vercel.sh/jane", id: 4 },
    { name: "Observe Now", body: "Very convenient and user-friendly. Saves time and connects you with real doctors fast!", img: "https://avatar.vercel.sh/jane", id: 5 }
  ];

  const features = [
    { icon: <Users className="w-8 h-8 text-blue-600" />, title: "Employee Wellness Programs", description: "Comprehensive health screenings, preventive care, and wellness initiatives." },
    { icon: <Shield className="w-8 h-8 text-green-600" />, title: "Mediclaim Assessment Report", description: "A detailed analysis of your claims MIS to support advantageous negotiations with insurers." },
    { icon: <Heart className="w-8 h-8 text-red-600" />, title: "24/7 Assistance & Support", description: "We are available 24/7 with a guaranteed response time of within 30 minutes." },
    { icon: <Building className="w-8 h-8 text-purple-600" />, title: "Elderly Care Program", description: "Enroll parents in our program for a dedicated personal health buddy." },
    { icon: <CheckCircle className="w-8 h-8 text-teal-600" />, title: "Serving 10,000+ Pincodes", description: "Our extensive pan-India network enables users to access our services nationwide." },
    { icon: <Star className="w-8 h-8 text-yellow-600" />, title: "Expert Care", description: "We facilitate access to super specialist doctors and procure rare medicines." }
  ];

  const plansData = [
    {
      name: "PLAN A",
      price: "949",
      description: "Basic Plan (75 Parameters)",
      features: [
        "Hemogram",
        "Routine Urine Analysis",
        "HbA1c",
        "Liver Function Tests",
        "Lipid Profile",
        "Kidney Function (KidPro)",
        "Thyroid Profile (T3-T4-TSH)",
        "Health Assessment Report",
       "You saved 2420 INR",
        "Elderly Care Program for Parents"
      ],
      ctaLink: `/customPlan?companyId=${companyId}#register`,
      highlight: false
    },
    {
      name: "PLAN B",
      price: "1299",
      description: "Advanced Plan (90 Parameters)",
      features: [
        "Everything in Plan A",
        "ESR",
        "Complete Urine Analysis",
        "Fasting Blood Sugar (Glucose)",
        "25-OH Vitamin D (Total)",
        "Vitamin B-12",
        "CA-125 / Prostate",
        "Health Assessment Report",
        "You saved 5620 INR",
         "Elderly Care Program for Parents"
      ],
      ctaLink: `/customPlan?companyId=${companyId}#register`,
      highlight: false
    },
    {
      name: "PLAN C",
      price: "1799",
      description: "Comprehensive care with 125 test parameters for deeper insights.",
      features: [
        "Everything in PLAN B",
        "Cardiac Risk Markers",
        "Iron Deficiency Profile",
        "Serum Electrolytes",
        "Elements 22 (Toxic and Nutrients)",
        "Hepatitis B Surface Antigen (HBsAg)",
        "Dedicated Health Buddy",
        "Health Assessment Report",
        "You Saved 8850",
        "Family Support Assistance"
      ],
      ctaLink: `/customPlan?companyId=${companyId}#register`,
      highlight: true
    },
    { name: "Plan D", price: "Custom", description: "A fully tailored solution for you and your family.", features: [ "Connect With Mgood SPOC ","Design Your Own Package","Dedicated Health Buddy","Health Assessment Report", "Advanced Data Analytics"], ctaLink: `/customPlan?companyId=${companyId}#register`, highlight: false }
  ];

  const ReviewCard = ({ img, name, username, body }) => (
    <figure className={cn("relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4", "border-gray-200 bg-white hover:shadow-lg transition-shadow")}>
      <div className="flex flex-row items-center gap-4"><img className="rounded-full" style={{ width: '64px', height: '64px', objectFit: 'cover' }} alt={name} src={img} /><div className="flex flex-col"><figcaption className="text-sm font-semibold text-gray-800">{name}</figcaption>{username && <p className="text-xs font-medium text-gray-500">{username}</p>}</div></div><blockquote className="mt-4 text-sm text-gray-600">{body}</blockquote>
    </figure>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="space-y-8">
              <div className="space-y-4 pt-12 lg:pt-0">
              {companyLogo && (
                <img
                  src={companyLogo}
                  alt={`${company} Logo`}
                  className=" h-16 md:h-20 mb-8 object-contain"
                />
              )}
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-3xl font-medium"><Building className="w-8 h-8 mr-2" />{company}</div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">Transform Your <span className="text-blue-600 block">Employee Wellness</span></h1>
                <p className="text-xl text-gray-600 leading-relaxed">MGood revolutionizes corporate healthcare with comprehensive wellness programs, preventive care, and seamless health management solutions.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4"><a href="#register" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl group">Submit Your Request<ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></a></div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div className="text-center"><div className="text-3xl font-bold text-blue-600">20+</div><div className="text-sm text-gray-600">Companies Trust Us</div></div>
                <div className="text-center"><div className="text-3xl font-bold text-green-600">1200+</div><div className="text-sm text-gray-600">Employees Covered</div></div>
                <div className="text-center"><div className="text-3xl font-bold text-purple-600">97%</div><div className="text-sm text-gray-600">Satisfaction Rate</div></div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="relative">
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
      <Country/>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Select Your Plan</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Choose a plan that suits your health needs. You can also discuss the same with an MGood SPOC.</p>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {plansData.map((plan, index) => (<PricingCard key={plan.name} plan={plan} index={index} />))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-20 bg-white">
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className='text-4xl lg:text-5xl font-bold text-blue-600 mb-12 text-center'>Our Onboarded Corporates</motion.h2>
          <Marquee pauseOnHover>{reviews.map((review) => <ReviewCard key={review.id} {...review} />)}</Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Healthy Employees, Happy Organization</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our integrated approach combines health optimization, employee engagement, and strategic cost management to ensure your workforce thrives.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{features.map((feature, index) => (<motion.div key={index} className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}><div className="mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div><h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{feature.title}</h3><p className="text-gray-600 leading-relaxed">{feature.description}</p></motion.div>))}</div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="register" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
              {companyLogo && (
                <img
                  src={companyLogo}
                  alt={`${company} Logo`}
                  className="mx-auto h-16 md:h-20 mb-8 object-contain"
                />
              )}
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Your Health Plan</h2>
              <p className="text-xl text-gray-600">Take the first step. Our team will contact you within 24 hours to confirm your booking.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: "easeOut" }} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <form onSubmit={handleSubmit}>
                    {submitted && (<div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-xl flex items-center"><CheckCircle className="w-6 h-6 text-green-600 mr-3" /><div><h3 className="font-semibold text-green-800">Request Received !</h3><p className="text-green-600 text-sm mt-1">Our team will be in touch shortly.</p></div></div>)}
                    <div className="space-y-6">
                      {error && (<div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>)}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                          <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors bg-gray-100 cursor-not-allowed" placeholder="Your company name"/>
                        </div>
                        <div><label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label><input type="text" id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="Your full name"/></div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div><label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Business Email *</label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="company@domain.com"/></div>
                        <div><label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label><input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="10-digit mobile number" maxLength="10"/></div>
                      </div>
                      <div>
                        <label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-2">Select Plan *</label>
                        <select id="plan" name="plan" value={formData.plan} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors">
                          <option value="">Choose a plan</option>
                          {plansData.map(p => (<option key={p.name} value={p.name}>{p.name} - {p.price === 'Custom' ? 'Custom Price' : `₹${p.price}`}</option>))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                        <textarea id="address" name="address" value={formData.address} onChange={handleChange} rows="3" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="Enter your full address for sample collection"/>
                      </div>
                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                        <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="6-digit pincode" maxLength="6" />
                      </div>
                      <button type="submit" disabled={isSubmitting} className={`w-full flex items-center justify-center px-8 py-4 ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl`}>
                        {isSubmitting ? (<><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>Processing...</>) : (<>Book My Plan <ArrowRight className="w-5 h-5 ml-2" /></>)}
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
                      <div className="flex items-center"><MapPin className="w-6 h-6 mr-4 flex-shrink-0" /><div><p className="font-semibold">Visit Us</p><span className='font-bold'>Mathura:</span><p className="text-blue-100">73/71 Chagan Pura, Mathura</p><span className='font-bold'>Greater Noida:</span><p className="text-blue-100">2074 Mahagun Mywoods Sector 16 C , Greater Noida 201309</p></div></div>

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

export default CustomPlan;
