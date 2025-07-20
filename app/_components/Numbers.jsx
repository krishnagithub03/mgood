'use client';

import React from 'react';

import { motion } from 'framer-motion';






const Numbers=()=>{

return(
<div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
<div className="text-center">
  <div className="text-3xl font-bold text-blue-600">602+</div>
  <div className="text-sm text-gray-600">Health Service Request</div>
</div>
<div className="text-center">
  <div className="text-3xl font-bold text-green-600">60k+</div>
  <div className="text-sm text-gray-600">User Reach</div>
</div>
<div className="text-center">
  <div className="text-3xl font-bold text-purple-600">4.9</div>
  <div className="text-sm text-gray-600">Google Rating</div>
</div>
</div>
)

}


export default Numbers;