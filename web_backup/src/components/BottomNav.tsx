import { Home, Calendar, Settings, Plus } from 'lucide-react';
import React from 'react';

const BottomNav: React.FC = () => {
    return (
        <div style={{
            position: 'absolute', // Fixed relative to the viewport (or absolute relative to #root)
            bottom: '32px',
            left: '0',
            width: '100%',
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'none' // Let clicks pass through the spacer areas
        }}>
            {/* Navigation Capsule */}
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                padding: '6px',
                borderRadius: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                pointerEvents: 'auto'
            }}>
                <button style={{
                    backgroundColor: '#1C1C1E',
                    color: 'white',
                    border: 'none',
                    borderRadius: '24px',
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer'
                }}>
                    <Home size={18} fill="white" />
                    Home
                </button>

                <button style={{
                    width: '44px',
                    height: '44px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#AEAEB2',
                    cursor: 'pointer'
                }}>
                    <Calendar size={22} />
                </button>

                <button style={{
                    width: '44px',
                    height: '44px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#AEAEB2',
                    cursor: 'pointer'
                }}>
                    <Settings size={22} />
                </button>
            </div>

            {/* FAB */}
            <button style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#1C1C1E',
                color: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                pointerEvents: 'auto'
            }}>
                <Plus size={28} />
            </button>
        </div>
    );
};

export default BottomNav;
