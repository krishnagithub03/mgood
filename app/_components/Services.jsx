'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { Building, Users, Shield, Heart, CheckCircle, Phone, Mail, MapPin, ArrowRight, Star } from 'lucide-react';
import { cn } from "@/lib/utils";



const Services =()=>{
    const features = [
        {
          icon: <Users className="w-8 h-8 text-blue-600" />,
          title: "Health Issue,Ping Us",
          description: "We are just a text away,Whatever your concern is, Our team will arrShould you encounter any health-related concerns, please feel free to reach out. Our dedicated team is always available to provide the best possible support and solutions"
        },
        {
          icon: <Shield className="w-8 h-8 text-green-600" />,
          title: "Super specialist Doctors",
          description: "If any medical condition requires the expertise of a super-specialist, we can arrange consultations with top-tier specialists to ensure you receive the highest standard of care"
        },
        {
          icon: <Heart className="w-8 h-8 text-red-600" />,
          title: "Expand. Evolve. Excel — Partner with Mgood Today",
          description: "Empower Your Practice with Multispeciality Expertise — Join Mgood and offer your services"
        },
        {
          icon: <Building className="w-8 h-8 text-purple-600" />,
          title: "Elderly Care Program ",
          description: "Your parents are now under MGood’s care. Enroll them in our elderly care program and provide them with a dedicated personal health buddy for continuous support and empowerment."
        },
        {
          icon: <CheckCircle className="w-8 h-8 text-teal-600" />,
          title: "Get Insurance-Ready with MGood by Your Side",
          description: "Mgood facilitates the onboarding of your medical facility onto insurance and wellness panels, enabling patients to access enhanced benefits and services"
        },
        {
          icon: <Star className="w-8 h-8 text-yellow-600" />,
          title: "Expert Care, Exceptional Medicines",
          description: "Upon specific request, we facilitate access to super specialist doctors and procure rare medicines essential for specialized treatments."
        }
      ];
      

return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 w-[90%] m-auto" id="services" >
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
)

}



export default Services