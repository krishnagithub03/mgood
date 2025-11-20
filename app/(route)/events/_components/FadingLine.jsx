import React from 'react';

function FadingLine() {
  return (
    <div className="
      w-full 
      h-px 
      bg-gradient-to-r 
      from-transparent 
      via-green-500 
      to-transparent
      p-0.5
    " />
  );
}
function FadingLineVertical() {
  return (
    <div className="
      w-px 
      h-full 
      bg-gradient-to-b
      from-transparent 
      via-green-500 
      to-transparent
    " />
  );
}

export {FadingLine,FadingLineVertical};