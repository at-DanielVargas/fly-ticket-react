import React, { forwardRef } from 'react';
export const Button = forwardRef(({ children, onClick, color = 'primary', className = '', type }, ref) => {
  return (
    <button ref={ref} type={type} className={`button ${color} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
});
