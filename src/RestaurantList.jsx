import React, { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import './RestaurantList.css';

// Paikalliset kuvat id:n mukaan
const localImages = {
  1: '/images/cheese_burger.jpg',
  2: '/images/cheese_burger.jpg',
  // Lisää id-kuvaparit tarvittaessa
};

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/restaurants/ratings')
      .then(res => res.json())
      .then(data => {
        const enriched = data.map(restaurant => ({
          ...restaurant,
          imageUrl: localImages[restaurant.id] || '/images/default.jpg'
        }));
        setRestaurants(enriched);
      })
      .catch(err => {
        console.error('Error fetching restaurants:', err);
      });
  }, []);

  return (
    <div className="restaurant-list-container">
      <div className="side-panel">
        <h3>Actions</h3>
        <button onClick={() => {}}>Add Rating</button>
      </div>
      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;
