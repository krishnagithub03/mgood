"use client";
import { Button } from '@/components/ui/button'
import React from 'react'
const Event = () => {
  return (
    <div className='text-center bg-gray-100 py-2 text-sm font-medium'>
        <span>Play MHL And Earn Rewards 🏏 </span> 
        <Button className="text-center bg-primary py-2 text-sm font-medium" onClick={() => window.location.href = '/MHL'}>
            Play
        </Button>
    </div>
  )
}

export default Event
