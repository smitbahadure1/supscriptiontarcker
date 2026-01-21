import React from 'react';
import { StyleSheet, View, ScrollView, Text, StatusBar } from 'react-native';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import SubscriptionItem from './components/SubscriptionItem';
import BottomNav from './components/BottomNav';

import { ChevronDown, Calendar as CalendarIcon, List, Plus } from 'lucide-react-native';
import CalendarScreen from './screens/CalendarScreen';
import AddSubscriptionScreen from './screens/AddSubscriptionScreen';
import SubscriptionDetailScreen from './screens/SubscriptionDetailScreen';
import SettingsScreen from './screens/SettingsScreen';

import useSubscriptionStore from './store/useSubscriptionStore';
import { parseISO, format } from 'date-fns';

export default function App() {
  const [currentScreen, setCurrentScreen] = React.useState('home');
  const [selectedSubscription, setSelectedSubscription] = React.useState(null);

  // Global Store
  const { subscriptions, addSubscription, updateSubscription, removeSubscription, refreshRenewals } = useSubscriptionStore();

  React.useEffect(() => {
    refreshRenewals();
  }, []);

  const handleSaveSubscription = (data) => {
    if (selectedSubscription && selectedSubscription.isReal) {
      updateSubscription(selectedSubscription.id, data);
    } else {
      addSubscription(data);
    }
    setCurrentScreen('home');
    setSelectedSubscription(null);
  };

  const handleDeleteSubscription = () => {
    if (selectedSubscription && selectedSubscription.id) {
      removeSubscription(selectedSubscription.id);
    }
    setCurrentScreen('home');
    setSelectedSubscription(null);
  }

  const handleSubscriptionPress = (sub) => {
    setSelectedSubscription({ ...sub, isReal: true });
    setCurrentScreen('subscriptionDetail');
  };

  // Derived state for lists
  const activeSubs = subscriptions.filter(s => s.status === 'active')
    .sort((a, b) => {
      // Sort by next renewal date if available, else start date
      const dateA = a.nextRenewalDate || a.startDate;
      const dateB = b.nextRenewalDate || b.startDate;
      return new Date(dateA) - new Date(dateB);
    });

  const cancelledSubs = subscriptions.filter(s => s.status === 'cancelled');

  const formatDate = (isoString) => {
    try {
      return format(parseISO(isoString), 'd MMM');
    } catch (e) {
      return isoString;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {currentScreen === 'home' && (
        <>
          <Header />
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Pass subscriptions to calculate totals */}
            <SummaryCards subscriptions={subscriptions} />

            {/* UPCOMING SECTION */}
            {activeSubs.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Upcoming</Text>
                {activeSubs.map((sub) => (
                  <SubscriptionItem
                    key={sub.id}
                    name={sub.name}
                    detail={`Renews on ${formatDate(sub.nextRenewalDate || sub.startDate)}`}
                    price={sub.amount}
                    type="active"
                    frequency={sub.billingCycle}
                    brandColor={sub.color}
                    onPress={() => handleSubscriptionPress(sub)}
                  />
                ))}
              </View>
            )}

            {/* CANCELLED SECTION */}
            {cancelledSubs.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Cancelled</Text>
                {cancelledSubs.map((sub) => (
                  <SubscriptionItem
                    key={sub.id}
                    name={sub.name}
                    detail={`Ended on ${formatDate(sub.startDate)}`}
                    price={sub.amount}
                    type="cancelled"
                    brandColor={sub.color}
                    onPress={() => handleSubscriptionPress(sub)}
                  />
                ))}
              </View>
            )}

            {/* EMPTY STATE */}
            {subscriptions.length === 0 && (
              <View style={{ alignItems: 'center', marginTop: 40, opacity: 0.5 }}>
                <Text style={{ color: 'white', marginBottom: 4 }}>No subscriptions yet.</Text>
                <Text style={{ color: 'white' }}>Tap + to add one.</Text>
              </View>
            )}

          </ScrollView>
        </>
      )}

      {currentScreen === 'calendar' && (
        <CalendarScreen
          subscriptions={subscriptions}
          onSubscriptionPress={handleSubscriptionPress}
        />
      )}

      {currentScreen === 'settings' && <SettingsScreen />}

      {currentScreen === 'addSubscription' && (
        <AddSubscriptionScreen
          onBack={() => setCurrentScreen('home')}
          onSelect={(item) => {
            setSelectedSubscription(item);
            setCurrentScreen('subscriptionDetail');
          }}
        />
      )}

      {currentScreen === 'subscriptionDetail' && (
        <SubscriptionDetailScreen
          subscription={selectedSubscription}
          isEdit={selectedSubscription?.isReal}
          onBack={() => {
            setCurrentScreen(selectedSubscription?.isReal ? 'home' : 'addSubscription');
            setSelectedSubscription(null);
          }}
          onSave={handleSaveSubscription}
          onDelete={handleDeleteSubscription}
        />
      )}

      {/* Hide Bottom Nav on Add/Detail Screens */}
      {currentScreen !== 'addSubscription' && currentScreen !== 'subscriptionDetail' && (
        <BottomNav
          activeTab={currentScreen}
          onTabPress={setCurrentScreen}
          onFabPress={() => setCurrentScreen('addSubscription')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingBottom: 120, // Space for BottomNav
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: 'white',
  },
});
