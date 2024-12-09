import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      quantity: 1,
      size: product.sizes[0]?.size
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-64 object-cover hover:opacity-90 transition-opacity"
        />
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-primary">
            {product.name}
          </h3>
        </Link>
        
        <p className="mt-1 text-gray-600">{product.brand}</p>
        
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">
            {product.price.toFixed(2)}cfa
          </span>
          
          <button
            onClick={handleAddToCart}
            className="btn-primary"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
