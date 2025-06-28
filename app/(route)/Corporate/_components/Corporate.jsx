'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Building, Users, Shield, Heart, CheckCircle, Phone, Mail, MapPin, ArrowRight, Star } from 'lucide-react';
import { TextAnimate } from "@/components/magicui/text-animate";

const Corporate = () => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <TextAnimate animation="blurInUp" by="character" once>
                Healthy Employees , Happy Organization
              </TextAnimate>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At MGood, we go beyond traditional corporate wellness. Our integrated approach combines health optimization, employee engagement, wellness benefits and strategic cost management to ensure your workforce thrives — physically, mentally, and financially. Together, we create a long-term, mutually beneficial model that reduces claims, controls premiums, and enhances overall organizational well-being
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              // 2. Define animation variants for each card
              const cardVariants = {
                hidden: {
                  opacity: 0,
                  // Animate from left for the 1st column, from bottom for 2nd, from right for 3rd
                  x: index % 3 === 0 ? -100 : (index % 3 === 2 ? 100 : 0),
                  y: index % 3 === 1 ? 100 : 0,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1, // Stagger the animation of each card
                    ease: "easeOut",
                  },
                },
              };

              return (
                
                <motion.div
                  key={index}
                  className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }} 
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
              );
            })}
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
                  href="/customCorporate"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  Start Registration
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91-8923894358
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Corporate;