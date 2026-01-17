
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import SubscriptionItem from './components/SubscriptionItem';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <>
      <Header />
      <div style={{ paddingBottom: '120px' }}> {/* Space for BottomNav */}

        <SummaryCards />

        <div style={{ padding: '0 24px', marginTop: '12px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#1C1C1E' }}>Upcoming</h2>
          <SubscriptionItem
            name="Netflix"
            detail="Renews on 15 Sep"
            price="15"
            type="active"
            frequency="Monthly"
            brandColor="#E50914"
          />
        </div>

        <div style={{ padding: '0 24px', marginTop: '12px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#1C1C1E' }}>Cancelled</h2>
          <SubscriptionItem
            name="ChatGPT Pro"
            detail="Renews on 18 Sep"
            price="20"
            type="cancelled"
            brandColor="#10A37F"
          />
        </div>

        <div style={{ padding: '0 24px', marginTop: '12px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#1C1C1E' }}>All subscriptions</h2>
          <SubscriptionItem
            name="Apple TV+"
            detail="Renews on 24 Sep"
            price="7"
            type="active"
            frequency="Monthly"
            brandColor="#000000"
          />
          <SubscriptionItem
            name="Spotify Premium"
            detail="Renews on 28 Sep"
            price="10"
            type="active"
            frequency="Yearly"
            brandColor="#1DB954"
          />
          <SubscriptionItem
            name="Apple Music"
            detail="Renews on 30 Sep"
            price="15"
            type="active"
            frequency="Monthly"
            brandColor="#FA243C"
          />
        </div>
      </div>
      <BottomNav />
    </>
  );
}

export default App;
