import React from 'react';
import { FaStar } from 'react-icons/fa'; // Ensure react-icons is installed

const StarRating = ({ rating, onRatingChange }) => {
  const handleClick = (value) => {
    onRatingChange(value);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const value = index + 1;
        return (
          <FaStar
            key={value}
            size={24}
            color={value <= rating ? '#ffc107' : '#e4e5e9'}
            onClick={() => handleClick(value)}
            style={{ cursor: 'pointer', marginRight: 5 }}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
