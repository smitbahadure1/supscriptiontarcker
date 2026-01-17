import { User, Bell } from 'lucide-react';
import React from 'react';

const Header: React.FC = () => {
  return (
    <div style={{
      backgroundColor: 'var(--primary-blue)',
      padding: '48px 24px 24px 24px', // Extra top padding for status bar simulation
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      borderBottomLeftRadius: '24px',
      borderBottomRightRadius: '24px',
      position: 'relative',
      zIndex: 10
    }}>
      <button style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}>
        <User size={20} color="black" fill="black" />
      </button>

      <h1 style={{
        fontSize: '18px',
        fontWeight: 600,
        margin: 0
      }}>Summary</h1>

      <button style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}>
        <Bell size={20} color="black" fill="black" />
      </button>
    </div>
  );
};

export default Header;
