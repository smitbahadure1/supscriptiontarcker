import { Calendar, FileText } from 'lucide-react';
import React from 'react';

const SummaryCards: React.FC = () => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            padding: '24px',
            marginTop: '-24px' // Pull up if we want overlap, but let's keep it clean strictly below first.
            // Actually, let's just use standard padding.
        }}>
            <Card
                icon={<Calendar size={20} className="text-blue-600" color="#0038D9" />}
                label="Due this month"
                amount="$35.47"
            />
            <Card
                icon={<FileText size={20} className="text-blue-600" color="#0038D9" />}
                label="Monthly avg"
                amount="$44.23"
            />
        </div>
    );
};

const Card: React.FC<{ icon: React.ReactNode; label: string; amount: string }> = ({ icon, label, amount }) => {
    return (
        <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'flex-start'
        }}>
            <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#F2F4F7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {icon}
            </div>
            <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '20px', fontWeight: 700 }}>{amount}</div>
            </div>
        </div>
    );
};

export default SummaryCards;
