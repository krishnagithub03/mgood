'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Building, Users, Shield, Heart, CheckCircle, Phone, Mail, MapPin, ArrowRight, Star } from 'lucide-react';
import { cn } from "@/lib/utils";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Marquee } from "@/components/magicui/marquee";


const Corporate = () => {
    const reviews = [
        {
          name: "Balaji Publication",
          body: "Our employees are happy using MGood services , Because they are very proactive in providing solutions",
          img: "https://avatar.vercel.sh/jill", 
        },
        {
          name: "NMV India Private Limited",
          body: "We are into oil and chemical industry and MGood has provided good healthcheckups for our contractual employees",
          img: "https://avatar.vercel.sh/jill",
        },
        {
          name: "Pyramid Engineering",
          body: "MGood is offering our employees an unique plan which is so customized that we feel health empowered",
          img: "https://avatar.vercel.sh/john",
        },
        {
          name: "Pyramid Buildtech",
          body: "We have been offered full access of MGood platform , Looking forward for a long term association",
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
      description: "Through a detailed analysis of your claims MIS, we deliver a strategic assessment report designed to support more informed and advantageous negotiations with insurers"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "24/7 Assistance & Support",
      description: "We are available 24/7 to accept service requests, with a guaranteed response time of within 30 minutes."
    },
    {
      icon: <Building className="w-8 h-8 text-purple-600" />,
      title: "Elderly Care Program ",
      description: "Your parents are now under MGood’s care. Enroll them in our elderly care program and provide them with a dedicated personal health buddy for continuous support and empowerment."
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
                  Transform Your 
                  <span className="text-blue-600 block">Employee Wellness</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  MGood revolutionizes corporate healthcare with comprehensive wellness programs, 
                  preventive care, and seamless health management solutions designed specifically for modern businesses.
                </p>
              </div>
              
            

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">20+</div>
                  <div className="text-sm text-gray-600">Companies Trust Us</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">1200+</div>
                  <div className="text-sm text-gray-600">Employees Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">97%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
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
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Health Dashboard</h3>
                      <p className="text-gray-600 text-sm">Real-time wellness insights</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Employee Wellness Score</span>
                      <span className="font-semibold text-green-600">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-[92%]"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">24/7</div>
                      <div className="text-sm text-gray-600">Health Support</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">376+</div>
                      <div className="text-sm text-gray-600">Health Service Providers</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Marquee Section */}
      <section className="py-12 bg-gray-50 dark:bg-background">
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
       <h2 className='text-5xl font-bold text-blue-600 mb-8 text-center'>Our Onboarded Corporates</h2>
          <Marquee pauseOnHover className="[--duration:20s]">
            {reviews.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
          {/* Fades for aesthetics */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-50 dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-50 dark:from-background"></div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
                className="text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Healthy Employees, Happy Organization
            </motion.h2>
            <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
              At MGood, we go beyond traditional corporate wellness. Our integrated approach combines health optimization, employee engagement, wellness benefits and strategic cost management to ensure your workforce thrives — physically, mentally, and financially. Together, we create a long-term, mutually beneficial model that reduces claims, controls premiums, and enhances overall organizational well-being
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
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Employee Healthcare?
              </h3>
              <p className="text-blue-100 text-lg mb-8">
                Join hundreds of companies that have already revolutionized their employee wellness programs with MGood.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/customCorporate" // Consider using Next.js <Link> for client-side navigation
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  Start Registration
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
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

export default Corporate;