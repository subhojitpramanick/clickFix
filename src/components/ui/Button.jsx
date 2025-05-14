import React from 'react';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  disabled = false, 
  onClick, 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white border-transparent focus:ring-primary-500',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 focus:ring-primary-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white border-transparent focus:ring-red-500'
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  const buttonClasses = `
    ${baseClasses} 
    ${variantClasses[variant] || variantClasses.primary} 
    ${disabled ? disabledClasses : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 