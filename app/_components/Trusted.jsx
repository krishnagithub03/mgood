'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Users, Shield, Heart, CheckCircle, Phone, Mail, MapPin, ArrowRight, Star, Check } from 'lucide-react';
import { cn } from "@/lib/utils";


const Trusted=()=>{
    return (
    <div>
     <section className="h-[80vh] flex items-center overflow-hidden">
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
                <a href="/customCorporate#register" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl group">
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
    </div>
    )
}

export default Trusted;