import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FarmerDashboard = () => {
  const { username } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const cards = [
    {
      title: 'View Schemes',
      text: 'Check available government schemes for farmers.',
      path: '/farmer/viewschemes'
    },
    {
      title: 'Buy & Rent Products',
      text: 'Browse all farming products by category.',
      path: '/farmer/viewproducts'
    },
    {
      title: 'View Cart',
      text: 'View and manage items in your cart.',
      path: '/farmer/cart'
    },
    {
      title: 'Orders',
      text: 'Track your past and current orders.',
      path: '/farmer/orders'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.dashboard}>
      <h2 style={styles.heading}>Welcome, {username}!</h2>
      <p style={styles.subtitle}>This is your Farmer Dashboard.</p>

      <div style={styles.cardContainer}>
        {cards.map((card, index) => (
          <div
            key={index}
            style={hoveredIndex === index ? {...styles.card, ...styles.cardHover} : styles.card}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleNavigation(card.path)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') handleNavigation(card.path); }}
          >
            <h3 style={styles.cardTitle}>{card.title}</h3>
            <p style={styles.cardText}>{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    minHeight: '80vh',
    padding: '20px',
    backgroundColor: '#f9f9f9'
  },
  heading: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '5px',
    color: '#2c662d',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#555',
    marginBottom: '25px',
    textAlign: 'center'
  },
  cardContainer: {
    marginTop: '30px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '25px',
    width: '100%',
    maxWidth: '1000px',
    padding: '10px'
  },
  card: {
    padding: '25px',
    border: '1px solid #ddd',
    borderRadius: '15px',
    background: 'linear-gradient(135deg, #ffffff, #f4f4f4)',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    textAlign: 'center',
    minHeight: '170px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    userSelect: 'none',
  },
  cardHover: {
    transform: 'translateY(-6px) scale(1.04)',
    boxShadow: '0 6px 20px rgba(44, 102, 45, 0.3)',
    background: 'linear-gradient(135deg, #e8f5e9, #d8ffd8)'
  },
  cardTitle: {
    marginBottom: '15px',
    color: '#2c662d',
    fontWeight: '600',
    fontSize: '1.3rem',
  },
  cardText: {
    fontSize: '1rem',
    color: '#444',
    lineHeight: '1.3',
  }
};

export default FarmerDashboard;
