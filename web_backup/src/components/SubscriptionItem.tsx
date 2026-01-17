import React from 'react';

interface SubscriptionItemProps {
    name: string;
    detail: string;
    price: string;
    type: 'active' | 'cancelled';
    frequency?: string;
    iconSrc?: string; // We'll just use a placeholder color or letter if no image
    brandColor?: string;
}

const SubscriptionItem: React.FC<SubscriptionItemProps> = ({ name, detail, price, type, frequency, brandColor = '#000' }) => {
    return (
        <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '20px',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}>
            {/* Icon Placeholder */}
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'white',
                border: '1px solid #F2F2F7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 700,
                color: brandColor // e.g. Netflix Red
            }}>
                {/* Simple Letter Logo for now */}
                {name[0]}
            </div>

            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>{name}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{detail}</div>
            </div>

            <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>${price}</div>
                {type === 'active' ? (
                    <div style={{
                        fontSize: '12px',
                        color: '#FF6B00', // Orange-ish for Monthly
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '4px'
                    }}>
                        {/* Small icon could go here */}
                        {frequency}
                    </div>
                ) : (
                    <div style={{
                        fontSize: '12px',
                        color: 'var(--text-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        🚫 Cancelled
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubscriptionItem;
