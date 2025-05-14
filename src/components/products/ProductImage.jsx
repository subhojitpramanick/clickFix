import { useState } from 'react';

const ProductImage = ({ src, alt, className = '', ...props }) => {
  const [error, setError] = useState(false);
  
  const handleError = () => {
    setError(true);
  };
  
  // Fallback image when src is missing or fails to load
  const fallbackSrc = '/images/product-placeholder.jpg';
  
  return (
    <img
      src={error || !src ? fallbackSrc : src}
      alt={alt || 'Product image'}
      className={`object-cover ${className}`}
      onError={handleError}
      {...props}
    />
  );
};

export default ProductImage; 