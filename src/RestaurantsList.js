import React, { useState, useEffect } from "react";
import "./RestaurantsList.css";
import bangalore_data from "./bangalore_restaurants_ranked.json";
import mumbai_data from "./cleaned_ranked_mumbai.json";

// SVG icons as components with improved styling
const MapIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14L21 3" />
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg 
    className={`star-icon ${filled ? 'filled' : ''}`} 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// Rating component to display stars
const Rating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="rating-stars">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`full-${i}`} filled={true} />
      ))}
      {hasHalfStar && <StarIcon filled={false} />}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={`empty-${i}`} filled={false} />
      ))}
    </div>
  );
};

export default function RestaurantsList() {
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [restaurants, setRestaurants] = useState([]);
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    setRestaurants(selectedCity === "Bangalore" ? bangalore_data : mumbai_data);
  }, [selectedCity]);

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1 className="title">
          Top Restaurants in <span className="city-highlight">{selectedCity}</span>
        </h1>

        <div className="city-selector">
          <button 
            className={`city-button ${selectedCity === "Bangalore" ? "active" : ""}`} 
            onClick={() => setSelectedCity("Bangalore")}
          >
            Bangalore
          </button>
          <button 
            className={`city-button ${selectedCity === "Mumbai" ? "active" : ""}`} 
            onClick={() => setSelectedCity("Mumbai")}
          >
            Mumbai
          </button>
        </div>

    
        <div className="restaurant-grid">
          {restaurants.map((restaurant, index) => (
            <div key={restaurant.id} className="restaurant-card">
              <div className="rank-badge">#{index + 1}</div>
              <div className="restaurant-content">
                <h2 className="restaurant-name">
                  {restaurant?.["displayName.text"]}
                </h2>
                
                <div className="rating-section">
                  <Rating rating={restaurant.rating} />
                  <span className="rating-value">{restaurant.rating}</span>
                  <span className="review-count">
                    ({restaurant.userRatingCount.toLocaleString()} reviews)
                  </span>
                </div>

                <p className="restaurant-address">
                  <MapIcon />
                  <span>{restaurant.shortFormattedAddress}</span>
                </p>
                
                <a
                  href={restaurant.googleMapsUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="maps-link"
                >
                  <ExternalLinkIcon />
                  <span>View on Google Maps</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}